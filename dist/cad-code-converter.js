// CAD Code Converter: Bidirectional transpilation between FreeCAD Python and Replicad JavaScript (OpenCascade)

export function detectLanguage(code) {
  if (!code || typeof code !== 'string') return 'unknown';
  const clean = code.replace(/^\uFEFF/, '').trim();
  
  // Explicit python indicators
  const pyScore = [
    /^\s*(?:import\s+(?:FreeCAD|Part|Sketcher|math)|from\s+FreeCAD\s+import)/m.test(clean) ? 5 : 0,
    /^\s*doc\s*=\s*App\.ActiveDocument/m.test(clean) ? 4 : 0,
    /\bPartDesign::\w+/i.test(clean) ? 4 : 0,
    /\bPart\.LineSegment\b/.test(clean) ? 3 : 0,
    /\bPart\.Circle\b/.test(clean) ? 3 : 0,
    /\bApp\.Vector\b/.test(clean) ? 3 : 0,
    /\bdef\s+\w+\s*\(/.test(clean) ? 2 : 0,
    /\bprint\s*\(/.test(clean) ? 1 : 0,
    /\bTrue\b|\bFalse\b|\bNone\b/.test(clean) ? 2 : 0,
    /#\s*.+$/m.test(clean) ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  // Explicit javascript indicators
  const jsScore = [
    /\bcad\.makeBox\b/.test(clean) ? 5 : 0,
    /\bcad\.makeCylinder\b/.test(clean) ? 5 : 0,
    /\bcad\.draw\b/.test(clean) ? 5 : 0,
    /\breturn\s+(?:part|shape|solid|body)\s*;/i.test(clean) ? 4 : 0,
    /^\s*(?:const|let|var)\s+\w+/m.test(clean) ? 3 : 0,
    /\.sketchOnPlane\b/.test(clean) ? 3 : 0,
    /\.lineTo\b/.test(clean) ? 3 : 0,
    /\.extrude\b/.test(clean) ? 2 : 0,
    /\/\/\s*.+$/m.test(clean) ? 1 : 0,
    /=>/.test(clean) ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  if (pyScore > jsScore && pyScore >= 3) return 'python';
  if (jsScore > pyScore && jsScore >= 3) return 'javascript';
  if (pyScore > 0) return 'python';
  if (jsScore > 0) return 'javascript';
  return 'unknown';
}

function cleanMarkdown(code) {
  let s = String(code || '').replace(/^\uFEFF/, '').trim();
  const fence = s.match(/^```(?:python|py|javascript|js)?\s*\n([\s\S]*?)\n```$/i);
  if (fence) s = fence[1].trim();
  return s;
}

/**
 * Convert FreeCAD Python code to Replicad JavaScript code
 */
export function pythonToReplicad(pythonCode) {
  const code = cleanMarkdown(pythonCode);
  const lines = code.split('\n');

  // Extract variables (assignments like width, height, thickness = 40, 25, 8 or x = 10)
  const varMap = new Map();
  const varDecls = [];
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('import ') || trimmed.startsWith('from ')) continue;
    
    // Multi-var assignment: a, b, c = 1, 2, 3
    const multiMatch = trimmed.match(/^([a-zA-Z_]\w*(?:\s*,\s*[a-zA-Z_]\w*)+)\s*=\s*(.+)$/);
    if (multiMatch) {
      const vars = multiMatch[1].split(',').map(v => v.trim());
      const vals = multiMatch[2].split(',').map(v => v.trim());
      if (vars.length === vals.length) {
        vars.forEach((v, i) => varMap.set(v, vals[i]));
        varDecls.push(`const ${vars.map((v, i) => `${v} = ${vals[i]}`).join(', ')};`);
      }
      continue;
    }

    // Single assignment: width = 40.0
    const singleMatch = trimmed.match(/^([a-zA-Z_]\w*)\s*=\s*([^#]+?)(?:\s*#.*)?$/);
    if (singleMatch) {
      const varName = singleMatch[1];
      const val = singleMatch[2].trim();
      // Skip FreeCAD API calls or object instantiations
      if (!/^(?:doc\.|App\.|Part\.|Sketcher\.|body\.|sketch\.|cut\.|pad\.|pocket\.|open\(|assert)/.test(val)) {
        if (/^[\d.]+$|^[a-zA-Z_]\w*$|^\s*[-+*/()\d.\w\s]+\s*$/.test(val)) {
          varMap.set(varName, val);
          varDecls.push(`const ${varName} = ${val};`);
        }
      }
    }
  }

  // Detect base geometry:
  // Case A: Part.makeBox(w, h, d, ...)
  const makeBoxMatch = code.match(/Part\.makeBox\(\s*([^,\)]+)\s*,\s*([^,\)]+)\s*,\s*([^,\)]+)(?:\s*,\s*(?:App\.)?Vector\(([^,\)]+)\s*,\s*([^,\)]+)\s*,\s*([^,\)]+)\))?/);
  
  // Case B: Points polygon / BaseSketch
  const pointsMatch = code.match(/points\s*=\s*\[\s*\(([^)]+)\)\s*,\s*\(([^)]+)\)\s*,\s*\(([^)]+)\)\s*,\s*\(([^)]+)\)\s*\]/);
  
  // Case C: Pad Length
  const padLengthMatch = code.match(/(?:pad\.Length|Length)\s*=\s*([^#\n]+)/);

  // Case D: Cylinder / Pocket
  const cylMatches = [...code.matchAll(/Part\.makeCylinder\(\s*([^,\)]+)\s*,\s*([^,\)]+)(?:\s*,\s*(?:App\.)?Vector\(([^,\)]+)\s*,\s*([^,\)]+)\s*,\s*([^,\)]+)\))?(?:\s*,\s*(?:App\.)?Vector\(([^,\)]+)\s*,\s*([^,\)]+)\s*,\s*([^,\)]+)\))?/g)];
  
  // Case E: Circle in pocket sketch: cut.addGeometry(Part.Circle(App.Vector(cx, cy, cz), App.Vector(0,0,1), radius))
  const circleSketchMatch = code.match(/Part\.Circle\(\s*(?:App\.)?Vector\(([^,\)]+)\s*,\s*([^,\)]+)\s*,\s*([^,\)]+)\)\s*,\s*(?:App\.)?Vector\(([^,\)]+)\s*,\s*([^,\)]+)\s*,\s*([^,\)]+)\)\s*,\s*([^,\)]+)\)/);
  const pocketLengthMatch = code.match(/(?:pocket\.Length|Length)\s*=\s*([^#\n]+)/);

  // Case F: Fillet & Chamfer
  const filletMatch = code.match(/(?:fillet\.Radius|Radius)\s*=\s*([^#\n]+)/i) || code.match(/\.makeFillet\(\s*([^,\)]+)/);
  const chamferMatch = code.match(/(?:chamfer\.Size|Size)\s*=\s*([^#\n]+)/i) || code.match(/\.makeChamfer\(\s*([^,\)]+)/);

  const jsLines = [
    '// Replicad 1.1 (OpenCascade WASM) - Tự động chuyển đổi từ FreeCAD Python',
  ];

  if (varDecls.length > 0) {
    jsLines.push(...varDecls, '');
  }

  let baseCreated = false;

  if (makeBoxMatch) {
    const [, w, h, d, x0, y0, z0] = makeBoxMatch;
    const origin = [x0 || '0', y0 || '0', z0 || '0'].join(', ');
    jsLines.push(`const body = cad.makeBox([${origin}], [${w.trim()}, ${h.trim()}, ${d.trim()}]);`);
    baseCreated = true;
  } else if (pointsMatch && padLengthMatch) {
    const padLen = padLengthMatch[1].trim();
    const p1 = pointsMatch[1].split(',').map(s => s.trim());
    const p2 = pointsMatch[2].split(',').map(s => s.trim());
    const p3 = pointsMatch[3].split(',').map(s => s.trim());
    const p4 = pointsMatch[4].split(',').map(s => s.trim());
    
    // Check if rectangular
    if (p1[0] === '0' && p1[1] === '0' && p4[0] === '0') {
      jsLines.push(`const body = cad.makeBox([0, 0, 0], [${p2[0]}, ${p3[1]}, ${padLen}]);`);
    } else {
      jsLines.push(`const body = cad.draw([${p1.join(', ')}])`);
      jsLines.push(`  .lineTo([${p2.join(', ')}])`);
      jsLines.push(`  .lineTo([${p3.join(', ')}])`);
      jsLines.push(`  .lineTo([${p4.join(', ')}])`);
      jsLines.push(`  .close()`);
      jsLines.push(`  .sketchOnPlane('XY')`);
      jsLines.push(`  .extrude(${padLen});`);
    }
    baseCreated = true;
  } else if (varMap.has('width') && varMap.has('height') && (varMap.has('thickness') || varMap.has('depth') || padLengthMatch)) {
    const depth = varMap.get('thickness') || varMap.get('depth') || (padLengthMatch ? padLengthMatch[1].trim() : '10');
    jsLines.push(`const body = cad.makeBox([0, 0, 0], [width, height, ${depth}]);`);
    baseCreated = true;
  } else {
    // Default fallback box if geometry parsing was incomplete
    jsLines.push('const body = cad.makeBox([0, 0, 0], [40, 25, 8]);');
    baseCreated = true;
  }

  let currentPart = 'body';
  const toolsToClean = [];

  // Cut feature from Pocket Sketch
  if (circleSketchMatch) {
    const [, cx, cy, cz, dx, dy, dz, r] = circleSketchMatch;
    const depth = pocketLengthMatch ? pocketLengthMatch[1].trim() : '5';
    const thickness = varMap.get('thickness') || (padLengthMatch ? padLengthMatch[1].trim() : '8');
    
    // Position tool at top surface going down or centered
    jsLines.push('');
    jsLines.push(`// Hole / Pocket feature`);
    jsLines.push(`const tool = cad.makeCylinder(${r.trim()}, ${depth} + 0.1, [${cx.trim()}, ${cy.trim()}, ${thickness} - (${depth})], [0, 0, 1]);`);
    jsLines.push(`let part = ${currentPart}.cut(tool);`);
    toolsToClean.push('tool');
    currentPart = 'part';
  } else if (cylMatches.length > 0) {
    cylMatches.forEach((m, idx) => {
      const [, r, h, x, y, z] = m;
      const tName = `tool${idx}`;
      const px = x || '0', py = y || '0', pz = z || '0';
      jsLines.push('');
      jsLines.push(`const ${tName} = cad.makeCylinder(${r.trim()}, ${h.trim()}, [${px.trim()}, ${py.trim()}, ${pz.trim()}], [0, 0, 1]);`);
      if (idx === 0) {
        jsLines.push(`let part = ${currentPart}.cut(${tName});`);
        currentPart = 'part';
      } else {
        jsLines.push(`part = part.cut(${tName});`);
      }
      toolsToClean.push(tName);
    });
  }

  // Fillet
  if (filletMatch) {
    const fRadius = filletMatch[1].trim();
    jsLines.push(`try { ${currentPart} = ${currentPart}.fillet(${fRadius}); } catch (e) { /* skip fillet if complex */ }`);
  }

  // Chamfer
  if (chamferMatch) {
    const cSize = chamferMatch[1].trim();
    jsLines.push(`try { ${currentPart} = ${currentPart}.chamfer(${cSize}); } catch (e) { /* skip chamfer if complex */ }`);
  }

  // Cleanup
  jsLines.push('');
  if (currentPart !== 'body') {
    jsLines.push(`body.delete();`);
  }
  for (const t of toolsToClean) {
    jsLines.push(`${t}.delete();`);
  }
  jsLines.push(`return ${currentPart};`);

  return jsLines.join('\n') + '\n';
}

/**
 * Convert Replicad JavaScript code to FreeCAD Python code
 */
export function replicadToPython(jsCode) {
  const code = cleanMarkdown(jsCode);
  const lines = code.split('\n');

  // Extract variables (const a = 10, let b = 20)
  const varDecls = [];
  const varMap = new Map();

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('/*')) continue;

    const constMatch = trimmed.match(/(?:const|let|var)\s+([^;]+);/);
    if (constMatch) {
      const decls = constMatch[1].split(',');
      for (const d of decls) {
        const parts = d.split('=').map(p => p.trim());
        if (parts.length === 2 && !parts[1].startsWith('cad.') && !parts[1].startsWith('body.')) {
          varMap.set(parts[0], parts[1]);
          varDecls.push(`${parts[0]} = ${parts[1]}`);
        }
      }
    }
  }

  // Parse makeBox: cad.makeBox([x0, y0, z0], [x1, y1, z1])
  const makeBoxMatch = code.match(/cad\.makeBox\(\s*\[([^\]]+)\]\s*,\s*\[([^\]]+)\]\s*\)/);

  // Parse makeCylinder: cad.makeCylinder(r, h, [x, y, z], [dx, dy, dz])
  const cylMatches = [...code.matchAll(/cad\.makeCylinder\(\s*([^,]+)\s*,\s*([^,]+)\s*,\s*\[([^\]]+)\](?:\s*,\s*\[([^\]]+)\])?\s*\)/g)];

  // Parse 2D polygon profile: cad.draw([x,y]).lineTo(...).extrude(h)
  const drawMatch = code.match(/cad\.draw\(\s*\[([^\]]+)\]\s*\)([\s\S]+?)\.extrude\(\s*([^)]+)\s*\)/);

  // Fillet / Chamfer
  const filletMatch = code.match(/\.fillet\(\s*([^)]+)\s*\)/);
  const chamferMatch = code.match(/\.chamfer\(\s*([^)]+)\s*\)/);

  const pyLines = [
    'import FreeCAD as App',
    'import Part, Sketcher',
    'from FreeCAD import Vector as V',
    '',
    '# Tự động chuyển đổi từ JavaScript Replicad sang FreeCAD Python',
    'doc = App.ActiveDocument or App.newDocument("Model")',
    'body = doc.addObject("PartDesign::Body", "Body")',
  ];

  if (varDecls.length > 0) {
    pyLines.push('', '# Parameters', ...varDecls);
  }

  pyLines.push('');

  let baseSketchCreated = false;

  if (makeBoxMatch) {
    const p1 = makeBoxMatch[1].split(',').map(s => s.trim());
    const p2 = makeBoxMatch[2].split(',').map(s => s.trim());
    const w = `(${p2[0]} - ${p1[0]})`;
    const h = `(${p2[1]} - ${p1[1]})`;
    const d = `(${p2[2]} - ${p1[2]})`;

    pyLines.push('# Base Sketch (Rectangle on XY plane)');
    pyLines.push('sketch = body.newObject("Sketcher::SketchObject", "BaseSketch")');
    pyLines.push(`w, h, depth = ${w}, ${h}, ${d}`);
    pyLines.push('points = [(0, 0), (w, 0), (w, h), (0, h)]');
    pyLines.push('for i in range(4):');
    pyLines.push('    a, b = points[i], points[(i + 1) % 4]');
    pyLines.push('    sketch.addGeometry(Part.LineSegment(V(a[0], a[1], 0), V(b[0], b[1], 0)), False)');
    pyLines.push('for i in range(4):');
    pyLines.push('    sketch.addConstraint(Sketcher.Constraint("Coincident", i, 2, (i + 1) % 4, 1))');
    pyLines.push('sketch.addConstraint(Sketcher.Constraint("Coincident", 0, 1, -1, 1))');
    pyLines.push('sketch.addConstraint(Sketcher.Constraint("Distance", 0, w))');
    pyLines.push('sketch.addConstraint(Sketcher.Constraint("Distance", 1, h))');
    pyLines.push('');
    pyLines.push('pad = body.newObject("PartDesign::Pad", "Pad")');
    pyLines.push('pad.Profile, pad.Length = sketch, depth');
    pyLines.push('doc.recompute()');
    pyLines.push('sketch.Visibility = False');
    baseSketchCreated = true;
  } else if (drawMatch) {
    const startPt = drawMatch[1].split(',').map(s => s.trim());
    const steps = drawMatch[2];
    const extrudeLen = drawMatch[3].trim();
    const lineTos = [...steps.matchAll(/\.lineTo\(\s*\[([^\]]+)\]\s*\)/g)].map(m => m[1].split(',').map(s => s.trim()));
    const allPts = [startPt, ...lineTos];

    pyLines.push('# Base Extruded Profile');
    pyLines.push('sketch = body.newObject("Sketcher::SketchObject", "BaseSketch")');
    pyLines.push(`pts = [${allPts.map(p => `(${p[0]}, ${p[1]})`).join(', ')}]`);
    pyLines.push('for i in range(len(pts)):');
    pyLines.push('    a, b = pts[i], pts[(i + 1) % len(pts)]');
    pyLines.push('    sketch.addGeometry(Part.LineSegment(V(a[0], a[1], 0), V(b[0], b[1], 0)), False)');
    pyLines.push('for i in range(len(pts)):');
    pyLines.push('    sketch.addConstraint(Sketcher.Constraint("Coincident", i, 2, (i + 1) % len(pts), 1))');
    pyLines.push('');
    pyLines.push('pad = body.newObject("PartDesign::Pad", "Pad")');
    pyLines.push(`pad.Profile, pad.Length = sketch, ${extrudeLen}`);
    pyLines.push('doc.recompute()');
    pyLines.push('sketch.Visibility = False');
    baseSketchCreated = true;
  } else {
    // Default parametric box
    pyLines.push('# Default Base Solid');
    pyLines.push('sketch = body.newObject("Sketcher::SketchObject", "BaseSketch")');
    pyLines.push('pts = [(0, 0), (40, 0), (40, 25), (0, 25)]');
    pyLines.push('for i in range(4):');
    pyLines.push('    a, b = pts[i], pts[(i + 1) % 4]');
    pyLines.push('    sketch.addGeometry(Part.LineSegment(V(a[0], a[1], 0), V(b[0], b[1], 0)), False)');
    pyLines.push('for i in range(4):');
    pyLines.push('    sketch.addConstraint(Sketcher.Constraint("Coincident", i, 2, (i + 1) % 4, 1))');
    pyLines.push('pad = body.newObject("PartDesign::Pad", "Pad")');
    pyLines.push('pad.Profile, pad.Length = sketch, 8.0');
    pyLines.push('doc.recompute()');
    baseSketchCreated = true;
  }

  // Cylinders / Pockets
  if (cylMatches.length > 0) {
    cylMatches.forEach((m, i) => {
      const r = m[1].trim();
      const h = m[2].trim();
      const pos = m[3].split(',').map(s => s.trim());
      pyLines.push('');
      pyLines.push(`# Pocket Feature #${i + 1}`);
      pyLines.push(`pocket_sketch = body.newObject("Sketcher::SketchObject", "PocketSketch_${i + 1}")`);
      pyLines.push(`pocket_sketch.Placement.Base = V(${pos[0]}, ${pos[1]}, ${pos[2]})`);
      pyLines.push(`pocket_sketch.addGeometry(Part.Circle(V(0, 0, 0), V(0, 0, 1), ${r}), False)`);
      pyLines.push('pocket_sketch.addConstraint(Sketcher.Constraint("Coincident", 0, 3, -1, 1))');
      pyLines.push(`pocket = body.newObject("PartDesign::Pocket", "Pocket_${i + 1}")`);
      pyLines.push(`pocket.Profile, pocket.Length = pocket_sketch, ${h}`);
      pyLines.push('doc.recompute()');
      pyLines.push('pocket_sketch.Visibility = False');
    });
  }

  // Fillet
  if (filletMatch) {
    pyLines.push('');
    pyLines.push(`# Fillet 3D`);
    pyLines.push(`fillet = body.newObject("PartDesign::Fillet", "Fillet")`);
    pyLines.push(`fillet.Base = body.Tip`);
    pyLines.push(`fillet.Radius = ${filletMatch[1].trim()}`);
    pyLines.push('try:');
    pyLines.push('    doc.recompute()');
    pyLines.push('except Exception:');
    pyLines.push('    doc.removeObject("Fillet")');
  }

  // Chamfer
  if (chamferMatch) {
    pyLines.push('');
    pyLines.push(`# Chamfer 3D`);
    pyLines.push(`chamfer = body.newObject("PartDesign::Chamfer", "Chamfer")`);
    pyLines.push(`chamfer.Base = body.Tip`);
    pyLines.push(`chamfer.Size = ${chamferMatch[1].trim()}`);
    pyLines.push('try:');
    pyLines.push('    doc.recompute()');
    pyLines.push('except Exception:');
    pyLines.push('    doc.removeObject("Chamfer")');
  }

  pyLines.push('');
  pyLines.push('# Recompute & Validate Solid');
  pyLines.push('doc.recompute()');
  pyLines.push('tip = body.Tip');
  pyLines.push('assert tip.Shape.isValid() and len(tip.Shape.Solids) >= 1, "Solid validation failed"');
  pyLines.push('print("Solid hop le FreeCAD:", round(tip.Shape.Volume, 4), "mm3")');

  return pyLines.join('\n') + '\n';
}
