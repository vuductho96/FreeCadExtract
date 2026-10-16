import assert from 'node:assert/strict';import {randomUUID} from 'node:crypto';import {mkdtemp,writeFile,rm} from 'node:fs/promises';import {tmpdir} from 'node:os';import {join,resolve,sep} from 'node:path';
import {startSuite} from './multi-server.mjs';import {meshNormals} from '../dist/cad-suite.js';
import http from 'node:http';
const temp=await mkdtemp(join(tmpdir(),'freescan-suite-'));let calls=0;
const fake={status:async()=>({ready:true,document:'fixture'}),run:async code=>{calls++;return{output:code};},export:async(f,p)=>writeFile(p,'fixture '+f),scene:async()=>({vertices:[0,0,0,1,0,0,0,1,0],triangles:[0,1,2]})};
const b=await startSuite({port:0,folder:temp,adapters:{solidworks:fake,sketchup:fake}}),root='http://127.0.0.1:'+b.server.address().port,headers={'Content-Type':'application/json','Origin':'https://dimension-ocr-numbers.youngloach8.chatgpt.site','X-FreeScan-Key':b.token};
const post=(url,data={},extra={})=>fetch(root+url,{method:'POST',headers:{...headers,...extra},body:JSON.stringify(data)});
try{
 assert.equal((await fetch(root+'/pair',{headers:{Origin:headers.Origin}})).status,403);
 const page=await fetch(root+'/pair');assert.equal(page.headers.get('access-control-allow-origin'),null);assert.match(await page.text(),/CAD Suite/);
 assert.equal((await post('/status',{}, {'X-FreeScan-Key':'bad'})).status,401);
 assert.equal((await post('/status',{}, {Origin:'https://evil.example'})).status,403);
 const invalidHost=await new Promise((ok,no)=>{const r=http.request(root+'/status',{method:'POST',headers:{...headers,Host:'evil.example'}},res=>{res.resume();ok(res.statusCode);});r.on('error',no);r.end('{}');});assert.equal(invalidHost,403);
 const pre=await fetch(root+'/run',{method:'OPTIONS',headers:{Origin:headers.Origin,'Access-Control-Request-Private-Network':'true'}});assert.equal(pre.status,204);assert.equal(pre.headers.get('Access-Control-Allow-Private-Network'),'true');
 assert.equal((await (await post('/status')).json()).result.sketchup.ready,true);
 assert.equal((await post('/run',{engine:'sketchup',code:'hello',allowCode:false})).status,400);
 const id=randomUUID(),input={engine:'sketchup',code:'fixture',allowCode:true};assert.equal((await post('/run',input,{'X-Request-Id':id})).status,200);assert.equal((await post('/run',input,{'X-Request-Id':id})).status,400);assert.equal(calls,1);
 assert.equal((await post('/export',{engine:'sketchup',format:'step'})).status,400);
 assert.equal((await post('/export',{engine:'__proto__',format:'skp'})).status,400);
 assert.equal((await post('/download',{id:'../../secret'})).status,400);
 const saved=(await (await post('/export',{engine:'solidworks',format:'sldprt'})).json()).result;assert.equal(await (await post('/download',{id:saved.id})).text(),'fixture sldprt');
 const m=meshNormals((await (await post('/scene',{engine:'sketchup'})).json()).result);assert.deepEqual(m.normals,[0,0,1,0,0,1,0,0,1]);assert.throws(()=>meshNormals({vertices:[0,0,0],triangles:[0,1,2]}));
 console.log('PASS MOCK ONLY: CAD suite auth, host/origin guards, consent, replay prevention, export allowlists, downloads and mesh validation. Native SW/SU not tested.');
}finally{await b.close();assert.ok(resolve(temp).startsWith(resolve(tmpdir())+sep));await rm(temp,{recursive:true,force:true});}
