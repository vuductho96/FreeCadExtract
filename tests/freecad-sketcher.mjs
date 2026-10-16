import assert from 'node:assert/strict';
import { FreeCadSketcher } from '../dist/freecad-sketcher.js';

// Test FreeCadSketcher unit logic
const sketcher = new FreeCadSketcher();

// 1. Initial empty state
assert.equal(sketcher.isSketchClosed(), false);

// 2. Draw rectangle in sketcher
sketcher.setTool('rectangle');
sketcher.handlePointerDown({ button: 0 }, 1, [0, 0], null); // start at origin
sketcher.mouseScreen = { x: 500, y: 300 }; // 500px, 300px
sketcher.handlePointerMove({ clientX: 500, clientY: 300 }, 1, [0, 0], null);
sketcher.handlePointerDown({ button: 0 }, 1, [0, 0], null); // end corner

assert.equal(sketcher.elements.length, 1);
assert.equal(sketcher.elements[0].type, 'rect');
assert.equal(sketcher.isSketchClosed(), true);

// 3. Polyline loop
sketcher.clear();
assert.equal(sketcher.elements.length, 0);

sketcher.setTool('polyline');
// Square loop: (0,0) -> (40,0) -> (40,40) -> (0,40) -> (0,0)
const pts = [[0, 0], [40, 0], [40, 40], [0, 40], [0, 0]];
for (const p of pts) {
  sketcher.activeSnap = { x: p[0], y: p[1], type: 'point' };
  sketcher.mousePos = { x: p[0], y: p[1] };
  sketcher.handlePointerDown({ button: 0 }, 1, [0, 0], null);
}

assert.equal(sketcher.elements.length, 4);
assert.equal(sketcher.isSketchClosed(), true);

// 4. Circle sketch
sketcher.clear();
sketcher.setTool('circle');
sketcher.activeSnap = { x: 10, y: 10, type: 'none' };
sketcher.handlePointerDown({ button: 0 }, 1, [0, 0], null); // center
sketcher.activeSnap = { x: 25, y: 10, type: 'none' };
sketcher.handlePointerDown({ button: 0 }, 1, [0, 0], null); // radius point (r=15)

assert.equal(sketcher.elements.length, 1);
assert.equal(sketcher.elements[0].type, 'circle');
assert.equal(sketcher.elements[0].radius, 15);
assert.equal(sketcher.isSketchClosed(), true);

// 5. Construction mode toggle
assert.equal(sketcher.toggleConstruction(), true);
assert.equal(sketcher.constructionMode, true);
assert.equal(sketcher.toggleConstruction(), false);
assert.equal(sketcher.constructionMode, false);

console.log('FreeCAD Web Sketcher unit tests passed successfully!');
