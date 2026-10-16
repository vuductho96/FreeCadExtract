export const PART_DESIGN_TOOLS = [
    {
        name: 'freecad_pad',
        description: 'Extrude a sketch into a solid (PartDesign Pad). Creates a PartDesign Body if one does not exist.',
        inputSchema: {
            type: 'object',
            properties: {
                sketchName: { type: 'string', description: 'Name of the sketch to extrude' },
                length: { type: 'number', description: 'Extrusion length in mm' },
                symmetric: { type: 'boolean', description: 'Extrude symmetrically in both directions' },
                reversed: { type: 'boolean', description: 'Extrude in the reversed direction' },
                name: { type: 'string', description: 'Optional name for the Pad feature' },
            },
            required: ['sketchName', 'length'],
        },
    },
    {
        name: 'freecad_pocket',
        description: 'Cut into a solid from a sketch (PartDesign Pocket)',
        inputSchema: {
            type: 'object',
            properties: {
                sketchName: { type: 'string', description: 'Name of the sketch defining the pocket profile' },
                depth: { type: 'number', description: 'Pocket depth in mm' },
                name: { type: 'string', description: 'Optional name for the Pocket feature' },
            },
            required: ['sketchName', 'depth'],
        },
    },
    {
        name: 'freecad_revolve',
        description: 'Revolve a sketch around an axis (PartDesign Revolution)',
        inputSchema: {
            type: 'object',
            properties: {
                sketchName: { type: 'string', description: 'Name of the sketch to revolve' },
                angle: { type: 'number', description: 'Revolution angle in degrees (default 360)' },
                axisX: { type: 'number', description: 'X component of revolution axis (default 0)' },
                axisY: { type: 'number', description: 'Y component of revolution axis (default 1)' },
                axisZ: { type: 'number', description: 'Z component of revolution axis (default 0)' },
                name: { type: 'string', description: 'Optional name for the Revolution feature' },
            },
            required: ['sketchName'],
        },
    },
    {
        name: 'freecad_loft',
        description: 'Loft between two or more sketches/profiles to create a solid',
        inputSchema: {
            type: 'object',
            properties: {
                sketchNames: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Array of sketch/profile names to loft between',
                },
                solid: { type: 'boolean', description: 'Create a solid (default true)' },
                name: { type: 'string', description: 'Optional name for the Loft feature' },
            },
            required: ['sketchNames'],
        },
    },
    {
        name: 'freecad_sweep',
        description: 'Sweep a profile along a path to create a solid',
        inputSchema: {
            type: 'object',
            properties: {
                profileName: { type: 'string', description: 'Name of the profile sketch to sweep' },
                pathName: { type: 'string', description: 'Name of the path edge/wire to sweep along' },
                solid: { type: 'boolean', description: 'Create a solid (default true)' },
                name: { type: 'string', description: 'Optional name for the Sweep feature' },
            },
            required: ['profileName', 'pathName'],
        },
    },
    {
        name: 'freecad_partdesign_fillet',
        description: 'Fillet (round) edges on a PartDesign body',
        inputSchema: {
            type: 'object',
            properties: {
                objectName: { type: 'string', description: 'Name of the object whose edges to fillet' },
                radius: { type: 'number', description: 'Fillet radius in mm' },
                edgeNames: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Optional list of edge names (e.g. ["Edge1","Edge2"]). If omitted, all edges are filleted.',
                },
                name: { type: 'string', description: 'Optional name for the Fillet feature' },
            },
            required: ['objectName', 'radius'],
        },
    },
    {
        name: 'freecad_partdesign_chamfer',
        description: 'Chamfer edges on a PartDesign body',
        inputSchema: {
            type: 'object',
            properties: {
                objectName: { type: 'string', description: 'Name of the object whose edges to chamfer' },
                size: { type: 'number', description: 'Chamfer size in mm' },
                edgeNames: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Optional list of edge names (e.g. ["Edge1","Edge2"]). If omitted, all edges are chamfered.',
                },
                name: { type: 'string', description: 'Optional name for the Chamfer feature' },
            },
            required: ['objectName', 'size'],
        },
    },
    {
        name: 'freecad_hole',
        description: 'Create a hole (drill, counterbore, countersink) in a PartDesign body from a sketch with a circle',
        inputSchema: {
            type: 'object',
            properties: {
                sketchName: { type: 'string', description: 'Name of the sketch containing the hole center(s)' },
                diameter: { type: 'number', description: 'Hole diameter in mm' },
                depth: { type: 'number', description: 'Hole depth in mm (0 = through all)' },
                holeType: {
                    type: 'string',
                    enum: ['simple', 'counterbore', 'countersink'],
                    description: 'Hole type (default: simple)',
                },
                counterboreDiameter: { type: 'number', description: 'Counterbore diameter (for counterbore type)' },
                counterboreDepth: { type: 'number', description: 'Counterbore depth (for counterbore type)' },
                countersinkAngle: { type: 'number', description: 'Countersink angle in degrees (for countersink type, default 90)' },
                threaded: { type: 'boolean', description: 'Add threading (default false)' },
                name: { type: 'string', description: 'Name for the Hole feature' },
            },
            required: ['sketchName', 'diameter'],
        },
    },
    {
        name: 'freecad_partdesign_thickness',
        description: 'Shell/hollow out a PartDesign body by removing selected faces and offsetting the rest inward',
        inputSchema: {
            type: 'object',
            properties: {
                objectName: { type: 'string', description: 'Name of the feature to hollow (e.g. Pad name)' },
                thickness: { type: 'number', description: 'Wall thickness in mm' },
                faceNames: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Faces to remove as openings (e.g. ["Face6"])',
                },
                name: { type: 'string', description: 'Name for the Thickness feature' },
            },
            required: ['objectName', 'thickness', 'faceNames'],
        },
    },
    {
        name: 'freecad_linear_pattern',
        description: 'Create a linear pattern of a PartDesign feature (repeat feature at regular intervals along a direction)',
        inputSchema: {
            type: 'object',
            properties: {
                featureName: { type: 'string', description: 'Name of the PartDesign feature to pattern' },
                directionAxis: {
                    type: 'string',
                    enum: ['x', 'y', 'z'],
                    description: 'Pattern direction axis (default: x)',
                },
                length: { type: 'number', description: 'Total length of the pattern in mm' },
                occurrences: { type: 'number', description: 'Number of occurrences (including original)' },
                name: { type: 'string', description: 'Name for the LinearPattern feature' },
            },
            required: ['featureName', 'length', 'occurrences'],
        },
    },
    {
        name: 'freecad_polar_pattern',
        description: 'Create a polar (circular) pattern of a PartDesign feature around an axis',
        inputSchema: {
            type: 'object',
            properties: {
                featureName: { type: 'string', description: 'Name of the PartDesign feature to pattern' },
                axis: {
                    type: 'string',
                    enum: ['x', 'y', 'z'],
                    description: 'Rotation axis (default: z)',
                },
                angle: { type: 'number', description: 'Total angle in degrees (default 360)' },
                occurrences: { type: 'number', description: 'Number of occurrences (including original)' },
                name: { type: 'string', description: 'Name for the PolarPattern feature' },
            },
            required: ['featureName', 'occurrences'],
        },
    },
    {
        name: 'freecad_partdesign_mirrored',
        description: 'Mirror a PartDesign feature across a plane',
        inputSchema: {
            type: 'object',
            properties: {
                featureName: { type: 'string', description: 'Name of the PartDesign feature to mirror' },
                plane: {
                    type: 'string',
                    enum: ['XY', 'XZ', 'YZ'],
                    description: 'Mirror plane (default: YZ)',
                },
                name: { type: 'string', description: 'Name for the Mirrored feature' },
            },
            required: ['featureName'],
        },
    },
    {
        name: 'freecad_additive_helix',
        description: 'Sweep a sketch profile along a helix path to add material (for springs, threads, coils)',
        inputSchema: {
            type: 'object',
            properties: {
                sketchName: { type: 'string', description: 'Name of the profile sketch' },
                pitch: { type: 'number', description: 'Distance between turns in mm' },
                height: { type: 'number', description: 'Total helix height in mm' },
                turns: { type: 'number', description: 'Number of turns (alternative to height — provide one or the other)' },
                leftHanded: { type: 'boolean', description: 'Left-handed helix (default false)' },
                reversed: { type: 'boolean', description: 'Reverse growth direction (default false)' },
                name: { type: 'string', description: 'Name for the feature' },
            },
            required: ['sketchName', 'pitch'],
        },
    },
    {
        name: 'freecad_subtractive_helix',
        description: 'Sweep a sketch profile along a helix path to remove material (for cutting threads, helical grooves)',
        inputSchema: {
            type: 'object',
            properties: {
                sketchName: { type: 'string', description: 'Name of the profile sketch' },
                pitch: { type: 'number', description: 'Distance between turns in mm' },
                height: { type: 'number', description: 'Total helix height in mm' },
                turns: { type: 'number', description: 'Number of turns (alternative to height)' },
                leftHanded: { type: 'boolean', description: 'Left-handed helix (default false)' },
                name: { type: 'string', description: 'Name for the feature' },
            },
            required: ['sketchName', 'pitch'],
        },
    },
    {
        name: 'freecad_additive_pipe',
        description: 'Sweep a sketch profile along a spine path to add material (pipe/tube along complex paths)',
        inputSchema: {
            type: 'object',
            properties: {
                profileName: { type: 'string', description: 'Name of the profile sketch' },
                spineName: { type: 'string', description: 'Name of the spine/path object (wire/edge)' },
                name: { type: 'string', description: 'Name for the feature' },
            },
            required: ['profileName', 'spineName'],
        },
    },
    {
        name: 'freecad_subtractive_pipe',
        description: 'Sweep a sketch profile along a spine path to remove material (cut channel along path)',
        inputSchema: {
            type: 'object',
            properties: {
                profileName: { type: 'string', description: 'Name of the profile sketch' },
                spineName: { type: 'string', description: 'Name of the spine/path object (wire/edge)' },
                name: { type: 'string', description: 'Name for the feature' },
            },
            required: ['profileName', 'spineName'],
        },
    },
    {
        name: 'freecad_groove',
        description: 'Subtractive revolution — rotate a sketch profile to remove material (lathe-cut grooves, channels)',
        inputSchema: {
            type: 'object',
            properties: {
                sketchName: { type: 'string', description: 'Name of the sketch profile' },
                angle: { type: 'number', description: 'Revolution angle in degrees (default 360)' },
                axisX: { type: 'number', description: 'X component of revolution axis (default 0)' },
                axisY: { type: 'number', description: 'Y component of revolution axis (default 1)' },
                axisZ: { type: 'number', description: 'Z component of revolution axis (default 0)' },
                name: { type: 'string', description: 'Name for the feature' },
            },
            required: ['sketchName'],
        },
    },
    {
        name: 'freecad_draft_angle',
        description: 'Apply a draft angle to faces of a PartDesign body (tapered faces for injection molding)',
        inputSchema: {
            type: 'object',
            properties: {
                featureName: { type: 'string', description: 'Name of the feature whose faces to draft' },
                faceNames: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Faces to apply draft to (e.g., ["Face1", "Face3"])',
                },
                angle: { type: 'number', description: 'Draft angle in degrees (default 5)' },
                pullDirection: { type: 'string', description: 'Face that defines pull direction (e.g., "Face6")' },
                name: { type: 'string', description: 'Name for the feature' },
            },
            required: ['featureName', 'faceNames', 'angle'],
        },
    },
    {
        name: 'freecad_multi_transform',
        description: 'Combine multiple transformations (mirror + linear pattern + polar pattern) into one feature',
        inputSchema: {
            type: 'object',
            properties: {
                featureName: { type: 'string', description: 'Name of the PartDesign feature to transform' },
                transformNames: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Names of existing transformation features to combine (e.g., ["Mirrored", "LinearPattern"])',
                },
                name: { type: 'string', description: 'Name for the MultiTransform feature' },
            },
            required: ['featureName', 'transformNames'],
        },
    },
    {
        name: 'freecad_shape_binder',
        description: 'Create a ShapeBinder to reference external geometry inside a PartDesign body',
        inputSchema: {
            type: 'object',
            properties: {
                objectName: { type: 'string', description: 'Name of the external object to reference' },
                subElements: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Sub-elements to bind (e.g., ["Face1", "Edge2"]). If empty, binds entire shape.',
                },
                name: { type: 'string', description: 'Name for the ShapeBinder' },
            },
            required: ['objectName'],
        },
    },
];
export async function handlePartDesignTool(name, args, bridge) {
    switch (name) {
        case 'freecad_pad': {
            const sketchName = args.sketchName;
            const length = args.length;
            const symmetric = args.symmetric ?? false;
            const reversed = args.reversed ?? false;
            const padName = args.name || 'Pad';
            return bridge.run(`
doc = FreeCAD.ActiveDocument
sketch = doc.getObject(${JSON.stringify(sketchName)})
# Create a PartDesign Body if none exists
body = None
for obj in doc.Objects:
    if obj.TypeId == "PartDesign::Body":
        body = obj
        break
if body is None:
    body = doc.addObject("PartDesign::Body", "Body")
if sketch not in body.Group:
    body.addObject(sketch)
pad = doc.addObject("PartDesign::Pad", ${JSON.stringify(padName)})
pad.Profile = sketch
pad.Length = ${length}
if hasattr(pad, 'Midplane'):
    pad.Midplane = ${symmetric ? 'True' : 'False'}
elif hasattr(pad, 'SideType'):
    pad.SideType = 'Symmetric' if ${symmetric ? 'True' : 'False'} else 'One side'
pad.Reversed = ${reversed ? 'True' : 'False'}
body.addObject(pad)
doc.recompute()
_mcp_result["result"] = {"name": pad.Name, "length": pad.Length, "type": pad.TypeId}
`);
        }
        case 'freecad_pocket': {
            const sketchName = args.sketchName;
            const depth = args.depth;
            const pocketName = args.name || 'Pocket';
            return bridge.run(`
doc = FreeCAD.ActiveDocument
sketch = doc.getObject(${JSON.stringify(sketchName)})
body = None
for obj in doc.Objects:
    if obj.TypeId == "PartDesign::Body":
        body = obj
        break
if body is None:
    body = doc.addObject("PartDesign::Body", "Body")
if sketch not in body.Group:
    body.addObject(sketch)
pocket = doc.addObject("PartDesign::Pocket", ${JSON.stringify(pocketName)})
pocket.Profile = sketch
pocket.Length = ${depth}
body.addObject(pocket)
doc.recompute()
_mcp_result["result"] = {"name": pocket.Name, "depth": pocket.Length, "type": pocket.TypeId}
`);
        }
        case 'freecad_revolve': {
            const sketchName = args.sketchName;
            const angle = args.angle ?? 360;
            const axisX = args.axisX ?? 0;
            const axisY = args.axisY ?? 1;
            const axisZ = args.axisZ ?? 0;
            const revName = args.name || 'Revolution';
            return bridge.run(`
doc = FreeCAD.ActiveDocument
sketch = doc.getObject(${JSON.stringify(sketchName)})
body = None
for obj in doc.Objects:
    if obj.TypeId == "PartDesign::Body":
        body = obj
        break
if body is None:
    body = doc.addObject("PartDesign::Body", "Body")
if sketch not in body.Group:
    body.addObject(sketch)
rev = doc.addObject("PartDesign::Revolution", ${JSON.stringify(revName)})
rev.Profile = sketch
rev.Angle = ${angle}
rev.Axis = FreeCAD.Vector(${axisX}, ${axisY}, ${axisZ})
body.addObject(rev)
doc.recompute()
_mcp_result["result"] = {"name": rev.Name, "angle": rev.Angle, "type": rev.TypeId}
`);
        }
        case 'freecad_loft': {
            const sketchNames = args.sketchNames;
            const solid = args.solid ?? true;
            const loftName = args.name || 'Loft';
            const sectionsCode = `[doc.getObject(s) for s in ${JSON.stringify(sketchNames)}]`;
            return bridge.run(`
doc = FreeCAD.ActiveDocument
loft = doc.addObject("Part::Loft", ${JSON.stringify(loftName)})
loft.Sections = ${sectionsCode}
loft.Solid = ${solid ? 'True' : 'False'}
doc.recompute()
_mcp_result["result"] = {"name": loft.Name, "sections": ${JSON.stringify(sketchNames)}, "solid": ${solid}, "type": loft.TypeId}
`);
        }
        case 'freecad_sweep': {
            const profileName = args.profileName;
            const pathName = args.pathName;
            const solid = args.solid ?? true;
            const sweepName = args.name || 'Sweep';
            return bridge.run(`
doc = FreeCAD.ActiveDocument
sweep = doc.addObject("Part::Sweep", ${JSON.stringify(sweepName)})
sweep.Sections = [doc.getObject(${JSON.stringify(profileName)})]
sweep.Spine = (doc.getObject(${JSON.stringify(pathName)}), [])
sweep.Solid = ${solid ? 'True' : 'False'}
doc.recompute()
_mcp_result["result"] = {"name": sweep.Name, "profile": ${JSON.stringify(profileName)}, "path": ${JSON.stringify(pathName)}, "type": sweep.TypeId}
`);
        }
        case 'freecad_partdesign_fillet': {
            const objectName = args.objectName;
            const radius = args.radius;
            const edgeNames = args.edgeNames;
            const filletName = args.name || 'Fillet';
            const edgesCode = edgeNames
                ? JSON.stringify(edgeNames)
                : `["Edge" + str(i+1) for i in range(len(obj.Shape.Edges))]`;
            return bridge.run(`
doc = FreeCAD.ActiveDocument
obj = doc.getObject(${JSON.stringify(objectName)})
edges = ${edgesCode}
fillet = doc.addObject("PartDesign::Fillet", ${JSON.stringify(filletName)})
fillet.Base = (obj, edges)
fillet.Radius = ${radius}
doc.recompute()
_mcp_result["result"] = {"name": fillet.Name, "radius": fillet.Radius, "edges": edges, "type": fillet.TypeId}
`);
        }
        case 'freecad_partdesign_chamfer': {
            const objectName = args.objectName;
            const size = args.size;
            const edgeNames = args.edgeNames;
            const chamferName = args.name || 'Chamfer';
            const edgesCode = edgeNames
                ? JSON.stringify(edgeNames)
                : `["Edge" + str(i+1) for i in range(len(obj.Shape.Edges))]`;
            return bridge.run(`
doc = FreeCAD.ActiveDocument
obj = doc.getObject(${JSON.stringify(objectName)})
edges = ${edgesCode}
cham = doc.addObject("PartDesign::Chamfer", ${JSON.stringify(chamferName)})
cham.Base = (obj, edges)
cham.Size = ${size}
doc.recompute()
_mcp_result["result"] = {"name": cham.Name, "size": cham.Size, "edges": edges, "type": cham.TypeId}
`);
        }
        case 'freecad_hole': {
            const sketchName = args.sketchName;
            const diameter = args.diameter;
            const depth = args.depth ?? 0;
            const holeType = args.holeType || 'simple';
            const counterboreDiameter = args.counterboreDiameter;
            const counterboreDepth = args.counterboreDepth;
            const countersinkAngle = args.countersinkAngle ?? 90;
            const threaded = args.threaded ?? false;
            const holeName = args.name || 'Hole';
            const throughAll = depth === 0;
            return bridge.run(`
doc = FreeCAD.ActiveDocument
sketch = doc.getObject(${JSON.stringify(sketchName)})
body = None
for obj in doc.Objects:
    if obj.TypeId == "PartDesign::Body":
        body = obj
        break
if body is None:
    body = doc.addObject("PartDesign::Body", "Body")
if sketch not in body.Group:
    body.addObject(sketch)
hole = doc.addObject("PartDesign::Hole", ${JSON.stringify(holeName)})
hole.Profile = sketch
hole.Diameter = ${diameter}
${throughAll ? 'hole.DepthType = "ThroughAll"' : `hole.DepthType = "Dimension"\nhole.Depth = ${depth}`}
${holeType === 'counterbore' && counterboreDiameter !== undefined ? `hole.HoleType = "Counterbore"\nhole.HoleCutDiameter = ${counterboreDiameter}\nhole.HoleCutDepth = ${counterboreDepth ?? 3}` : ''}
${holeType === 'countersink' ? `hole.HoleType = "Countersink"\nhole.HoleCutCountersinkAngle = ${countersinkAngle}` : ''}
${threaded ? 'hole.Threaded = True' : ''}
body.addObject(hole)
doc.recompute()
_mcp_result["result"] = {"name": hole.Name, "diameter": ${diameter}, "depth": ${depth}, "type": ${JSON.stringify(holeType)}}
`);
        }
        case 'freecad_partdesign_thickness': {
            const objectName = args.objectName;
            const thickness = args.thickness;
            const faceNames = args.faceNames;
            const thkName = args.name || 'Thickness';
            return bridge.run(`
doc = FreeCAD.ActiveDocument
obj = doc.getObject(${JSON.stringify(objectName)})
if obj is None:
    raise ValueError("Object not found: ${objectName}")
body = None
for b in doc.Objects:
    if b.TypeId == "PartDesign::Body":
        body = b
        break
if body is None:
    raise ValueError("No PartDesign Body found")
thk = doc.addObject("PartDesign::Thickness", ${JSON.stringify(thkName)})
thk.Base = (obj, ${JSON.stringify(faceNames)})
thk.Value = ${thickness}
thk.Reversed = False
body.addObject(thk)
doc.recompute()
_mcp_result["result"] = {"name": thk.Name, "thickness": ${thickness}, "faces": ${JSON.stringify(faceNames)}}
`);
        }
        case 'freecad_linear_pattern': {
            const featureName = args.featureName;
            const directionAxis = args.directionAxis || 'x';
            const length = args.length;
            const occurrences = args.occurrences;
            const lpName = args.name || 'LinearPattern';
            const axisMap = {
                x: 'FreeCAD.Vector(1, 0, 0)',
                y: 'FreeCAD.Vector(0, 1, 0)',
                z: 'FreeCAD.Vector(0, 0, 1)',
            };
            const axisVec = axisMap[directionAxis] || axisMap['x'];
            return bridge.run(`
doc = FreeCAD.ActiveDocument
feature = doc.getObject(${JSON.stringify(featureName)})
if feature is None:
    raise ValueError("Feature not found: ${featureName}")
body = None
for b in doc.Objects:
    if b.TypeId == "PartDesign::Body":
        body = b
        break
if body is None:
    raise ValueError("No PartDesign Body found")
lp = doc.addObject("PartDesign::LinearPattern", ${JSON.stringify(lpName)})
lp.Originals = [feature]
lp.Direction = (feature, ["N_Axis"])
lp.Length = ${length}
lp.Occurrences = ${occurrences}
body.addObject(lp)
doc.recompute()
_mcp_result["result"] = {"name": lp.Name, "length": ${length}, "occurrences": ${occurrences}, "axis": ${JSON.stringify(directionAxis)}}
`);
        }
        case 'freecad_polar_pattern': {
            const featureName = args.featureName;
            const axis = args.axis || 'z';
            const angle = args.angle ?? 360;
            const occurrences = args.occurrences;
            const ppName = args.name || 'PolarPattern';
            return bridge.run(`
doc = FreeCAD.ActiveDocument
feature = doc.getObject(${JSON.stringify(featureName)})
if feature is None:
    raise ValueError("Feature not found: ${featureName}")
body = None
for b in doc.Objects:
    if b.TypeId == "PartDesign::Body":
        body = b
        break
if body is None:
    raise ValueError("No PartDesign Body found")
pp = doc.addObject("PartDesign::PolarPattern", ${JSON.stringify(ppName)})
pp.Originals = [feature]
pp.Axis = (feature, ["N_Axis"])
pp.Angle = ${angle}
pp.Occurrences = ${occurrences}
body.addObject(pp)
doc.recompute()
_mcp_result["result"] = {"name": pp.Name, "angle": ${angle}, "occurrences": ${occurrences}, "axis": ${JSON.stringify(axis)}}
`);
        }
        case 'freecad_partdesign_mirrored': {
            const featureName = args.featureName;
            const plane = args.plane || 'YZ';
            const mirName = args.name || 'Mirrored';
            return bridge.run(`
doc = FreeCAD.ActiveDocument
feature = doc.getObject(${JSON.stringify(featureName)})
if feature is None:
    raise ValueError("Feature not found: ${featureName}")
body = None
for b in doc.Objects:
    if b.TypeId == "PartDesign::Body":
        body = b
        break
if body is None:
    raise ValueError("No PartDesign Body found")
mir = doc.addObject("PartDesign::Mirrored", ${JSON.stringify(mirName)})
mir.Originals = [feature]
mir.MirrorPlane = (feature, ["N_Axis"])
body.addObject(mir)
doc.recompute()
_mcp_result["result"] = {"name": mir.Name, "plane": ${JSON.stringify(plane)}}
`);
        }
        case 'freecad_additive_helix': {
            const sketchName = args.sketchName;
            const pitch = args.pitch;
            const height = args.height;
            const turns = args.turns;
            const leftHanded = args.leftHanded ?? false;
            const reversed = args.reversed ?? false;
            const helixName = args.name || 'AdditiveHelix';
            return bridge.run(`
doc = FreeCAD.ActiveDocument
sketch = doc.getObject(${JSON.stringify(sketchName)})
body = None
for obj in doc.Objects:
    if obj.TypeId == "PartDesign::Body":
        body = obj
        break
if body is None:
    body = doc.addObject("PartDesign::Body", "Body")
if sketch not in body.Group:
    body.addObject(sketch)
helix = doc.addObject("PartDesign::AdditiveHelix", ${JSON.stringify(helixName)})
helix.Profile = sketch
helix.Pitch = ${pitch}
${height !== undefined ? `helix.Height = ${height}` : ''}
${turns !== undefined ? `helix.Turns = ${turns}` : ''}
helix.LeftHanded = ${leftHanded ? 'True' : 'False'}
helix.Reversed = ${reversed ? 'True' : 'False'}
body.addObject(helix)
doc.recompute()
_mcp_result["result"] = {"name": helix.Name, "pitch": ${pitch}, "type": helix.TypeId}
`);
        }
        case 'freecad_subtractive_helix': {
            const sketchName = args.sketchName;
            const pitch = args.pitch;
            const height = args.height;
            const turns = args.turns;
            const leftHanded = args.leftHanded ?? false;
            const helixName = args.name || 'SubtractiveHelix';
            return bridge.run(`
doc = FreeCAD.ActiveDocument
sketch = doc.getObject(${JSON.stringify(sketchName)})
body = None
for obj in doc.Objects:
    if obj.TypeId == "PartDesign::Body":
        body = obj
        break
if body is None:
    raise ValueError("No PartDesign Body found — need existing solid to cut from")
if sketch not in body.Group:
    body.addObject(sketch)
helix = doc.addObject("PartDesign::SubtractiveHelix", ${JSON.stringify(helixName)})
helix.Profile = sketch
helix.Pitch = ${pitch}
${height !== undefined ? `helix.Height = ${height}` : ''}
${turns !== undefined ? `helix.Turns = ${turns}` : ''}
helix.LeftHanded = ${leftHanded ? 'True' : 'False'}
body.addObject(helix)
doc.recompute()
_mcp_result["result"] = {"name": helix.Name, "pitch": ${pitch}, "type": helix.TypeId}
`);
        }
        case 'freecad_additive_pipe': {
            const profileName = args.profileName;
            const spineName = args.spineName;
            const pipeName = args.name || 'AdditivePipe';
            return bridge.run(`
doc = FreeCAD.ActiveDocument
profile = doc.getObject(${JSON.stringify(profileName)})
spine = doc.getObject(${JSON.stringify(spineName)})
if profile is None:
    raise ValueError("Profile not found: ${profileName}")
if spine is None:
    raise ValueError("Spine not found: ${spineName}")
body = None
for obj in doc.Objects:
    if obj.TypeId == "PartDesign::Body":
        body = obj
        break
if body is None:
    body = doc.addObject("PartDesign::Body", "Body")
if profile not in body.Group:
    body.addObject(profile)
pipe = doc.addObject("PartDesign::AdditivePipe", ${JSON.stringify(pipeName)})
pipe.Profile = profile
pipe.Spine = (spine, ["Edge1"])
body.addObject(pipe)
doc.recompute()
_mcp_result["result"] = {"name": pipe.Name, "type": pipe.TypeId}
`);
        }
        case 'freecad_subtractive_pipe': {
            const profileName = args.profileName;
            const spineName = args.spineName;
            const pipeName = args.name || 'SubtractivePipe';
            return bridge.run(`
doc = FreeCAD.ActiveDocument
profile = doc.getObject(${JSON.stringify(profileName)})
spine = doc.getObject(${JSON.stringify(spineName)})
if profile is None:
    raise ValueError("Profile not found: ${profileName}")
if spine is None:
    raise ValueError("Spine not found: ${spineName}")
body = None
for obj in doc.Objects:
    if obj.TypeId == "PartDesign::Body":
        body = obj
        break
if body is None:
    raise ValueError("No PartDesign Body found")
if profile not in body.Group:
    body.addObject(profile)
pipe = doc.addObject("PartDesign::SubtractivePipe", ${JSON.stringify(pipeName)})
pipe.Profile = profile
pipe.Spine = (spine, ["Edge1"])
body.addObject(pipe)
doc.recompute()
_mcp_result["result"] = {"name": pipe.Name, "type": pipe.TypeId}
`);
        }
        case 'freecad_groove': {
            const sketchName = args.sketchName;
            const angle = args.angle ?? 360;
            const axisX = args.axisX ?? 0;
            const axisY = args.axisY ?? 1;
            const axisZ = args.axisZ ?? 0;
            const grooveName = args.name || 'Groove';
            return bridge.run(`
doc = FreeCAD.ActiveDocument
sketch = doc.getObject(${JSON.stringify(sketchName)})
body = None
for obj in doc.Objects:
    if obj.TypeId == "PartDesign::Body":
        body = obj
        break
if body is None:
    raise ValueError("No PartDesign Body found")
if sketch not in body.Group:
    body.addObject(sketch)
groove = doc.addObject("PartDesign::Groove", ${JSON.stringify(grooveName)})
groove.Profile = sketch
groove.Angle = ${angle}
groove.Axis = FreeCAD.Vector(${axisX}, ${axisY}, ${axisZ})
body.addObject(groove)
doc.recompute()
_mcp_result["result"] = {"name": groove.Name, "angle": ${angle}, "type": groove.TypeId}
`);
        }
        case 'freecad_draft_angle': {
            const featureName = args.featureName;
            const faceNames = args.faceNames;
            const angle = args.angle ?? 5;
            const pullDirection = args.pullDirection;
            const draftName = args.name || 'Draft';
            return bridge.run(`
doc = FreeCAD.ActiveDocument
feature = doc.getObject(${JSON.stringify(featureName)})
if feature is None:
    raise ValueError("Feature not found: ${featureName}")
body = None
for b in doc.Objects:
    if b.TypeId == "PartDesign::Body":
        body = b
        break
if body is None:
    raise ValueError("No PartDesign Body found")
draft = doc.addObject("PartDesign::Draft", ${JSON.stringify(draftName)})
draft.Base = (feature, ${JSON.stringify(faceNames)})
draft.Angle = ${angle}
${pullDirection ? `draft.NeutralPlane = (feature, [${JSON.stringify(pullDirection)}])` : ''}
body.addObject(draft)
doc.recompute()
_mcp_result["result"] = {"name": draft.Name, "angle": ${angle}, "faces": ${JSON.stringify(faceNames)}}
`);
        }
        case 'freecad_multi_transform': {
            const featureName = args.featureName;
            const transformNames = args.transformNames;
            const mtName = args.name || 'MultiTransform';
            return bridge.run(`
doc = FreeCAD.ActiveDocument
feature = doc.getObject(${JSON.stringify(featureName)})
if feature is None:
    raise ValueError("Feature not found: ${featureName}")
body = None
for b in doc.Objects:
    if b.TypeId == "PartDesign::Body":
        body = b
        break
if body is None:
    raise ValueError("No PartDesign Body found")
mt = doc.addObject("PartDesign::MultiTransform", ${JSON.stringify(mtName)})
mt.Originals = [feature]
transforms = [doc.getObject(n) for n in ${JSON.stringify(transformNames)}]
mt.Transformations = transforms
body.addObject(mt)
doc.recompute()
_mcp_result["result"] = {"name": mt.Name, "transforms": ${JSON.stringify(transformNames)}}
`);
        }
        case 'freecad_shape_binder': {
            const objectName = args.objectName;
            const subElements = args.subElements || [];
            const sbName = args.name || 'ShapeBinder';
            return bridge.run(`
doc = FreeCAD.ActiveDocument
obj = doc.getObject(${JSON.stringify(objectName)})
if obj is None:
    raise ValueError("Object not found: ${objectName}")
body = None
for b in doc.Objects:
    if b.TypeId == "PartDesign::Body":
        body = b
        break
if body is None:
    body = doc.addObject("PartDesign::Body", "Body")
sb = doc.addObject("PartDesign::ShapeBinder", ${JSON.stringify(sbName)})
subs = ${JSON.stringify(subElements)}
if subs:
    sb.Support = [(obj, tuple(subs))]
else:
    sb.Support = [(obj, "")]
body.addObject(sb)
doc.recompute()
_mcp_result["result"] = {"name": sb.Name, "source": ${JSON.stringify(objectName)}, "subElements": ${JSON.stringify(subElements)}}
`);
        }
        default:
            return {
                content: [{ type: 'text', text: `Unknown part design tool: ${name}` }],
                isError: true,
            };
    }
}
//# sourceMappingURL=part-design.js.map
