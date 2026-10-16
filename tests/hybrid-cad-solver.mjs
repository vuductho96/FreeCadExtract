import assert from 'node:assert/strict';
import {
  computeBounds2D,
  polygonArea2D,
  pointInPolygon2D,
  solveMultiViewGeometry
} from '../dist/hybrid-cad-solver.js';
import { buildSolid } from '../dist/cad-worker.js';

// 1. Test geometric primitives
const poly = [[0, 0], [40, 0], [40, 30], [0, 30]];
const bounds = computeBounds2D(poly);
assert.equal(bounds.width, 40);
assert.equal(bounds.height, 30);
assert.equal(bounds.minX, 0);
assert.equal(bounds.maxY, 30);

const area = polygonArea2D(poly);
assert.equal(Math.abs(area), 1200);

assert.equal(pointInPolygon2D([20, 15], poly), true);
assert.equal(pointInPolygon2D([50, 15], poly), false);

// 2. Test Multi-View Geometric Reasoning for Prismatic Plate with Hole and Pocket
const mockTopView = {
  id: 1,
  face: 'Top',
  bounds: { minX: 0, maxX: 60, minY: 0, maxY: 40, width: 60, height: 40 },
  primaryOutline: {
    points: [[0, 0], [60, 0], [60, 25], [35, 25], [35, 40], [0, 40]],
    bounds: { minX: 0, maxX: 60, minY: 0, maxY: 40, width: 60, height: 40 }
  },
  outlines: [
    {
      points: [[0, 0], [60, 0], [60, 25], [35, 25], [35, 40], [0, 40]],
      bounds: { minX: 0, maxX: 60, minY: 0, maxY: 40, width: 60, height: 40 }
    }
  ],
  circles: [
    { x: 18, y: 18, radius: 4, diameter: 8 }
  ],
  lines: []
};

const mockFrontView = {
  id: 2,
  face: 'Front',
  bounds: { minX: 0, maxX: 60, minY: 0, maxY: 20, width: 60, height: 20 },
  primaryOutline: {
    points: [[0, 0], [60, 0], [60, 20], [0, 20]],
    bounds: { minX: 0, maxX: 60, minY: 0, maxY: 20, width: 60, height: 20 }
  },
  outlines: [
    {
      points: [[0, 0], [60, 0], [60, 20], [0, 20]],
      bounds: { minX: 0, maxX: 60, minY: 0, maxY: 20, width: 60, height: 20 }
    },
    {
      points: [[45, 12], [55, 12], [55, 20], [45, 20]],
      bounds: { minX: 45, maxX: 55, minY: 12, maxY: 20, width: 10, height: 8 }
    }
  ],
  circles: [],
  lines: []
};

const result = solveMultiViewGeometry([mockTopView, mockFrontView]);
assert.equal(result.success, true);
assert.equal(result.method, 'pad');
assert.equal(result.spec.depth, 20); // Deduces Z depth from Front view
assert.equal(result.spec.holes.length, 1);
assert.equal(result.spec.holes[0].radius, 4);
assert.equal(result.spec.holes[0].axis, 'Z');
assert.equal(result.spec.pockets.length, 1);
assert.equal(result.spec.pockets[0].size[0], 10);
assert.ok(result.reasoning.length >= 3);

// 3. Test building real 3D solid with OpenCascade kernel
const solid = await buildSolid(result.spec);
assert.equal(solid.metrics.valid, true);
assert.equal(solid.metrics.solidCount, 1);
assert.ok(solid.metrics.volume > 0);
solid.shape.delete();

// 4. Test Rotational Symmetry (Shaft / Flange cylinder)
const mockRotationalTop = {
  id: 3,
  face: 'Top',
  bounds: { minX: -15, maxX: 15, minY: -15, maxY: 15, width: 30, height: 30 },
  primaryOutline: {
    points: [[-15, -15], [15, -15], [15, 15], [-15, 15]],
    bounds: { minX: -15, maxX: 15, minY: -15, maxY: 15, width: 30, height: 30 }
  },
  outlines: [],
  circles: [
    { x: 0, y: 0, radius: 15, diameter: 30 },
    { x: 0, y: 0, radius: 5, diameter: 10 }
  ],
  lines: []
};

const mockRotationalFront = {
  id: 4,
  face: 'Front',
  bounds: { minX: -15, maxX: 15, minY: 0, maxY: 50, width: 30, height: 50 },
  primaryOutline: {
    points: [[-15, 0], [15, 0], [15, 50], [-15, 50]],
    bounds: { minX: -15, maxX: 15, minY: 0, maxY: 50, width: 30, height: 50 }
  },
  outlines: [],
  circles: [],
  lines: []
};

const rotResult = solveMultiViewGeometry([mockRotationalTop, mockRotationalFront]);
assert.equal(rotResult.success, true);
assert.equal(rotResult.method, 'revolve');
assert.equal(rotResult.spec.depth, 50);
assert.equal(rotResult.spec.circle.radius, 15);
assert.equal(rotResult.spec.holes.length, 1);
assert.equal(rotResult.spec.holes[0].radius, 5);

console.log('Hybrid CAD Solver unit tests passed successfully!');
console.log('Reasoning trace preview:', result.reasoning[0]);
