import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,resolve,basename,sep} from 'node:path';
import {startBridge,validate} from './server.mjs';

assert.throws(()=>validate({x:'3'},{type:'object',properties:{x:{type:'number'}}}));
const folder=await mkdtemp(join(tmpdir(),'freescan-bridge-test-'));
const bridge=await startBridge({port:0,folder});
const root='http://127.0.0.1:'+bridge.server.address().port;
const headers={'Content-Type':'application/json','X-FreeScan-Key':bridge.token,Origin:'http://127.0.0.1:5174'};
const name='FreeScanBridgeTest_'+Date.now();let created=false;
async function post(route,body={},more={}){
  const response=await fetch(root+route,{method:'POST',headers:{...headers,'X-Request-Id':randomUUID(),...more},body:JSON.stringify(body)});
  const data=await response.json();assert.equal(response.status,200,JSON.stringify(data));return data.result;
}
async function call(tool,args={},id=randomUUID()){
  const result=await post('/call',{name:tool,arguments:args},{'X-Request-Id':id});
  assert.ok(!result.isError,JSON.stringify(result));return result;
}
try{
  assert.equal(bridge.tools.length,165);
  assert.equal((await fetch(root+'/connect',{method:'POST',headers:{Origin:headers.Origin}})).status,401);
  const crossPair=await fetch(root+'/pair',{headers:{Origin:headers.Origin}});assert.equal(crossPair.status,403);assert.ok(!(await crossPair.text()).includes(bridge.token));
  assert.equal((await fetch(root+'/connect',{method:'POST',headers:{...headers,Origin:'https://untrusted.example'}})).status,403);
  const pre=await fetch(root+'/call',{method:'OPTIONS',headers:{Origin:headers.Origin,'Access-Control-Request-Private-Network':'true'}});
  assert.equal(pre.status,204);assert.equal(pre.headers.get('Access-Control-Allow-Private-Network'),'true');
  const invalid=await fetch(root+'/call',{method:'POST',headers:{...headers,'X-Request-Id':randomUUID()},body:JSON.stringify({name:'freecad_create_box',arguments:{length:'x',width:2,height:3}})});
  assert.equal(invalid.status,400);
  const py=await fetch(root+'/call',{method:'POST',headers:{...headers,'X-Request-Id':randomUUID()},body:JSON.stringify({name:'freecad_execute_python',arguments:{code:'pass'}})});
  assert.equal(py.status,400);
  assert.equal((await post('/connect')).guiReady,true,'FreeCAD macro must be running');
  await call('freecad_new_document',{name});created=true;
  await call('freecad_create_sketch',{name:'BaseSketch',plane:'XY'});
  await call('freecad_add_sketch_rectangle',{sketchName:'BaseSketch',x1:0,y1:0,x2:30,y2:20});
  await call('freecad_pad',{sketchName:'BaseSketch',length:8,name:'TestPad'});
  await post('/property',{object:'TestPad',property:'Length',value:10});
  await call('freecad_create_sketch',{name:'CutSketch',plane:'XY'});
  await call('freecad_add_sketch_circle',{sketchName:'CutSketch',centerX:15,centerY:10,radius:3});
  await call('freecad_move_object',{objectName:'CutSketch',x:0,y:0,z:10});
  await call('freecad_pocket',{sketchName:'CutSketch',depth:3,name:'TestPocket'});
  const id=randomUUID();await call('freecad_create_box',{length:1,width:1,height:1,name:'OnceOnly'},id);
  await call('freecad_create_box',{length:1,width:1,height:1,name:'OnceOnly'},id);
  let state=await post('/state');assert.equal(state.objects.filter(o=>o.name.startsWith('OnceOnly')).length,1);
  assert.ok(state.meshes.length);assert.equal(state.objects.find(o=>o.name==='TestPad').properties.Length.value,10);
  const pocket=state.objects.find(o=>o.name==='TestPocket');assert.equal(pocket.valid,true);assert.equal(pocket.solids,1);assert.ok(Math.abs(pocket.volume-(6000-Math.PI*9*3))<1e-6);
  const filePath=join(folder,'bridge-test.step');await call('freecad_export_step',{objectNames:['TestPocket'],filePath});
  const saved=join(folder,'bridge-test.FCStd');await call('freecad_save_document',{filePath:saved});
  const bytes=await fetch(root+'/download',{method:'POST',headers,body:JSON.stringify({filePath})});assert.equal(bytes.status,200);assert.ok((await bytes.arrayBuffer()).byteLength>1000);
  await call('freecad_import_step',{filePath});state=await post('/state');
  assert.ok(state.objects.some(o=>o.type==='Part::Feature'&&o.valid&&o.solids===1&&Math.abs(o.volume-pocket.volume)<1e-6));
  console.log('PASS: 165 tools, pairing/CORS/schema/Python guards, native Sketch → Pad → Pocket with volume check, parameter edit, duplicate suppression, scene, FCStd/STEP download and STEP reimport.');
}finally{
  if(created)await call('freecad_close_document',{name}).catch(()=>{});
  await bridge.close();assert.ok(folder.startsWith(resolve(tmpdir())+sep)&&basename(folder).startsWith('freescan-bridge-test-'));await rm(folder,{recursive:true,force:true});
}
