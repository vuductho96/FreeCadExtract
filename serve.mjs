import http from 'node:http';import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';import {spawn} from 'node:child_process';
const root=path.join(path.dirname(fileURLToPath(import.meta.url)),'dist'),port=Number(process.env.FREESCAN_WEB_PORT||5174);
const types={'.html':'text/html;charset=utf-8','.js':'text/javascript;charset=utf-8','.mjs':'text/javascript;charset=utf-8','.css':'text/css;charset=utf-8','.json':'application/json','.wasm':'application/wasm','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.zip':'application/zip','.rbz':'application/zip'};
const server=http.createServer((req,res)=>{try{
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return;}
 const part=decodeURIComponent(req.url.split('?')[0]),file=path.resolve(root,'.'+(part==='/'?'/index.html':part));
 if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 if(!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);res.end();return;}
 res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Content-Length',fs.statSync(file).size);res.setHeader('Cache-Control','no-cache');
 if(req.method==='HEAD'){res.end();return;}fs.createReadStream(file).on('error',()=>res.destroy()).pipe(res);
 }catch{res.writeHead(400);res.end('Invalid request');}
});
server.on('error',e=>{console.error(e.code==='EADDRINUSE'?`Port ${port} is occupied. Close the other instance; no app was stopped automatically.`:e.message);process.exitCode=1;});
server.listen(port,'127.0.0.1',()=>{const url=`http://127.0.0.1:${port}`;console.log('FreeScanDrawing Standalone: '+url);console.log('Local only. Keep this window open. Ctrl+C stops the website.');if(process.argv.includes('--open')){const p=spawn('cmd.exe',['/d','/c','start','',url],{windowsHide:true,stdio:'ignore'});p.on('error',e=>console.error(e.message));}});
