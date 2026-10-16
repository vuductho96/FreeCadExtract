const DOC_PREAMBLE = `doc = FreeCAD.ActiveDocument
if doc is None:
    doc = FreeCAD.newDocument("Unnamed")`;
export const ASSEMBLY_TOOLS = [
    {
        name: 'freecad_assembly_create',
        description: 'Create a new Assembly container for assembling parts with joints/constraints',
        inputSchema: {
            type: 'object',
            properties: {
                name: { type: 'string', description: 'Name for the assembly (default: "Assembly")' },
            },
            required: [],
        },
    },
    {
        name: 'freecad_assembly_insert_component',
        description: 'Insert a part or body into an assembly as a component',
        inputSchema: {
            type: 'object',
            properties: {
                assemblyName: { type: 'string', description: 'Name of the assembly' },
                objectName: { type: 'string', description: 'Name of the object to insert' },
                x: { type: 'number', description: 'X placement offset (default 0)' },
                y: { type: 'number', description: 'Y placement offset (default 0)' },
                z: { type: 'number', description: 'Z placement offset (default 0)' },
            },
            required: ['assemblyName', 'objectName'],
        },
    },
    {
        name: 'freecad_assembly_toggle_grounded',
        description: 'Toggle whether a component is grounded (fixed in space) in the assembly',
        inputSchema: {
            type: 'object',
            properties: {
                assemblyName: { type: 'string', description: 'Name of the assembly' },
                componentName: { type: 'string', description: 'Name of the component to ground/unground' },
            },
            required: ['assemblyName', 'componentName'],
        },
    },
    {
        name: 'freecad_assembly_fixed_joint',
        description: 'Create a fixed joint locking two components rigidly together',
        inputSchema: {
            type: 'object',
            properties: {
                assemblyName: { type: 'string', description: 'Name of the assembly' },
                component1: { type: 'string', description: 'Name of the first component' },
                element1: { type: 'string', description: 'Element reference on component1 (e.g., "Face1")' },
                component2: { type: 'string', description: 'Name of the second component' },
                element2: { type: 'string', description: 'Element reference on component2 (e.g., "Face1")' },
                name: { type: 'string', description: 'Name for the joint' },
            },
            required: ['assemblyName', 'component1', 'element1', 'component2', 'element2'],
        },
    },
    {
        name: 'freecad_assembly_revolute_joint',
        description: 'Create a revolute (hinge) joint between two components — allows rotation around one axis',
        inputSchema: {
            type: 'object',
            properties: {
                assemblyName: { type: 'string', description: 'Name of the assembly' },
                component1: { type: 'string', description: 'Name of the first component' },
                element1: { type: 'string', description: 'Cylindrical face or edge on component1' },
                component2: { type: 'string', description: 'Name of the second component' },
                element2: { type: 'string', description: 'Cylindrical face or edge on component2' },
                name: { type: 'string', description: 'Name for the joint' },
            },
            required: ['assemblyName', 'component1', 'element1', 'component2', 'element2'],
        },
    },
    {
        name: 'freecad_assembly_slider_joint',
        description: 'Create a slider (prismatic) joint — allows linear translation along one axis',
        inputSchema: {
            type: 'object',
            properties: {
                assemblyName: { type: 'string', description: 'Name of the assembly' },
                component1: { type: 'string', description: 'Name of the first component' },
                element1: { type: 'string', description: 'Face or edge on component1' },
                component2: { type: 'string', description: 'Name of the second component' },
                element2: { type: 'string', description: 'Face or edge on component2' },
                name: { type: 'string', description: 'Name for the joint' },
            },
            required: ['assemblyName', 'component1', 'element1', 'component2', 'element2'],
        },
    },
    {
        name: 'freecad_assembly_cylindrical_joint',
        description: 'Create a cylindrical joint — allows rotation and translation along the same axis',
        inputSchema: {
            type: 'object',
            properties: {
                assemblyName: { type: 'string', description: 'Name of the assembly' },
                component1: { type: 'string', description: 'Name of the first component' },
                element1: { type: 'string', description: 'Cylindrical face on component1' },
                component2: { type: 'string', description: 'Name of the second component' },
                element2: { type: 'string', description: 'Cylindrical face on component2' },
                name: { type: 'string', description: 'Name for the joint' },
            },
            required: ['assemblyName', 'component1', 'element1', 'component2', 'element2'],
        },
    },
    {
        name: 'freecad_assembly_ball_joint',
        description: 'Create a ball (spherical) joint — allows rotation in all 3 axes',
        inputSchema: {
            type: 'object',
            properties: {
                assemblyName: { type: 'string', description: 'Name of the assembly' },
                component1: { type: 'string', description: 'Name of the first component' },
                element1: { type: 'string', description: 'Spherical face or vertex on component1' },
                component2: { type: 'string', description: 'Name of the second component' },
                element2: { type: 'string', description: 'Spherical face or vertex on component2' },
                name: { type: 'string', description: 'Name for the joint' },
            },
            required: ['assemblyName', 'component1', 'element1', 'component2', 'element2'],
        },
    },
    {
        name: 'freecad_assembly_distance_joint',
        description: 'Create a distance constraint between two components',
        inputSchema: {
            type: 'object',
            properties: {
                assemblyName: { type: 'string', description: 'Name of the assembly' },
                component1: { type: 'string', description: 'Name of the first component' },
                element1: { type: 'string', description: 'Element on component1' },
                component2: { type: 'string', description: 'Name of the second component' },
                element2: { type: 'string', description: 'Element on component2' },
                distance: { type: 'number', description: 'Distance value in mm' },
                name: { type: 'string', description: 'Name for the joint' },
            },
            required: ['assemblyName', 'component1', 'element1', 'component2', 'element2', 'distance'],
        },
    },
    {
        name: 'freecad_assembly_solve',
        description: 'Solve the assembly constraints to compute final positions of all components',
        inputSchema: {
            type: 'object',
            properties: {
                assemblyName: { type: 'string', description: 'Name of the assembly to solve' },
            },
            required: ['assemblyName'],
        },
    },
];
// Helper to create joint Python code
function makeJointCode(jointType, assemblyName, comp1, elem1, comp2, elem2, jointName, extraProps = '') {
    return `
${DOC_PREAMBLE}
assembly = doc.getObject(${JSON.stringify(assemblyName)})
if assembly is None:
    raise ValueError("Assembly not found: ${assemblyName}")
c1 = doc.getObject(${JSON.stringify(comp1)})
c2 = doc.getObject(${JSON.stringify(comp2)})
if c1 is None:
    raise ValueError("Component not found: ${comp1}")
if c2 is None:
    raise ValueError("Component not found: ${comp2}")
joint = doc.addObject("Assembly::Joint${jointType}", ${JSON.stringify(jointName)})
joint.ObjectToGround = c1
joint.Part1 = c1
joint.Element1 = ${JSON.stringify(elem1)}
joint.Part2 = c2
joint.Element2 = ${JSON.stringify(elem2)}
${extraProps}
assembly.addObject(joint)
doc.recompute()
_mcp_result["result"] = {"name": joint.Name, "type": "${jointType}", "component1": ${JSON.stringify(comp1)}, "component2": ${JSON.stringify(comp2)}}
`;
}
export async function handleAssemblyTool(name, args, bridge) {
    switch (name) {
        case 'freecad_assembly_create': {
            const asmName = args.name || 'Assembly';
            return bridge.run(`
${DOC_PREAMBLE}
assembly = doc.addObject("Assembly::AssemblyObject", ${JSON.stringify(asmName)})
doc.recompute()
_mcp_result["result"] = {"name": assembly.Name, "label": assembly.Label}
`);
        }
        case 'freecad_assembly_insert_component': {
            const assemblyName = args.assemblyName;
            const objectName = args.objectName;
            const x = args.x ?? 0;
            const y = args.y ?? 0;
            const z = args.z ?? 0;
            return bridge.run(`
${DOC_PREAMBLE}
assembly = doc.getObject(${JSON.stringify(assemblyName)})
if assembly is None:
    raise ValueError("Assembly not found: ${assemblyName}")
obj = doc.getObject(${JSON.stringify(objectName)})
if obj is None:
    raise ValueError("Object not found: ${objectName}")
link = doc.addObject("App::Link", ${JSON.stringify(objectName + '_Link')})
link.LinkedObject = obj
link.Placement.Base = FreeCAD.Vector(${x}, ${y}, ${z})
assembly.addObject(link)
doc.recompute()
_mcp_result["result"] = {"name": link.Name, "linkedTo": obj.Name, "position": {"x": ${x}, "y": ${y}, "z": ${z}}}
`);
        }
        case 'freecad_assembly_toggle_grounded': {
            const assemblyName = args.assemblyName;
            const componentName = args.componentName;
            return bridge.run(`
${DOC_PREAMBLE}
assembly = doc.getObject(${JSON.stringify(assemblyName)})
if assembly is None:
    raise ValueError("Assembly not found: ${assemblyName}")
comp = doc.getObject(${JSON.stringify(componentName)})
if comp is None:
    raise ValueError("Component not found: ${componentName}")
# Create a grounded joint
grounded = doc.addObject("Assembly::JointFixed", "Grounded_" + comp.Name)
grounded.ObjectToGround = comp
assembly.addObject(grounded)
doc.recompute()
_mcp_result["result"] = {"name": grounded.Name, "component": comp.Name, "grounded": True}
`);
        }
        case 'freecad_assembly_fixed_joint': {
            const assemblyName = args.assemblyName;
            const comp1 = args.component1;
            const elem1 = args.element1;
            const comp2 = args.component2;
            const elem2 = args.element2;
            const jName = args.name || 'FixedJoint';
            return bridge.run(makeJointCode('Fixed', assemblyName, comp1, elem1, comp2, elem2, jName));
        }
        case 'freecad_assembly_revolute_joint': {
            const assemblyName = args.assemblyName;
            const comp1 = args.component1;
            const elem1 = args.element1;
            const comp2 = args.component2;
            const elem2 = args.element2;
            const jName = args.name || 'RevoluteJoint';
            return bridge.run(makeJointCode('Revolute', assemblyName, comp1, elem1, comp2, elem2, jName));
        }
        case 'freecad_assembly_slider_joint': {
            const assemblyName = args.assemblyName;
            const comp1 = args.component1;
            const elem1 = args.element1;
            const comp2 = args.component2;
            const elem2 = args.element2;
            const jName = args.name || 'SliderJoint';
            return bridge.run(makeJointCode('Slider', assemblyName, comp1, elem1, comp2, elem2, jName));
        }
        case 'freecad_assembly_cylindrical_joint': {
            const assemblyName = args.assemblyName;
            const comp1 = args.component1;
            const elem1 = args.element1;
            const comp2 = args.component2;
            const elem2 = args.element2;
            const jName = args.name || 'CylindricalJoint';
            return bridge.run(makeJointCode('Cylindrical', assemblyName, comp1, elem1, comp2, elem2, jName));
        }
        case 'freecad_assembly_ball_joint': {
            const assemblyName = args.assemblyName;
            const comp1 = args.component1;
            const elem1 = args.element1;
            const comp2 = args.component2;
            const elem2 = args.element2;
            const jName = args.name || 'BallJoint';
            return bridge.run(makeJointCode('Ball', assemblyName, comp1, elem1, comp2, elem2, jName));
        }
        case 'freecad_assembly_distance_joint': {
            const assemblyName = args.assemblyName;
            const comp1 = args.component1;
            const elem1 = args.element1;
            const comp2 = args.component2;
            const elem2 = args.element2;
            const distance = args.distance;
            const jName = args.name || 'DistanceJoint';
            return bridge.run(makeJointCode('Distance', assemblyName, comp1, elem1, comp2, elem2, jName, `joint.Distance = ${distance}`));
        }
        case 'freecad_assembly_solve': {
            const assemblyName = args.assemblyName;
            return bridge.run(`
${DOC_PREAMBLE}
assembly = doc.getObject(${JSON.stringify(assemblyName)})
if assembly is None:
    raise ValueError("Assembly not found: ${assemblyName}")
doc.recompute()
joints = [o for o in assembly.Group if "Joint" in o.TypeId]
components = [o for o in assembly.Group if o.TypeId == "App::Link"]
_mcp_result["result"] = {"assembly": assembly.Name, "joints": len(joints), "components": len(components), "status": "solved"}
`);
        }
        default:
            return {
                content: [{ type: 'text', text: `Unknown assembly tool: ${name}` }],
                isError: true,
            };
    }
}
//# sourceMappingURL=assembly.js.map