import { FreeCADBridge } from '../freecad-bridge.js';
import { ToolResult, ToolArgs } from '../types.js';
export declare const BIM_TOOLS: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            baselineName: {
                type: string;
                description: string;
            };
            startX: {
                type: string;
                description: string;
            };
            startY: {
                type: string;
                description: string;
            };
            endX: {
                type: string;
                description: string;
            };
            endY: {
                type: string;
                description: string;
            };
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
            structureType?: undefined;
            x?: undefined;
            y?: undefined;
            z?: undefined;
            wallName?: undefined;
            windowWidth?: undefined;
            windowHeight?: undefined;
            sillHeight?: undefined;
            objectNames?: undefined;
            floorNames?: undefined;
            buildingNames?: undefined;
            baseName?: undefined;
            angle?: undefined;
            numberOfSteps?: undefined;
            totalHeight?: undefined;
            filePath?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            structureType: {
                type: string;
                enum: string[];
                description: string;
            };
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
            name: {
                type: string;
                description: string;
            };
            baselineName?: undefined;
            startX?: undefined;
            startY?: undefined;
            endX?: undefined;
            endY?: undefined;
            wallName?: undefined;
            windowWidth?: undefined;
            windowHeight?: undefined;
            sillHeight?: undefined;
            objectNames?: undefined;
            floorNames?: undefined;
            buildingNames?: undefined;
            baseName?: undefined;
            angle?: undefined;
            numberOfSteps?: undefined;
            totalHeight?: undefined;
            filePath?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            wallName: {
                type: string;
                description: string;
            };
            windowWidth: {
                type: string;
                description: string;
            };
            windowHeight: {
                type: string;
                description: string;
            };
            sillHeight: {
                type: string;
                description: string;
            };
            x: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            baselineName?: undefined;
            startX?: undefined;
            startY?: undefined;
            endX?: undefined;
            endY?: undefined;
            length?: undefined;
            width?: undefined;
            height?: undefined;
            structureType?: undefined;
            y?: undefined;
            z?: undefined;
            objectNames?: undefined;
            floorNames?: undefined;
            buildingNames?: undefined;
            baseName?: undefined;
            angle?: undefined;
            numberOfSteps?: undefined;
            totalHeight?: undefined;
            filePath?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            height: {
                type: string;
                description: string;
            };
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
            baselineName?: undefined;
            startX?: undefined;
            startY?: undefined;
            endX?: undefined;
            endY?: undefined;
            length?: undefined;
            width?: undefined;
            structureType?: undefined;
            x?: undefined;
            y?: undefined;
            z?: undefined;
            wallName?: undefined;
            windowWidth?: undefined;
            windowHeight?: undefined;
            sillHeight?: undefined;
            floorNames?: undefined;
            buildingNames?: undefined;
            baseName?: undefined;
            angle?: undefined;
            numberOfSteps?: undefined;
            totalHeight?: undefined;
            filePath?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            floorNames: {
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
            baselineName?: undefined;
            startX?: undefined;
            startY?: undefined;
            endX?: undefined;
            endY?: undefined;
            length?: undefined;
            width?: undefined;
            height?: undefined;
            structureType?: undefined;
            x?: undefined;
            y?: undefined;
            z?: undefined;
            wallName?: undefined;
            windowWidth?: undefined;
            windowHeight?: undefined;
            sillHeight?: undefined;
            objectNames?: undefined;
            buildingNames?: undefined;
            baseName?: undefined;
            angle?: undefined;
            numberOfSteps?: undefined;
            totalHeight?: undefined;
            filePath?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            buildingNames: {
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
            baselineName?: undefined;
            startX?: undefined;
            startY?: undefined;
            endX?: undefined;
            endY?: undefined;
            length?: undefined;
            width?: undefined;
            height?: undefined;
            structureType?: undefined;
            x?: undefined;
            y?: undefined;
            z?: undefined;
            wallName?: undefined;
            windowWidth?: undefined;
            windowHeight?: undefined;
            sillHeight?: undefined;
            objectNames?: undefined;
            floorNames?: undefined;
            baseName?: undefined;
            angle?: undefined;
            numberOfSteps?: undefined;
            totalHeight?: undefined;
            filePath?: undefined;
        };
        required: never[];
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
            angle: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            baselineName?: undefined;
            startX?: undefined;
            startY?: undefined;
            endX?: undefined;
            endY?: undefined;
            length?: undefined;
            width?: undefined;
            height?: undefined;
            structureType?: undefined;
            x?: undefined;
            y?: undefined;
            z?: undefined;
            wallName?: undefined;
            windowWidth?: undefined;
            windowHeight?: undefined;
            sillHeight?: undefined;
            objectNames?: undefined;
            floorNames?: undefined;
            buildingNames?: undefined;
            numberOfSteps?: undefined;
            totalHeight?: undefined;
            filePath?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            numberOfSteps: {
                type: string;
                description: string;
            };
            totalHeight: {
                type: string;
                description: string;
            };
            width: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            baselineName?: undefined;
            startX?: undefined;
            startY?: undefined;
            endX?: undefined;
            endY?: undefined;
            length?: undefined;
            height?: undefined;
            structureType?: undefined;
            x?: undefined;
            y?: undefined;
            z?: undefined;
            wallName?: undefined;
            windowWidth?: undefined;
            windowHeight?: undefined;
            sillHeight?: undefined;
            objectNames?: undefined;
            floorNames?: undefined;
            buildingNames?: undefined;
            baseName?: undefined;
            angle?: undefined;
            filePath?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            filePath: {
                type: string;
                description: string;
            };
            objectNames: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            baselineName?: undefined;
            startX?: undefined;
            startY?: undefined;
            endX?: undefined;
            endY?: undefined;
            length?: undefined;
            width?: undefined;
            height?: undefined;
            name?: undefined;
            structureType?: undefined;
            x?: undefined;
            y?: undefined;
            z?: undefined;
            wallName?: undefined;
            windowWidth?: undefined;
            windowHeight?: undefined;
            sillHeight?: undefined;
            floorNames?: undefined;
            buildingNames?: undefined;
            baseName?: undefined;
            angle?: undefined;
            numberOfSteps?: undefined;
            totalHeight?: undefined;
        };
        required: string[];
    };
})[];
export declare function handleBimTool(name: string, args: ToolArgs, bridge: FreeCADBridge): Promise<ToolResult>;
//# sourceMappingURL=bim.d.ts.map