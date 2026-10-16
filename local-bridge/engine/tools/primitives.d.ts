import { FreeCADBridge } from '../freecad-bridge.js';
import { ToolResult, ToolArgs } from '../types.js';
export declare const PRIMITIVE_TOOLS: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            length: {
                type: string;
                description: string;
            };
            width: {
                type: string;
                description: string;
            };
            height: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            radius?: undefined;
            radius1?: undefined;
            radius2?: undefined;
            xmin?: undefined;
            ymin?: undefined;
            zmin?: undefined;
            x2min?: undefined;
            z2min?: undefined;
            xmax?: undefined;
            ymax?: undefined;
            zmax?: undefined;
            x2max?: undefined;
            z2max?: undefined;
            pitch?: undefined;
            angle?: undefined;
            leftHanded?: undefined;
            growth?: undefined;
            rotations?: undefined;
            radius3?: undefined;
            outerRadius?: undefined;
            innerRadius?: undefined;
            sides?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            radius: {
                type: string;
                description: string;
            };
            height: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            length?: undefined;
            width?: undefined;
            radius1?: undefined;
            radius2?: undefined;
            xmin?: undefined;
            ymin?: undefined;
            zmin?: undefined;
            x2min?: undefined;
            z2min?: undefined;
            xmax?: undefined;
            ymax?: undefined;
            zmax?: undefined;
            x2max?: undefined;
            z2max?: undefined;
            pitch?: undefined;
            angle?: undefined;
            leftHanded?: undefined;
            growth?: undefined;
            rotations?: undefined;
            radius3?: undefined;
            outerRadius?: undefined;
            innerRadius?: undefined;
            sides?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            radius: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            length?: undefined;
            width?: undefined;
            height?: undefined;
            radius1?: undefined;
            radius2?: undefined;
            xmin?: undefined;
            ymin?: undefined;
            zmin?: undefined;
            x2min?: undefined;
            z2min?: undefined;
            xmax?: undefined;
            ymax?: undefined;
            zmax?: undefined;
            x2max?: undefined;
            z2max?: undefined;
            pitch?: undefined;
            angle?: undefined;
            leftHanded?: undefined;
            growth?: undefined;
            rotations?: undefined;
            radius3?: undefined;
            outerRadius?: undefined;
            innerRadius?: undefined;
            sides?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            radius1: {
                type: string;
                description: string;
            };
            radius2: {
                type: string;
                description: string;
            };
            height: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            length?: undefined;
            width?: undefined;
            radius?: undefined;
            xmin?: undefined;
            ymin?: undefined;
            zmin?: undefined;
            x2min?: undefined;
            z2min?: undefined;
            xmax?: undefined;
            ymax?: undefined;
            zmax?: undefined;
            x2max?: undefined;
            z2max?: undefined;
            pitch?: undefined;
            angle?: undefined;
            leftHanded?: undefined;
            growth?: undefined;
            rotations?: undefined;
            radius3?: undefined;
            outerRadius?: undefined;
            innerRadius?: undefined;
            sides?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            radius1: {
                type: string;
                description: string;
            };
            radius2: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            length?: undefined;
            width?: undefined;
            height?: undefined;
            radius?: undefined;
            xmin?: undefined;
            ymin?: undefined;
            zmin?: undefined;
            x2min?: undefined;
            z2min?: undefined;
            xmax?: undefined;
            ymax?: undefined;
            zmax?: undefined;
            x2max?: undefined;
            z2max?: undefined;
            pitch?: undefined;
            angle?: undefined;
            leftHanded?: undefined;
            growth?: undefined;
            rotations?: undefined;
            radius3?: undefined;
            outerRadius?: undefined;
            innerRadius?: undefined;
            sides?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            xmin: {
                type: string;
                description: string;
            };
            ymin: {
                type: string;
                description: string;
            };
            zmin: {
                type: string;
                description: string;
            };
            x2min: {
                type: string;
                description: string;
            };
            z2min: {
                type: string;
                description: string;
            };
            xmax: {
                type: string;
                description: string;
            };
            ymax: {
                type: string;
                description: string;
            };
            zmax: {
                type: string;
                description: string;
            };
            x2max: {
                type: string;
                description: string;
            };
            z2max: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            length?: undefined;
            width?: undefined;
            height?: undefined;
            radius?: undefined;
            radius1?: undefined;
            radius2?: undefined;
            pitch?: undefined;
            angle?: undefined;
            leftHanded?: undefined;
            growth?: undefined;
            rotations?: undefined;
            radius3?: undefined;
            outerRadius?: undefined;
            innerRadius?: undefined;
            sides?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            pitch: {
                type: string;
                description: string;
            };
            height: {
                type: string;
                description: string;
            };
            radius: {
                type: string;
                description: string;
            };
            angle: {
                type: string;
                description: string;
            };
            leftHanded: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            length?: undefined;
            width?: undefined;
            radius1?: undefined;
            radius2?: undefined;
            xmin?: undefined;
            ymin?: undefined;
            zmin?: undefined;
            x2min?: undefined;
            z2min?: undefined;
            xmax?: undefined;
            ymax?: undefined;
            zmax?: undefined;
            x2max?: undefined;
            z2max?: undefined;
            growth?: undefined;
            rotations?: undefined;
            radius3?: undefined;
            outerRadius?: undefined;
            innerRadius?: undefined;
            sides?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            growth: {
                type: string;
                description: string;
            };
            rotations: {
                type: string;
                description: string;
            };
            radius: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            length?: undefined;
            width?: undefined;
            height?: undefined;
            radius1?: undefined;
            radius2?: undefined;
            xmin?: undefined;
            ymin?: undefined;
            zmin?: undefined;
            x2min?: undefined;
            z2min?: undefined;
            xmax?: undefined;
            ymax?: undefined;
            zmax?: undefined;
            x2max?: undefined;
            z2max?: undefined;
            pitch?: undefined;
            angle?: undefined;
            leftHanded?: undefined;
            radius3?: undefined;
            outerRadius?: undefined;
            innerRadius?: undefined;
            sides?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            radius1: {
                type: string;
                description: string;
            };
            radius2: {
                type: string;
                description: string;
            };
            radius3: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            length?: undefined;
            width?: undefined;
            height?: undefined;
            radius?: undefined;
            xmin?: undefined;
            ymin?: undefined;
            zmin?: undefined;
            x2min?: undefined;
            z2min?: undefined;
            xmax?: undefined;
            ymax?: undefined;
            zmax?: undefined;
            x2max?: undefined;
            z2max?: undefined;
            pitch?: undefined;
            angle?: undefined;
            leftHanded?: undefined;
            growth?: undefined;
            rotations?: undefined;
            outerRadius?: undefined;
            innerRadius?: undefined;
            sides?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            outerRadius: {
                type: string;
                description: string;
            };
            innerRadius: {
                type: string;
                description: string;
            };
            height: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            length?: undefined;
            width?: undefined;
            radius?: undefined;
            radius1?: undefined;
            radius2?: undefined;
            xmin?: undefined;
            ymin?: undefined;
            zmin?: undefined;
            x2min?: undefined;
            z2min?: undefined;
            xmax?: undefined;
            ymax?: undefined;
            zmax?: undefined;
            x2max?: undefined;
            z2max?: undefined;
            pitch?: undefined;
            angle?: undefined;
            leftHanded?: undefined;
            growth?: undefined;
            rotations?: undefined;
            radius3?: undefined;
            sides?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            sides: {
                type: string;
                description: string;
            };
            radius: {
                type: string;
                description: string;
            };
            height: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            length?: undefined;
            width?: undefined;
            radius1?: undefined;
            radius2?: undefined;
            xmin?: undefined;
            ymin?: undefined;
            zmin?: undefined;
            x2min?: undefined;
            z2min?: undefined;
            xmax?: undefined;
            ymax?: undefined;
            zmax?: undefined;
            x2max?: undefined;
            z2max?: undefined;
            pitch?: undefined;
            angle?: undefined;
            leftHanded?: undefined;
            growth?: undefined;
            rotations?: undefined;
            radius3?: undefined;
            outerRadius?: undefined;
            innerRadius?: undefined;
        };
        required: string[];
    };
})[];
export declare function handlePrimitiveTool(name: string, args: ToolArgs, bridge: FreeCADBridge): Promise<ToolResult>;
//# sourceMappingURL=primitives.d.ts.map