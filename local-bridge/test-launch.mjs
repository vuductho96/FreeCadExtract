import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';import {join,resolve,sep,basename} from 'node:path';
import {findFreecad,socketReady,bridgeReady} from './launch.mjs';
const temp=await mkdtemp(join(tmpdir(),'freescan-launch-'));
try{for(const version of ['FreeCAD 1.0','FreeCAD 1.1']){await mkdir(join(temp,version,'bin'),{recursive:true});await writeFile(join(temp,version,'bin','FreeCAD.exe'),'');}
 assert.equal(await findFreecad([temp]),join(temp,'FreeCAD 1.1','bin','FreeCAD.exe'));assert.equal(await findFreecad([join(temp,'missing')]),null);assert.equal(await socketReady(0),false);assert.equal(typeof await bridgeReady(),'boolean');console.log('Launcher discovery, missing installation and port checks passed.');
}finally{assert.ok(resolve(temp).startsWith(resolve(tmpdir())+sep)&&basename(temp).startsWith('freescan-launch-'));await rm(temp,{recursive:true,force:true});}
