import { FreeCADBridge } from '../freecad-bridge.js';
import { ToolResult, ToolArgs } from '../types.js';
export declare const FEM_TOOLS: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            name: {
                type: string;
                description: string;
            };
            analysisName?: undefined;
            materialName?: undefined;
            youngsModulus?: undefined;
            poissonRatio?: undefined;
            density?: undefined;
            objectName?: undefined;
            references?: undefined;
            force?: undefined;
            directionX?: undefined;
            directionY?: undefined;
            directionZ?: undefined;
            pressure?: undefined;
            reversed?: undefined;
            maxElementSize?: undefined;
            minElementSize?: undefined;
            meshOrder?: undefined;
            solver?: undefined;
            analysisType?: undefined;
            run?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            analysisName: {
                type: string;
                description: string;
            };
            materialName: {
                type: string;
                description: string;
            };
            youngsModulus: {
                type: string;
                description: string;
            };
            poissonRatio: {
                type: string;
                description: string;
            };
            density: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            objectName?: undefined;
            references?: undefined;
            force?: undefined;
            directionX?: undefined;
            directionY?: undefined;
            directionZ?: undefined;
            pressure?: undefined;
            reversed?: undefined;
            maxElementSize?: undefined;
            minElementSize?: undefined;
            meshOrder?: undefined;
            solver?: undefined;
            analysisType?: undefined;
            run?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            analysisName: {
                type: string;
                description: string;
            };
            objectName: {
                type: string;
                description: string;
            };
            references: {
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
            materialName?: undefined;
            youngsModulus?: undefined;
            poissonRatio?: undefined;
            density?: undefined;
            force?: undefined;
            directionX?: undefined;
            directionY?: undefined;
            directionZ?: undefined;
            pressure?: undefined;
            reversed?: undefined;
            maxElementSize?: undefined;
            minElementSize?: undefined;
            meshOrder?: undefined;
            solver?: undefined;
            analysisType?: undefined;
            run?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            analysisName: {
                type: string;
                description: string;
            };
            objectName: {
                type: string;
                description: string;
            };
            references: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            force: {
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
            name: {
                type: string;
                description: string;
            };
            materialName?: undefined;
            youngsModulus?: undefined;
            poissonRatio?: undefined;
            density?: undefined;
            pressure?: undefined;
            reversed?: undefined;
            maxElementSize?: undefined;
            minElementSize?: undefined;
            meshOrder?: undefined;
            solver?: undefined;
            analysisType?: undefined;
            run?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            analysisName: {
                type: string;
                description: string;
            };
            objectName: {
                type: string;
                description: string;
            };
            references: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            pressure: {
                type: string;
                description: string;
            };
            reversed: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            materialName?: undefined;
            youngsModulus?: undefined;
            poissonRatio?: undefined;
            density?: undefined;
            force?: undefined;
            directionX?: undefined;
            directionY?: undefined;
            directionZ?: undefined;
            maxElementSize?: undefined;
            minElementSize?: undefined;
            meshOrder?: undefined;
            solver?: undefined;
            analysisType?: undefined;
            run?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            analysisName: {
                type: string;
                description: string;
            };
            objectName: {
                type: string;
                description: string;
            };
            maxElementSize: {
                type: string;
                description: string;
            };
            minElementSize: {
                type: string;
                description: string;
            };
            meshOrder: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            materialName?: undefined;
            youngsModulus?: undefined;
            poissonRatio?: undefined;
            density?: undefined;
            references?: undefined;
            force?: undefined;
            directionX?: undefined;
            directionY?: undefined;
            directionZ?: undefined;
            pressure?: undefined;
            reversed?: undefined;
            solver?: undefined;
            analysisType?: undefined;
            run?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            analysisName: {
                type: string;
                description: string;
            };
            solver: {
                type: string;
                enum: string[];
                description: string;
            };
            analysisType: {
                type: string;
                enum: string[];
                description: string;
            };
            run: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            materialName?: undefined;
            youngsModulus?: undefined;
            poissonRatio?: undefined;
            density?: undefined;
            objectName?: undefined;
            references?: undefined;
            force?: undefined;
            directionX?: undefined;
            directionY?: undefined;
            directionZ?: undefined;
            pressure?: undefined;
            reversed?: undefined;
            maxElementSize?: undefined;
            minElementSize?: undefined;
            meshOrder?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            analysisName: {
                type: string;
                description: string;
            };
            name?: undefined;
            materialName?: undefined;
            youngsModulus?: undefined;
            poissonRatio?: undefined;
            density?: undefined;
            objectName?: undefined;
            references?: undefined;
            force?: undefined;
            directionX?: undefined;
            directionY?: undefined;
            directionZ?: undefined;
            pressure?: undefined;
            reversed?: undefined;
            maxElementSize?: undefined;
            minElementSize?: undefined;
            meshOrder?: undefined;
            solver?: undefined;
            analysisType?: undefined;
            run?: undefined;
        };
        required: string[];
    };
})[];
export declare function handleFemTool(name: string, args: ToolArgs, bridge: FreeCADBridge): Promise<ToolResult>;
//# sourceMappingURL=fem.d.ts.map