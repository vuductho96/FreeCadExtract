import { FreeCADBridge } from '../freecad-bridge.js';
import { ToolResult, ToolArgs } from '../types.js';
export declare const ADVANCED_OPERATION_TOOLS: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            objectName: {
                type: string;
                description: string;
            };
            thickness: {
                type: string;
                description: string;
            };
            faceNames: {
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
            distance?: undefined;
            plane?: undefined;
            offset?: undefined;
            objectNames?: undefined;
            directionX?: undefined;
            directionY?: undefined;
            directionZ?: undefined;
            count?: undefined;
            angle?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            centerX?: undefined;
            centerY?: undefined;
            centerZ?: undefined;
            scaleX?: undefined;
            scaleY?: undefined;
            scaleZ?: undefined;
            dirX?: undefined;
            dirY?: undefined;
            dirZ?: undefined;
            solid?: undefined;
            faceIndex?: undefined;
            edgeIndex?: undefined;
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
            name: {
                type: string;
                description: string;
            };
            thickness?: undefined;
            faceNames?: undefined;
            plane?: undefined;
            offset?: undefined;
            objectNames?: undefined;
            directionX?: undefined;
            directionY?: undefined;
            directionZ?: undefined;
            count?: undefined;
            angle?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            centerX?: undefined;
            centerY?: undefined;
            centerZ?: undefined;
            scaleX?: undefined;
            scaleY?: undefined;
            scaleZ?: undefined;
            dirX?: undefined;
            dirY?: undefined;
            dirZ?: undefined;
            solid?: undefined;
            faceIndex?: undefined;
            edgeIndex?: undefined;
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
            offset: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            thickness?: undefined;
            faceNames?: undefined;
            distance?: undefined;
            objectNames?: undefined;
            directionX?: undefined;
            directionY?: undefined;
            directionZ?: undefined;
            count?: undefined;
            angle?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            centerX?: undefined;
            centerY?: undefined;
            centerZ?: undefined;
            scaleX?: undefined;
            scaleY?: undefined;
            scaleZ?: undefined;
            dirX?: undefined;
            dirY?: undefined;
            dirZ?: undefined;
            solid?: undefined;
            faceIndex?: undefined;
            edgeIndex?: undefined;
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
            objectName?: undefined;
            thickness?: undefined;
            faceNames?: undefined;
            distance?: undefined;
            plane?: undefined;
            offset?: undefined;
            directionX?: undefined;
            directionY?: undefined;
            directionZ?: undefined;
            count?: undefined;
            angle?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            centerX?: undefined;
            centerY?: undefined;
            centerZ?: undefined;
            scaleX?: undefined;
            scaleY?: undefined;
            scaleZ?: undefined;
            dirX?: undefined;
            dirY?: undefined;
            dirZ?: undefined;
            solid?: undefined;
            faceIndex?: undefined;
            edgeIndex?: undefined;
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
            directionX: {
                type: string;
                description: string;
            };
            directionY: {
                type: string;
                description: string;
            };
            directionZ: {
                type: string;
                description: string;
            };
            count: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            thickness?: undefined;
            faceNames?: undefined;
            distance?: undefined;
            plane?: undefined;
            offset?: undefined;
            objectNames?: undefined;
            angle?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            centerX?: undefined;
            centerY?: undefined;
            centerZ?: undefined;
            scaleX?: undefined;
            scaleY?: undefined;
            scaleZ?: undefined;
            dirX?: undefined;
            dirY?: undefined;
            dirZ?: undefined;
            solid?: undefined;
            faceIndex?: undefined;
            edgeIndex?: undefined;
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
            count: {
                type: string;
                description: string;
            };
            angle: {
                type: string;
                description: string;
            };
            axisX: {
                type: string;
                description: string;
            };
            axisY: {
                type: string;
                description: string;
            };
            axisZ: {
                type: string;
                description: string;
            };
            centerX: {
                type: string;
                description: string;
            };
            centerY: {
                type: string;
                description: string;
            };
            centerZ: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            thickness?: undefined;
            faceNames?: undefined;
            distance?: undefined;
            plane?: undefined;
            offset?: undefined;
            objectNames?: undefined;
            directionX?: undefined;
            directionY?: undefined;
            directionZ?: undefined;
            scaleX?: undefined;
            scaleY?: undefined;
            scaleZ?: undefined;
            dirX?: undefined;
            dirY?: undefined;
            dirZ?: undefined;
            solid?: undefined;
            faceIndex?: undefined;
            edgeIndex?: undefined;
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
            scaleX: {
                type: string;
                description: string;
            };
            scaleY: {
                type: string;
                description: string;
            };
            scaleZ: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            thickness?: undefined;
            faceNames?: undefined;
            distance?: undefined;
            plane?: undefined;
            offset?: undefined;
            objectNames?: undefined;
            directionX?: undefined;
            directionY?: undefined;
            directionZ?: undefined;
            count?: undefined;
            angle?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            centerX?: undefined;
            centerY?: undefined;
            centerZ?: undefined;
            dirX?: undefined;
            dirY?: undefined;
            dirZ?: undefined;
            solid?: undefined;
            faceIndex?: undefined;
            edgeIndex?: undefined;
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
            dirX: {
                type: string;
                description: string;
            };
            dirY: {
                type: string;
                description: string;
            };
            dirZ: {
                type: string;
                description: string;
            };
            solid: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            thickness?: undefined;
            faceNames?: undefined;
            distance?: undefined;
            plane?: undefined;
            offset?: undefined;
            objectNames?: undefined;
            directionX?: undefined;
            directionY?: undefined;
            directionZ?: undefined;
            count?: undefined;
            angle?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            centerX?: undefined;
            centerY?: undefined;
            centerZ?: undefined;
            scaleX?: undefined;
            scaleY?: undefined;
            scaleZ?: undefined;
            faceIndex?: undefined;
            edgeIndex?: undefined;
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
            thickness?: undefined;
            faceNames?: undefined;
            name?: undefined;
            distance?: undefined;
            plane?: undefined;
            offset?: undefined;
            objectNames?: undefined;
            directionX?: undefined;
            directionY?: undefined;
            directionZ?: undefined;
            count?: undefined;
            angle?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            centerX?: undefined;
            centerY?: undefined;
            centerZ?: undefined;
            scaleX?: undefined;
            scaleY?: undefined;
            scaleZ?: undefined;
            dirX?: undefined;
            dirY?: undefined;
            dirZ?: undefined;
            solid?: undefined;
            faceIndex?: undefined;
            edgeIndex?: undefined;
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
            faceIndex: {
                type: string;
                description: string;
            };
            thickness?: undefined;
            faceNames?: undefined;
            name?: undefined;
            distance?: undefined;
            plane?: undefined;
            offset?: undefined;
            objectNames?: undefined;
            directionX?: undefined;
            directionY?: undefined;
            directionZ?: undefined;
            count?: undefined;
            angle?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            centerX?: undefined;
            centerY?: undefined;
            centerZ?: undefined;
            scaleX?: undefined;
            scaleY?: undefined;
            scaleZ?: undefined;
            dirX?: undefined;
            dirY?: undefined;
            dirZ?: undefined;
            solid?: undefined;
            edgeIndex?: undefined;
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
            edgeIndex: {
                type: string;
                description: string;
            };
            thickness?: undefined;
            faceNames?: undefined;
            name?: undefined;
            distance?: undefined;
            plane?: undefined;
            offset?: undefined;
            objectNames?: undefined;
            directionX?: undefined;
            directionY?: undefined;
            directionZ?: undefined;
            count?: undefined;
            angle?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            centerX?: undefined;
            centerY?: undefined;
            centerZ?: undefined;
            scaleX?: undefined;
            scaleY?: undefined;
            scaleZ?: undefined;
            dirX?: undefined;
            dirY?: undefined;
            dirZ?: undefined;
            solid?: undefined;
            faceIndex?: undefined;
        };
        required: string[];
    };
})[];
export declare function handleAdvancedOperationTool(name: string, args: ToolArgs, bridge: FreeCADBridge): Promise<ToolResult>;
//# sourceMappingURL=advanced-operations.d.ts.map