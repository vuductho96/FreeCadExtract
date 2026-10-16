import assert from 'node:assert/strict';
import {mkdtemp,writeFile,readFile,rm,stat} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,resolve,basename,dirname,sep} from 'node:path';
import {spawnSync} from 'node:child_process';
import {normalizePython,executionCode,SAMPLE_PYTHON} from '../dist/freecad-code-model.js';

assert.equal(normalizePython('```python\nprint("hello")\n```'),'print("hello")\n');
assert.equal(normalizePython('\uFEFFprint("xin chào")'),'print("xin chào")\n');
assert.throws(()=>normalizePython(''));
assert.throws(()=>normalizePython('explanation\n```python\npass\n```'));
assert.throws(()=>normalizePython('x'.repeat(200001)));
console.log('Code input validation passed.');
const cmd=process.env.FREECAD_CMD;
if(!cmd){console.log('Native execution skipped: set FREECAD_CMD to existing freecadcmd.exe.');process.exit(0);}
const temp=await mkdtemp(join(tmpdir(),'freescan-code-test-'));
const report=join(temp,'report.json'),file=join(temp,'test.py');
const script=`import FreeCAD as App, Part, json, math, os
_mcp_result = {}
exec(${JSON.stringify(executionCode(SAMPLE_PYTHON,{name:'CodeFlowTest'}))})
r=_mcp_result['result']
assert r['ok'], r
assert 'Valid solid:' in r['stdout'], r
doc=App.getDocument('CodeFlowTest')
obj=doc.getObject('Pocket')
assert obj.Shape.isValid() and len(obj.Shape.Solids)==1
assert abs(obj.Shape.Volume-(40*25*8-math.pi*3**2*4))<1e-6
assert doc.getObject('BaseSketch').FullyConstrained
assert doc.getObject('PocketSketch').FullyConstrained
doc.saveAs(${JSON.stringify(join(temp,'code.FCStd'))})
Part.export([obj],${JSON.stringify(join(temp,'code.step'))})
s=Part.Shape();s.read(${JSON.stringify(join(temp,'code.step'))})
assert s.isValid() and len(s.Solids)==1 and abs(s.Volume-obj.Shape.Volume)<1e-6
before=len(App.listDocuments())
_mcp_result={}
exec(${JSON.stringify(executionCode('def invalid(:\n    pass',{name:'ShouldNotCreate'}))})
syntax=_mcp_result['result'];assert not syntax['ok'] and 'SyntaxError' in syntax['traceback']
assert len(App.listDocuments())==before
_mcp_result={}
exec(${JSON.stringify(executionCode('print("before failure")\nraise ValueError("sample failure")',{newDocument:false}))})
failure=_mcp_result['result'];assert not failure['ok'] and 'WebCAD.py' in failure['traceback'] and 'sample failure' in failure['traceback']
assert 'before failure' in failure['stdout']
_mcp_result={}
exec(${JSON.stringify(executionCode('print("x" * 50000)',{newDocument:false}))})
assert len(_mcp_result['result']['stdout'])<=20000
with open(${JSON.stringify(report)},'w') as f:json.dump({'ok':True,'valid':True,'solids':1,'volume':obj.Shape.Volume,'fullyConstrainedSketches':2,'stepRoundtrip':True,'syntaxErrorsCaptured':True,'runtimeErrorsCaptured':True,'stdoutBounded':True},f)
os._exit(0)
`;
try{
  await writeFile(file,`import traceback, json, os\ntry:\n    exec(${JSON.stringify(script)})\nexcept BaseException:\n    with open(${JSON.stringify(report)},'w') as f: json.dump({'ok':False,'traceback':traceback.format_exc()},f)\n    os._exit(1)\n`);
  const python=process.env.FREECAD_PYTHON||(process.platform==='win32'?join(dirname(cmd),'python.exe'):cmd);
  const run=spawnSync(python,[file],{encoding:'utf8',timeout:60000,windowsHide:true,env:{...process.env,PYTHONPATH:dirname(cmd)}});
  let result;try{result=JSON.parse(await readFile(report,'utf8'));}catch{throw Error('Native code-flow test failed: '+(run.error?.message||run.stderr||run.stdout).slice(-3000));}
  assert.equal(result.ok,true,JSON.stringify(result));assert.ok((await stat(join(temp,'code.FCStd'))).size>1000);console.log(JSON.stringify(result));
}finally{
  assert.ok(temp.startsWith(resolve(tmpdir())+sep)&&basename(temp).startsWith('freescan-code-test-'));
  await rm(temp,{recursive:true,force:true});
}
