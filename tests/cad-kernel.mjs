import assert from 'node:assert/strict';
import {buildSolid} from '../dist/cad-worker.js';
import * as cad from '../dist/vendor/cad/replicad.js';

// Stepped bracket, not an envelope box: 800 mm² sketch extruded 12 mm,
// then one Ø8 through hole and a 10 × 5 × 4 rectangular pocket.
const spec = {profile:[[0,0],[40,0],[40,10],[20,10],[20,30],[0,30]],depth:12,
  holes:[{axis:'Z',x:10,y:15,radius:4}],pockets:[{origin:[25,2,8],size:[10,5,5]}]};
const {shape,metrics} = await buildSolid(spec);
assert.equal(metrics.valid,true); assert.equal(metrics.solidCount,1);
assert.ok(Math.abs(metrics.volume - (800*12-Math.PI*16*12-200)) < 1e-5);
const mesh = shape.mesh({tolerance:.05,angularTolerance:.2});
assert.ok(mesh.triangles.length > 100); assert.equal(mesh.vertices.length,mesh.normals.length);
const step = shape.blobSTEP(), stl = shape.blobSTL({binary:true});
assert.ok((await step.text()).includes('ISO-10303-21')); assert.ok(stl.size > 1000);
const imported = await cad.importSTEP(step);
const check = new (cad.getOC().BRepCheck_Analyzer)(imported.wrapped,true,false,false);
assert.equal(check.IsValid(),true); check.delete();
const roundtrip = cad.measureShapeVolumeProperties(imported);
assert.ok(Math.abs(roundtrip.volume-metrics.volume)<1e-5); roundtrip.delete();
const fillet = await buildSolid({profile:[[0,0],[20,0],[20,20],[0,20]],depth:10,fillet:.5});
assert.equal(fillet.metrics.valid,true); assert.ok(fillet.metrics.volume<4000); fillet.shape.delete();
const chamfer = await buildSolid({profile:[[0,0],[20,0],[20,20],[0,20]],depth:10,chamfer:.5});
assert.equal(chamfer.metrics.valid,true); chamfer.shape.delete();
for (const axis of ['X','Y']) {
  const drilled = await buildSolid({profile:[[0,0],[20,0],[20,20],[0,20]],depth:10,holes:[{axis,x:10,y:10,z:5,radius:2}]});
  assert.ok(Math.abs(drilled.metrics.volume-(4000-Math.PI*4*20))<1e-5);
  drilled.shape.delete();
}
await assert.rejects(buildSolid({profile:[[0,0],[10,10],[0,10],[10,0]],depth:4}));
console.log(JSON.stringify({passed:true,metrics,triangles:mesh.triangles.length/3,stepBytes:step.size,stlBytes:stl.size,stepRoundtrip:true}));
imported.delete(); shape.delete();


const cylinder=await buildSolid({profile:[[-5,-5],[5,-5],[5,5],[-5,5]],circle:{center:[0,0],radius:5},depth:10});assert.ok(Math.abs(cylinder.metrics.volume-Math.PI*250)<1e-5);assert.equal(cylinder.metrics.valid,true);cylinder.shape.delete();console.log('Exact circular sketch / cylindrical Pad passed.');
