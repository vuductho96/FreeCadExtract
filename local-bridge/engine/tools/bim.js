const DOC_PREAMBLE = `doc = FreeCAD.ActiveDocument
if doc is None:
    doc = FreeCAD.newDocument("Unnamed")`;
export const BIM_TOOLS = [
    {
        name: 'freecad_arch_wall',
        description: 'Create an architectural wall from a baseline or between two points',
        inputSchema: {
            type: 'object',
            properties: {
                baselineName: { type: 'string', description: 'Name of a baseline object (Wire, Edge) to follow. If omitted, creates a straight wall from start to end points.' },
                startX: { type: 'number', description: 'Start X (if no baseline)' },
                startY: { type: 'number', description: 'Start Y (if no baseline)' },
                endX: { type: 'number', description: 'End X (if no baseline)' },
                endY: { type: 'number', description: 'End Y (if no baseline)' },
                length: { type: 'number', description: 'Wall length in mm (if no baseline/points, default 1000)' },
                width: { type: 'number', description: 'Wall thickness in mm (default 200)' },
                height: { type: 'number', description: 'Wall height in mm (default 3000)' },
                name: { type: 'string', description: 'Name for the wall' },
            },
            required: [],
        },
    },
    {
        name: 'freecad_arch_structure',
        description: 'Create a structural element (column, beam, slab)',
        inputSchema: {
            type: 'object',
            properties: {
                structureType: {
                    type: 'string',
                    enum: ['column', 'beam', 'slab'],
                    description: 'Type of structure (default: column)',
                },
                length: { type: 'number', description: 'Length in mm (default 500)' },
                width: { type: 'number', description: 'Width in mm (default 500)' },
                height: { type: 'number', description: 'Height in mm (default 3000 for column, 500 for beam/slab)' },
                x: { type: 'number', description: 'X position (default 0)' },
                y: { type: 'number', description: 'Y position (default 0)' },
                z: { type: 'number', description: 'Z position (default 0)' },
                name: { type: 'string', description: 'Name for the structure' },
            },
            required: [],
        },
    },
    {
        name: 'freecad_arch_window',
        description: 'Create a window or door opening in a wall',
        inputSchema: {
            type: 'object',
            properties: {
                wallName: { type: 'string', description: 'Name of the host wall' },
                windowWidth: { type: 'number', description: 'Window width in mm (default 1000)' },
                windowHeight: { type: 'number', description: 'Window height in mm (default 1200)' },
                sillHeight: { type: 'number', description: 'Sill height from floor in mm (default 900)' },
                x: { type: 'number', description: 'X offset along wall (default 500)' },
                name: { type: 'string', description: 'Name for the window' },
            },
            required: ['wallName'],
        },
    },
    {
        name: 'freecad_arch_floor',
        description: 'Create a building floor/level to organize BIM objects',
        inputSchema: {
            type: 'object',
            properties: {
                height: { type: 'number', description: 'Floor-to-floor height in mm (default 3000)' },
                objectNames: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Names of objects to include in this floor',
                },
                name: { type: 'string', description: 'Name for the floor (default: "Level")' },
            },
            required: [],
        },
    },
    {
        name: 'freecad_arch_building',
        description: 'Create a building container for organizing floors/levels',
        inputSchema: {
            type: 'object',
            properties: {
                floorNames: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Names of Floor/Level objects to include',
                },
                name: { type: 'string', description: 'Name for the building' },
            },
            required: [],
        },
    },
    {
        name: 'freecad_arch_site',
        description: 'Create a site container (top-level BIM container for buildings)',
        inputSchema: {
            type: 'object',
            properties: {
                buildingNames: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Names of Building objects to include',
                },
                name: { type: 'string', description: 'Name for the site' },
            },
            required: [],
        },
    },
    {
        name: 'freecad_arch_roof',
        description: 'Create a roof from a wire/edges or on top of a wall',
        inputSchema: {
            type: 'object',
            properties: {
                baseName: { type: 'string', description: 'Name of base object (wire or wall)' },
                angle: { type: 'number', description: 'Roof angle in degrees (default 45)' },
                name: { type: 'string', description: 'Name for the roof' },
            },
            required: ['baseName'],
        },
    },
    {
        name: 'freecad_arch_stairs',
        description: 'Create a staircase',
        inputSchema: {
            type: 'object',
            properties: {
                numberOfSteps: { type: 'number', description: 'Number of steps (default 10)' },
                totalHeight: { type: 'number', description: 'Total height in mm (default 3000)' },
                width: { type: 'number', description: 'Stair width in mm (default 1000)' },
                name: { type: 'string', description: 'Name for the stairs' },
            },
            required: [],
        },
    },
    {
        name: 'freecad_export_ifc',
        description: 'Export BIM model to IFC format (Industry Foundation Classes)',
        inputSchema: {
            type: 'object',
            properties: {
                filePath: { type: 'string', description: 'Absolute path for the output IFC file' },
                objectNames: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Names of objects to export (if omitted, exports all)',
                },
            },
            required: ['filePath'],
        },
    },
];
export async function handleBimTool(name, args, bridge) {
    switch (name) {
        case 'freecad_arch_wall': {
            const baselineName = args.baselineName;
            const width = args.width ?? 200;
            const height = args.height ?? 3000;
            const wallName = args.name || 'Wall';
            if (baselineName) {
                return bridge.run(`
${DOC_PREAMBLE}
import Arch
baseline = doc.getObject(${JSON.stringify(baselineName)})
if baseline is None:
    raise ValueError("Baseline not found: ${baselineName}")
wall = Arch.makeWall(baseline, width=${width}, height=${height})
wall.Label = ${JSON.stringify(wallName)}
doc.recompute()
_mcp_result["result"] = {"name": wall.Name, "label": wall.Label, "width": ${width}, "height": ${height}}
`);
            }
            const startX = args.startX ?? 0;
            const startY = args.startY ?? 0;
            const endX = args.endX ?? 1000;
            const endY = args.endY ?? 0;
            const length = args.length;
            if (length !== undefined) {
                return bridge.run(`
${DOC_PREAMBLE}
import Arch
wall = Arch.makeWall(None, length=${length}, width=${width}, height=${height})
wall.Label = ${JSON.stringify(wallName)}
doc.recompute()
_mcp_result["result"] = {"name": wall.Name, "label": wall.Label, "length": ${length}, "width": ${width}, "height": ${height}}
`);
            }
            return bridge.run(`
${DOC_PREAMBLE}
import Arch, Draft
line = Draft.makeLine(FreeCAD.Vector(${startX}, ${startY}, 0), FreeCAD.Vector(${endX}, ${endY}, 0))
doc.recompute()
wall = Arch.makeWall(line, width=${width}, height=${height})
wall.Label = ${JSON.stringify(wallName)}
doc.recompute()
import math
l = math.sqrt((${endX}-${startX})**2 + (${endY}-${startY})**2)
_mcp_result["result"] = {"name": wall.Name, "label": wall.Label, "length": l, "width": ${width}, "height": ${height}}
`);
        }
        case 'freecad_arch_structure': {
            const structureType = args.structureType || 'column';
            const length = args.length ?? 500;
            const width = args.width ?? 500;
            const defaultHeight = structureType === 'column' ? 3000 : 500;
            const height = args.height ?? defaultHeight;
            const x = args.x ?? 0;
            const y = args.y ?? 0;
            const z = args.z ?? 0;
            const strName = args.name || structureType.charAt(0).toUpperCase() + structureType.slice(1);
            return bridge.run(`
${DOC_PREAMBLE}
import Arch
structure = Arch.makeStructure(length=${length}, width=${width}, height=${height})
structure.Label = ${JSON.stringify(strName)}
structure.Placement.Base = FreeCAD.Vector(${x}, ${y}, ${z})
doc.recompute()
_mcp_result["result"] = {"name": structure.Name, "label": structure.Label, "type": ${JSON.stringify(structureType)}, "dimensions": {"length": ${length}, "width": ${width}, "height": ${height}}}
`);
        }
        case 'freecad_arch_window': {
            const wallName = args.wallName;
            const windowWidth = args.windowWidth ?? 1000;
            const windowHeight = args.windowHeight ?? 1200;
            const sillHeight = args.sillHeight ?? 900;
            const winName = args.name || 'Window';
            return bridge.run(`
${DOC_PREAMBLE}
import Arch
wall = doc.getObject(${JSON.stringify(wallName)})
if wall is None:
    raise ValueError("Wall not found: ${wallName}")
# Create a simple rectangular window
import Draft
rect = Draft.makeRectangle(${windowWidth}, ${windowHeight})
rect.Placement.Base = FreeCAD.Vector(0, 0, ${sillHeight})
doc.recompute()
window = Arch.makeWindow(rect)
window.Label = ${JSON.stringify(winName)}
window.Hosts = [wall]
doc.recompute()
_mcp_result["result"] = {"name": window.Name, "label": window.Label, "width": ${windowWidth}, "height": ${windowHeight}, "sillHeight": ${sillHeight}}
`);
        }
        case 'freecad_arch_floor': {
            const height = args.height ?? 3000;
            const objectNames = args.objectNames;
            const floorName = args.name || 'Level';
            const objCode = objectNames
                ? `floor.Group = [doc.getObject(n) for n in ${JSON.stringify(objectNames)} if doc.getObject(n)]`
                : '';
            return bridge.run(`
${DOC_PREAMBLE}
import Arch
floor = Arch.makeFloor()
floor.Label = ${JSON.stringify(floorName)}
floor.Height = ${height}
${objCode}
doc.recompute()
_mcp_result["result"] = {"name": floor.Name, "label": floor.Label, "height": ${height}}
`);
        }
        case 'freecad_arch_building': {
            const floorNames = args.floorNames;
            const buildingName = args.name || 'Building';
            const floorsCode = floorNames
                ? `building.Group = [doc.getObject(n) for n in ${JSON.stringify(floorNames)} if doc.getObject(n)]`
                : '';
            return bridge.run(`
${DOC_PREAMBLE}
import Arch
building = Arch.makeBuilding()
building.Label = ${JSON.stringify(buildingName)}
${floorsCode}
doc.recompute()
_mcp_result["result"] = {"name": building.Name, "label": building.Label}
`);
        }
        case 'freecad_arch_site': {
            const buildingNames = args.buildingNames;
            const siteName = args.name || 'Site';
            const bldgsCode = buildingNames
                ? `site.Group = [doc.getObject(n) for n in ${JSON.stringify(buildingNames)} if doc.getObject(n)]`
                : '';
            return bridge.run(`
${DOC_PREAMBLE}
import Arch
site = Arch.makeSite()
site.Label = ${JSON.stringify(siteName)}
${bldgsCode}
doc.recompute()
_mcp_result["result"] = {"name": site.Name, "label": site.Label}
`);
        }
        case 'freecad_arch_roof': {
            const baseName = args.baseName;
            const angle = args.angle ?? 45;
            const roofName = args.name || 'Roof';
            return bridge.run(`
${DOC_PREAMBLE}
import Arch
base = doc.getObject(${JSON.stringify(baseName)})
if base is None:
    raise ValueError("Base not found: ${baseName}")
roof = Arch.makeRoof(base, angles=[${angle}])
roof.Label = ${JSON.stringify(roofName)}
doc.recompute()
_mcp_result["result"] = {"name": roof.Name, "label": roof.Label, "angle": ${angle}}
`);
        }
        case 'freecad_arch_stairs': {
            const numberOfSteps = args.numberOfSteps ?? 10;
            const totalHeight = args.totalHeight ?? 3000;
            const width = args.width ?? 1000;
            const stairsName = args.name || 'Stairs';
            return bridge.run(`
${DOC_PREAMBLE}
import Arch
stairs = Arch.makeStairs(${numberOfSteps})
stairs.Label = ${JSON.stringify(stairsName)}
stairs.Height = ${totalHeight}
stairs.Width = ${width}
doc.recompute()
_mcp_result["result"] = {"name": stairs.Name, "label": stairs.Label, "steps": ${numberOfSteps}, "height": ${totalHeight}, "width": ${width}}
`);
        }
        case 'freecad_export_ifc': {
            const filePath = args.filePath;
            const objectNames = args.objectNames;
            return bridge.run(`
${DOC_PREAMBLE}
import importIFC
${objectNames
                ? `objs = [doc.getObject(n) for n in ${JSON.stringify(objectNames)} if doc.getObject(n)]`
                : `objs = doc.Objects`}
importIFC.export(objs, ${JSON.stringify(filePath)})
import os
_mcp_result["result"] = {"filePath": ${JSON.stringify(filePath)}, "objectCount": len(objs), "size_bytes": os.path.getsize(${JSON.stringify(filePath)})}
`);
        }
        default:
            return {
                content: [{ type: 'text', text: `Unknown BIM tool: ${name}` }],
                isError: true,
            };
    }
}
//# sourceMappingURL=bim.js.map