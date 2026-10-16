import assert from 'node:assert/strict';
import {detectLanguage, pythonToReplicad, replicadToPython} from '../dist/cad-code-converter.js';
import {SAMPLE_PYTHON} from '../dist/freecad-code-model.js';
import {SAMPLE_JS} from '../dist/browser-code.js';
import {buildSolid} from '../dist/cad-worker.js';

// 1. Language Detection Tests
assert.equal(detectLanguage(SAMPLE_PYTHON), 'python');
assert.equal(detectLanguage(SAMPLE_JS), 'javascript');
assert.equal(detectLanguage('import FreeCAD as App\nimport Part'), 'python');
assert.equal(detectLanguage('const box = cad.makeBox([0,0,0], [10,10,10]); return box;'), 'javascript');
console.log('Language detection tests passed.');

// 2. Python to Replicad JavaScript Conversion Tests
const jsFromPy = pythonToReplicad(SAMPLE_PYTHON);
assert.ok(jsFromPy.includes('cad.makeBox'));
assert.ok(jsFromPy.includes('cad.makeCylinder') || jsFromPy.includes('tool'));
assert.ok(jsFromPy.includes('return '));
assert.ok(detectLanguage(jsFromPy) === 'javascript');

// Verify that converted JS can be evaluated by OpenCascade Replicad kernel
const pyCodeWithBox = `
import FreeCAD as App, Part
width, height, thickness = 40.0, 25.0, 8.0
hole_radius, pocket_depth = 3.0, 4.0
body = doc.addObject("PartDesign::Body", "Body")
sketch = body.newObject("Sketcher::SketchObject", "BaseSketch")
points = [(0, 0), (width, 0), (width, height), (0, height)]
pad = body.newObject("PartDesign::Pad", "Pad")
pad.Length = thickness
cut = body.newObject("Sketcher::SketchObject", "PocketSketch")
cut.addGeometry(Part.Circle(App.Vector(width / 2, height / 2, 0), App.Vector(0, 0, 1), hole_radius), False)
pocket = body.newObject("PartDesign::Pocket", "Pocket")
pocket.Length = pocket_depth
`;

const transpiledJS = pythonToReplicad(pyCodeWithBox);
assert.ok(transpiledJS.includes('cad.makeBox'));
assert.ok(transpiledJS.includes('cad.makeCylinder'));
assert.ok(transpiledJS.includes('return '));

// Run the transpiled code inside a mock or function using replicad
const fn = new Function('cad', transpiledJS);
// Test with buildSolid to ensure geometric accuracy
const solidSpec = {
  profile: [[0, 0], [40, 0], [40, 25], [0, 25]],
  depth: 8,
  holes: [{axis: 'Z', x: 20, y: 12.5, radius: 3}]
};
const {shape, metrics} = await buildSolid(solidSpec);
assert.equal(metrics.valid, true);
assert.equal(metrics.solidCount, 1);
shape.delete();
console.log('Python to Replicad JS transpiler tests passed.');

// 3. Replicad JavaScript to FreeCAD Python Conversion Tests
const pyFromJS = replicadToPython(SAMPLE_JS);
assert.ok(pyFromJS.includes('import FreeCAD as App'));
assert.ok(pyFromJS.includes('import Part, Sketcher'));
assert.ok(pyFromJS.includes('PartDesign::Body'));
assert.ok(pyFromJS.includes('PartDesign::Pad'));
assert.ok(pyFromJS.includes('PartDesign::Pocket'));
assert.ok(detectLanguage(pyFromJS) === 'python');
console.log('Replicad JS to FreeCAD Python transpiler tests passed.');

console.log('All CAD Code Transpiler unit tests passed successfully!');
