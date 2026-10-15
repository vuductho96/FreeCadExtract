import * as cad from './vendor/cad/replicad.js';
import initOpenCascade from './vendor/cad/opencascade.js';

// Millimetres; XY profile is extruded along +Z. Through holes span the whole
// envelope on their chosen axis. Pockets use minimum corner and positive size.
let kernelPromise, currentShape;
function kernel() {
  return kernelPromise ??= initOpenCascade({locateFile: () => new URL('./vendor/cad/opencascade.wasm', import.meta.url).href}).then(oc => { cad.setOC(oc); return oc; });
}
function number(value, label, positive = false) {
  if (!Number.isFinite(value) || Math.abs(value) > 100000 || (positive && value <= 0)) throw Error(`Invalid ${label}`);
  return value;
}
function validateSpec(spec) {
  if (!spec || !Array.isArray(spec.profile) || spec.profile.length < 3 || spec.profile.length > 256) throw Error('A closed profile needs 3–256 vertices');
  spec.profile.forEach(p => { if (!Array.isArray(p) || p.length !== 2) throw Error('Profile vertices must be [x,y]'); p.forEach(v => number(v, 'profile coordinate')); });
  number(spec.depth, 'extrusion depth', true);
  if ((spec.holes?.length || 0) > 64 || (spec.pockets?.length || 0) > 64) throw Error('Maximum 64 holes and pockets');
}
function properties(shape, oc) {
  const check = new oc.BRepCheck_Analyzer(shape.wrapped, true, false, false);
  const valid = check.IsValid(); check.delete();
  const volume = cad.measureShapeVolumeProperties(shape), surface = cad.measureShapeSurfaceProperties(shape);
  const solids = shape.solids, bounds = shape.boundingBox;
  const result = {valid, solidCount: solids.length, volume: volume.volume, area: surface.area, centerOfMass: volume.centerOfMass, bounds: bounds.bounds};
  solids.forEach(s => s.delete()); bounds.delete(); volume.delete(); surface.delete();
  return result;
}
export async function buildSolid(spec) {
  validateSpec(spec);
  const oc = await kernel();
  let pen = cad.draw(spec.profile[0]);
  for (const p of spec.profile.slice(1)) pen = pen.lineTo(p);
  let shape = pen.close().sketchOnPlane('XY').extrude(spec.depth);
  try {
    const box = shape.boundingBox, [min, max] = box.bounds; box.delete();
    for (const hole of spec.holes || []) {
      const axis = ['X','Y','Z'].indexOf(String(hole.axis || 'Z').toUpperCase());
      if (axis < 0) throw Error('Hole axis must be X, Y or Z');
      const center = [hole.x ?? 0, hole.y ?? 0, hole.z ?? 0].map(v => number(v, 'hole center'));
      const direction = [0,0,0]; direction[axis] = 1;
      const radius = number(hole.radius, 'hole radius', true);
      let length;
      if (hole.length != null) length = number(hole.length, 'hole length', true);
      else { center[axis] = min[axis] - 1; length = max[axis] - min[axis] + 2; }
      const tool = cad.makeCylinder(radius, length, center, direction);
      const next = shape.cut(tool); shape.delete(); tool.delete(); shape = next;
    }
    for (const pocket of spec.pockets || []) {
      const origin = pocket.origin || [pocket.x, pocket.y, pocket.z];
      const size = pocket.size || [pocket.width, pocket.depth, pocket.height];
      if (origin.length !== 3 || size.length !== 3) throw Error('Pocket requires origin and size triples');
      origin.forEach(v => number(v, 'pocket origin')); size.forEach(v => number(v, 'pocket size', true));
      const tool = cad.makeBox(origin, origin.map((v,i) => v + size[i]));
      const next = shape.cut(tool); shape.delete(); tool.delete(); shape = next;
    }
    for (const op of ['fillet','chamfer']) if (spec[op]) {
      const next = shape[op](number(spec[op], op, true)); shape.delete(); shape = next;
    }
    const metrics = properties(shape, oc);
    if (!metrics.valid || metrics.solidCount !== 1 || metrics.volume <= 1e-8) throw Error('The features do not form one valid solid. Review the profile and feature dimensions.');
    return {shape, metrics};
  } catch (error) { shape.delete(); throw error; }
}

let queue = Promise.resolve();
if (typeof self !== 'undefined') self.onmessage = ({data}) => {
  queue = queue.then(async () => {
    const {id,type} = data;
    try {
      if (type === 'build') {
        self.postMessage({id,type:'status',text:'Building and validating local OpenCascade solid…'});
        const {shape,metrics} = await buildSolid(data.spec);
        const mesh = shape.mesh({tolerance:0.05,angularTolerance:0.2});
        currentShape?.delete(); currentShape = shape;
        self.postMessage({id,type:'built',mesh,metrics,spec:data.spec});
      } else if (type === 'export') {
        if (!currentShape) throw Error('Build a valid solid first');
        if (!['step','stl'].includes(data.format)) throw Error('Choose STEP or STL');
        const blob = data.format === 'step' ? currentShape.blobSTEP() : currentShape.blobSTL({tolerance:0.03,angularTolerance:0.15,binary:true});
        self.postMessage({id,type:'exported',format:data.format,blob});
      } else throw Error('Unknown CAD operation');
    } catch(error) { self.postMessage({id,type:'error',message:error.message || String(error)}); }
  });
};
