import net from 'node:net';
import {spawn} from 'node:child_process';
import {access,readdir} from 'node:fs/promises';
import {join,resolve,dirname} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
const folder=dirname(fileURLToPath(import.meta.url));
export async function exists(path){try{await access(path);return true;}catch{return false;}}
export async function findFreecad(roots=[process.env.LOCALAPPDATA&&join(process.env.LOCALAPPDATA,'Programs'),process.env.ProgramFiles,process.env['ProgramFiles(x86)']].filter(Boolean)){
 if(process.env.FREECAD_EXE&&await exists(process.env.FREECAD_EXE))return process.env.FREECAD_EXE;
 for(const root of roots){let entries=[];try{entries=await readdir(root);}catch{continue;}
  for(const entry of entries.filter(s=>/^FreeCAD/i.test(s)).sort((a,b)=>b.localeCompare(a,undefined,{numeric:true}))){const exe=join(root,entry,'bin','FreeCAD.exe');if(await exists(exe))return exe;}
 }return null;
}
export function socketReady(port){return new Promise(ok=>{const s=net.connect({host:'127.0.0.1',port});let done=false;const finish=v=>{if(done)return;done=true;s.destroy();ok(v);};s.setTimeout(700);s.once('connect',()=>finish(true));s.once('error',()=>finish(false));s.once('timeout',()=>finish(false));});}
export async function bridgeReady(){try{const r=await fetch('http://127.0.0.1:8766/pair',{signal:AbortSignal.timeout(1200)});return r.ok&&(await r.text()).includes('<title>Connect FreeCAD</title>');}catch{return false;}}
export async function launch({check=false,openBrowser=true}={}){
 const exe=await findFreecad(),ready=await socketReady(12345),bridge=await bridgeReady();
 if(check){console.log(JSON.stringify({freecadFound:!!exe,freecad:exe,macroReady:ready,bridgeReady:bridge,node:process.version}));return;}
 console.log('FreeScan - Ket noi FreeCAD. Khong cai dat phan mem.');
 if(!ready){
  if(!exe)throw Error('Khong tim thay FreeCAD. Cai FreeCAD tu trang chinh thuc hoac dat FREECAD_EXE den FreeCAD.exe da co.');
  console.log('Dang mo FreeCAD va macro. Neu da co cua so FreeCAD, cua so do van giu nguyen.');
  const app=spawn(exe,[join(folder,'FreeCAD-Web.FCMacro')],{windowsHide:true,stdio:'ignore'});
  app.on('error',e=>console.error('FreeCAD: '+e.message));
  let found=false;for(let i=0;i<60;i++){if(await socketReady(12345)){found=true;break;}await new Promise(r=>setTimeout(r,1000));}
  if(!found)throw Error('FreeCAD chua san sang sau 60 giay. Mo macro FreeCAD-Web.FCMacro trong thu muc nay va bam Execute, roi chay lai.');
 }
 let child;
 if(!bridge){
  if(await socketReady(8766))throw Error('Cong 8766 dang duoc ung dung khac su dung. Khong dung hoac tat ung dung do tu dong.');
  child=spawn(process.execPath,[join(folder,'server.mjs')],{cwd:folder,windowsHide:true,stdio:'inherit'});
  child.on('error',e=>console.error('Bridge: '+e.message));
  let found=false;for(let i=0;i<20;i++){if(await bridgeReady()){found=true;break;}await new Promise(r=>setTimeout(r,500));}
  if(!found){child.kill();throw Error('Khong khoi dong duoc cau noi. Xem loi trong cua so nay.');}
  const stop=()=>{child.kill();};process.once('SIGINT',stop);process.once('SIGTERM',stop);process.once('exit',stop);
 }
 console.log('San sang: http://127.0.0.1:8766/pair');
 console.log('Bam "Mo website va ghep noi", sau do bam Ket noi tren website. Giu cua so cau noi khi su dung.');
 if(openBrowser){const opener=spawn('cmd.exe',['/d','/c','start','', 'http://127.0.0.1:8766/pair'],{windowsHide:true,stdio:'ignore'});opener.on('error',e=>console.error(e.message));}
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href)launch({check:process.argv.includes('--check'),openBrowser:!process.argv.includes('--no-browser')}).catch(e=>{console.error(e.message);process.exitCode=1;});
