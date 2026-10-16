import http from 'node:http';import {randomBytes,timingSafeEqual,randomUUID} from 'node:crypto';
import {mkdir,writeFile,readFile,stat} from 'node:fs/promises';import {join,resolve} from 'node:path';import {homedir} from 'node:os';import {pathToFileURL} from 'node:url';
import {solidworksAdapter,sketchupAdapter} from './adapters/native.mjs';
const site='https://dimension-ocr-numbers.youngloach8.chatgpt.site';
export async function startSuite(options={}){
 const token=options.token||randomBytes(32).toString('hex'),folder=resolve(options.folder||join(homedir(),'FreeScanDrawing','cad-suite')),exportDir=join(folder,'exports');
 await mkdir(exportDir,{recursive:true});
 const adapters=options.adapters||{solidworks:solidworksAdapter(),sketchup:sketchupAdapter(token)},downloads=new Map(),seen=new Set();let tail=Promise.resolve();
 const queued=fn=>{const p=tail.then(fn);tail=p.catch(()=>{});return p;};
 const equal=a=>{const x=Buffer.from(a||''),y=Buffer.from(token);return x.length===y.length&&timingSafeEqual(x,y);};
 const server=http.createServer(async(req,res)=>{
  res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');
  const host=req.headers.host,origin=req.headers.origin,local=`http://${host}`;
  if(!/^127\.0\.0\.1:\d+$/.test(host||'')){res.writeHead(403);res.end('Invalid Host');return;}
  const allowed=[site,'http://127.0.0.1:5173','http://localhost:5173',local];
  if(origin&&!allowed.includes(origin)){res.writeHead(403);res.end('Origin not allowed');return;}
  if(req.url==='/pair'&&req.method==='GET'){
   if(origin&&origin!==local){res.writeHead(403);res.end('Open pairing page locally');return;}
   res.setHeader('Content-Type','text/html;charset=utf-8');res.setHeader('Content-Security-Policy',"default-src 'none'; style-src 'unsafe-inline'; frame-ancestors 'none'; base-uri 'none'");res.setHeader('Referrer-Policy','no-referrer');
   const link=site+'/cad.html#'+new URLSearchParams({cadSuiteKey:token,cadSuiteAddress:'http://127.0.0.1:'+server.address().port});
   res.end(`<!doctype html><meta charset="utf-8"><title>FreeScan CAD Suite</title><style>body{font:16px system-ui;max-width:680px;margin:8vh auto;padding:24px;background:#eee}p{line-height:1.6}a{display:inline-block;background:#285c8c;color:white;padding:14px;text-decoration:none}</style><h1>Kết nối SolidWorks / SketchUp</h1><p>Mở phần mềm desktop trước. SketchUp cần nạp extension FreeScan-CAD.rb. Website được chạy PowerShell COM / Ruby bằng quyền tài khoản của bạn. Chỉ ghép nối website bạn tin cậy.</p><a href="${link}">Mở website và ghép nối CAD</a><p>Mã chỉ giữ trong tab. Dừng cầu nối để ngắt truy cập; khởi động lại sẽ đổi mã. Không có cloud storage.</p>`);return;
  }
  if(origin){res.setHeader('Access-Control-Allow-Origin',origin);res.setHeader('Vary','Origin');}
  if(req.method==='OPTIONS'){res.setHeader('Access-Control-Allow-Methods','POST, OPTIONS');res.setHeader('Access-Control-Allow-Headers','Content-Type, X-FreeScan-Key, X-Request-Id');res.setHeader('Access-Control-Allow-Private-Network','true');res.writeHead(204);res.end();return;}
  res.setHeader('Content-Type','application/json;charset=utf-8');
  if(req.method!=='POST'||!equal(req.headers['x-freescan-key'])){res.writeHead(401);res.end(JSON.stringify({error:'Ghép nối CAD Suite trước.'}));return;}
  try{
   let raw='';for await(const chunk of req){raw+=chunk;if(Buffer.byteLength(raw)>400000)throw Error('Request quá lớn');}
   const data=JSON.parse(raw||'{}');let result;
   if(req.url==='/status')result=await queued(async()=>Object.fromEntries(await Promise.all(Object.entries(adapters).map(async([id,a])=>[id,await a.status()]))));
   else if(req.url==='/download'){
    const file=downloads.get(data.id);if(!file)throw Error('Unknown export ID');if((await stat(file)).size>100e6)throw Error('File vượt 100 MB');res.setHeader('Content-Type','application/octet-stream');res.end(await readFile(file));return;
   }else{
    const adapter=adapters[data.engine];if(!Object.hasOwn(adapters,data.engine)||!adapter)throw Error('Chọn SolidWorks / SketchUp.');
    if(req.url==='/run'){
     if(data.allowCode!==true||typeof data.code!=='string'||!data.code.trim()||data.code.length>200000)throw Error('Đọc và cho phép code, tối đa 200k ký tự.');
     const id=req.headers['x-request-id'];if(typeof id!=='string'||!/^[-a-zA-Z0-9]{16,80}$/.test(id)||seen.has(id))throw Error('Request trùng hoặc thiếu ID; kiểm tra ứng dụng, không tự chạy lại.');if(seen.size>=1000)throw Error('Khởi động lại cầu nối sau 1000 script.');seen.add(id);
     result=await queued(()=>adapter.run(data.code));
    }else if(req.url==='/scene'){if(!adapter.scene)throw Error('SolidWorks: xem trực tiếp trong ứng dụng; preview web chưa hỗ trợ.');result=await queued(()=>adapter.scene());}
    else if(req.url==='/export'){
     const formats=data.engine==='solidworks'?['step','stl','sldprt']:['skp'];if(!formats.includes(data.format))throw Error('Định dạng không được engine hỗ trợ.');const id=randomUUID(),file=join(exportDir,id+'.'+data.format);
     await queued(()=>adapter.export(data.format,file));await stat(file);downloads.set(id,file);result={id,name:'FreeScan-model.'+data.format};
    }else throw Error('Unknown route');
   }
   res.end(JSON.stringify({ok:true,result}));
  }catch(e){res.writeHead(400);res.end(JSON.stringify({ok:false,error:e.message}));}
 });
 server.requestTimeout=15000;
 await new Promise((ok,no)=>{server.once('error',no);server.listen(options.port??8767,'127.0.0.1',ok);});
 try{await writeFile(join(folder,'sketchup.key'),token,{mode:0o600});}catch(e){server.close();throw e;}
 return{server,token,folder,close:()=>new Promise(ok=>server.close(ok))};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){const suite=await startSuite();console.log('CAD Suite: http://127.0.0.1:8767/pair — keep this window open.');}
