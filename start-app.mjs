import {spawn} from 'node:child_process';
import {readFile} from 'node:fs/promises';
import {dirname,join,resolve} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {launch,bridgeReady,socketReady,findFreecad} from './local-bridge/launch.mjs';
const root=dirname(fileURLToPath(import.meta.url));
export async function isApp(url){try{const r=await fetch(url+'/cad.html',{signal:AbortSignal.timeout(1500)});if(!r.ok)return false;return (await r.text()).includes('FreeCAD Web · 2D to 3D Parametric CAD');}catch{return false;}}
async function siteOrigin(){try{const {getSite}=await import('./local-bridge/site.mjs');return getSite();}catch(e){if(e.code==='ERR_MODULE_NOT_FOUND')return 'http://127.0.0.1:5174';throw e;}}
export async function run({mode='freecad',openBrowser=true,check=false}={}){
 if(!['freecad','web','suite'].includes(mode))throw Error('Mode must be freecad, web or suite.');
 const origin=await siteOrigin(),local=new URL(origin).hostname==='127.0.0.1'||new URL(origin).hostname==='localhost';
 if(check){console.log(JSON.stringify({mode,website:origin,webReady:local?await isApp(origin):null,macroReady:await socketReady(12345),bridgeReady:await bridgeReady(),freecadFound:!!await findFreecad()}));return;}
 const children=new Set();let stopped=false,suite;
 const cleanup=()=>{if(stopped)return;stopped=true;for(const child of children)child.kill();suite?.server.close();};
 process.once('SIGINT',()=>{cleanup();process.exitCode=0;});process.once('SIGTERM',()=>{cleanup();process.exitCode=0;});process.once('exit',cleanup);
 const start=(file,env=process.env)=>{const child=spawn(process.execPath,[join(root,file)],{cwd:root,env,windowsHide:true,stdio:'inherit'});children.add(child);child.once('error',e=>{console.error(e.message);cleanup();process.exitCode=1;});child.once('exit',()=>children.delete(child));return child;};
 try{
  console.log('FreeScanDrawing: ONE WINDOW startup. Keep this window open; Ctrl+C stops owned services.');
  if(local&&!await isApp(origin)){
   const port=Number(new URL(origin).port||80);if(await socketReady(port))throw Error('Web port is occupied by another app. No app was stopped.');
   const web=start('serve.mjs',{...process.env,FREESCAN_WEB_PORT:String(port)});let ok=false;
   for(let i=0;i<30;i++){if(await isApp(origin)){ok=true;break;}if(web.exitCode!==null)break;await new Promise(r=>setTimeout(r,300));}
   if(!ok)throw Error('Local website failed to start.');
  }
  let target=origin;
  if(mode==='freecad'){
   if(await bridgeReady()){const page=await (await fetch('http://127.0.0.1:8876/pair',{signal:AbortSignal.timeout(1500)})).text();const link=page.match(/href="([^"]+\/cad\.html[^"]*)"/);if(!link||new URL(link[1]).origin!==origin)throw Error('FreeCAD bridge 8876 belongs to another website edition. Close its controller window first; no existing service was stopped.');}await launch({openBrowser:false});target='http://127.0.0.1:8876/pair';
  }else if(mode==='suite'){
   let exists=false;try{const r=await fetch('http://127.0.0.1:8877/pair',{signal:AbortSignal.timeout(1500)});exists=r.ok&&(await r.text()).includes('<title>FreeScan CAD Suite</title>');}catch{}
   if(!exists){if(await socketReady(8877))throw Error('CAD port 8877 is occupied by another app.');const {startSuite}=await import('./local-bridge/multi-server.mjs');suite=await startSuite();}
   target='http://127.0.0.1:8877/pair';
  }
  console.log('READY: '+target);console.log(mode==='web'?'Website ready.':'Click the pairing link, then confirm Connect on the website.');
  if(openBrowser){const p=spawn('cmd.exe',['/d','/c','start','',target],{windowsHide:true,stdio:'ignore'});p.on('error',e=>console.error(e.message));}
  // Stay alive even when reusing existing services. Existing services and FreeCAD documents are never closed here.
  if(!process.exitCode){const keep=setInterval(()=>{},60000);process.once('SIGINT',()=>clearInterval(keep));process.once('SIGTERM',()=>clearInterval(keep));}
 }catch(e){cleanup();throw e;}
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){const mode=process.argv.includes('--web')?'web':process.argv.includes('--suite')?'suite':'freecad';run({mode,check:process.argv.includes('--check'),openBrowser:!process.argv.includes('--no-browser')}).catch(e=>{console.error(e.message);process.exitCode=1;});}
