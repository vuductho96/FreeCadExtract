import { FreeCADBridge } from '../freecad-bridge.js';
import { ToolResult, ToolArgs } from '../types.js';
export declare const OPERATION_TOOLS: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            object1: {
                type: string;
                description: string;
            };
            object2: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            objectName?: undefined;
            radius?: undefined;
            edgeIndices?: undefined;
            distance?: undefined;
            x?: undefined;
            y?: undefined;
            z?: undefined;
            axis?: undefined;
            angle?: undefined;
            newName?: undefined;
            plane?: undefined;
            objectNames?: undefined;
            baseName?: undefined;
            toolName?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            objectName: {
                type: string;
                description: string;
            };
            radius: {
                type: string;
                description: string;
            };
            edgeIndices: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            object1?: undefined;
            object2?: undefined;
            name?: undefined;
            distance?: undefined;
            x?: undefined;
            y?: undefined;
            z?: undefined;
            axis?: undefined;
            angle?: undefined;
            newName?: undefined;
            plane?: undefined;
            objectNames?: undefined;
            baseName?: undefined;
            toolName?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            objectName: {
                type: string;
                description: string;
            };
            distance: {
                type: string;
                description: string;
            };
            edgeIndices: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            object1?: undefined;
            object2?: undefined;
            name?: undefined;
            radius?: undefined;
            x?: undefined;
            y?: undefined;
            z?: undefined;
            axis?: undefined;
            angle?: undefined;
            newName?: undefined;
            plane?: undefined;
            objectNames?: undefined;
            baseName?: undefined;
            toolName?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            objectName: {
                type: string;
                description: string;
            };
            x: {
                type: string;
                description: string;
            };
            y: {
                type: string;
                description: string;
            };
            z: {
                type: string;
                description: string;
            };
            object1?: undefined;
            object2?: undefined;
            name?: undefined;
            radius?: undefined;
            edgeIndices?: undefined;
            distance?: undefined;
            axis?: undefined;
            angle?: undefined;
            newName?: undefined;
            plane?: undefined;
            objectNames?: undefined;
            baseName?: undefined;
            toolName?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            objectName: {
                type: string;
                description: string;
            };
            axis: {
                type: string;
                enum: string[];
                description: string;
            };
            angle: {
                type: string;
                description: string;
            };
            object1?: undefined;
            object2?: undefined;
            name?: undefined;
            radius?: undefined;
            edgeIndices?: undefined;
            distance?: undefined;
            x?: undefined;
            y?: undefined;
            z?: undefined;
            newName?: undefined;
            plane?: undefined;
            objectNames?: undefined;
            baseName?: undefined;
            toolName?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            objectName: {
                type: string;
                description: string;
            };
            newName: {
                type: string;
                description: string;
            };
            object1?: undefined;
            object2?: undefined;
            name?: undefined;
            radius?: undefined;
            edgeIndices?: undefined;
            distance?: undefined;
            x?: undefined;
            y?: undefined;
            z?: undefined;
            axis?: undefined;
            angle?: undefined;
            plane?: undefined;
            objectNames?: undefined;
            baseName?: undefined;
            toolName?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            objectName: {
                type: string;
                description: string;
            };
            object1?: undefined;
            object2?: undefined;
            name?: undefined;
            radius?: undefined;
            edgeIndices?: undefined;
            distance?: undefined;
            x?: undefined;
            y?: undefined;
            z?: undefined;
            axis?: undefined;
            angle?: undefined;
            newName?: undefined;
            plane?: undefined;
            objectNames?: undefined;
            baseName?: undefined;
            toolName?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            objectName: {
                type: string;
                description: string;
            };
            plane: {
                type: string;
                enum: string[];
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            object1?: undefined;
            object2?: undefined;
            radius?: undefined;
            edgeIndices?: undefined;
            distance?: undefined;
            x?: undefined;
            y?: undefined;
            z?: undefined;
            axis?: undefined;
            angle?: undefined;
            newName?: undefined;
            objectNames?: undefined;
            baseName?: undefined;
            toolName?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            objectName: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            object1?: undefined;
            object2?: undefined;
            radius?: undefined;
            edgeIndices?: undefined;
            distance?: undefined;
            x?: undefined;
            y?: undefined;
            z?: undefined;
            axis?: undefined;
            angle?: undefined;
            newName?: undefined;
            plane?: undefined;
            objectNames?: undefined;
            baseName?: undefined;
            toolName?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            objectNames: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            object1?: undefined;
            object2?: undefined;
            objectName?: undefined;
            radius?: undefined;
            edgeIndices?: undefined;
            distance?: undefined;
            x?: undefined;
            y?: undefined;
            z?: undefined;
            axis?: undefined;
            angle?: undefined;
            newName?: undefined;
            plane?: undefined;
            baseName?: undefined;
            toolName?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            baseName: {
                type: string;
                description: string;
            };
            toolName: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            object1?: undefined;
            object2?: undefined;
            objectName?: undefined;
            radius?: undefined;
            edgeIndices?: undefined;
            distance?: undefined;
            x?: undefined;
            y?: undefined;
            z?: undefined;
            axis?: undefined;
            angle?: undefined;
            newName?: undefined;
            plane?: undefined;
            objectNames?: undefined;
        };
        required: string[];
    };
})[];
export declare function handleOperationTool(name: string, args: ToolArgs, bridge: FreeCADBridge): Promise<ToolResult>;
//# sourceMappingURL=operations.d.ts.map