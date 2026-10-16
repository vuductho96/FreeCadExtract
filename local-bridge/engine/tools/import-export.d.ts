import { FreeCADBridge } from '../freecad-bridge.js';
import { ToolResult, ToolArgs } from '../types.js';
export declare const IMPORT_EXPORT_TOOLS: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            filePath: {
                type: string;
                description: string;
            };
            documentName: {
                type: string;
                description: string;
            };
            objectNames?: undefined;
            point1?: undefined;
            point2?: undefined;
            object1Name?: undefined;
            object2Name?: undefined;
            objectName?: undefined;
            face1?: undefined;
            face2?: undefined;
            code?: undefined;
            direction?: undefined;
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
            filePath: {
                type: string;
                description: string;
            };
            documentName?: undefined;
            point1?: undefined;
            point2?: undefined;
            object1Name?: undefined;
            object2Name?: undefined;
            objectName?: undefined;
            face1?: undefined;
            face2?: undefined;
            code?: undefined;
            direction?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            point1: {
                type: string;
                properties: {
                    x: {
                        type: string;
                    };
                    y: {
                        type: string;
                    };
                    z: {
                        type: string;
                    };
                };
                description: string;
            };
            point2: {
                type: string;
                properties: {
                    x: {
                        type: string;
                    };
                    y: {
                        type: string;
                    };
                    z: {
                        type: string;
                    };
                };
                description: string;
            };
            object1Name: {
                type: string;
                description: string;
            };
            object2Name: {
                type: string;
                description: string;
            };
            filePath?: undefined;
            documentName?: undefined;
            objectNames?: undefined;
            objectName?: undefined;
            face1?: undefined;
            face2?: undefined;
            code?: undefined;
            direction?: undefined;
        };
        required?: undefined;
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
            face1: {
                type: string;
                description: string;
            };
            face2: {
                type: string;
                description: string;
            };
            filePath?: undefined;
            documentName?: undefined;
            objectNames?: undefined;
            point1?: undefined;
            point2?: undefined;
            object1Name?: undefined;
            object2Name?: undefined;
            code?: undefined;
            direction?: undefined;
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
            filePath?: undefined;
            documentName?: undefined;
            objectNames?: undefined;
            point1?: undefined;
            point2?: undefined;
            object1Name?: undefined;
            object2Name?: undefined;
            face1?: undefined;
            face2?: undefined;
            code?: undefined;
            direction?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            code: {
                type: string;
                description: string;
            };
            filePath?: undefined;
            documentName?: undefined;
            objectNames?: undefined;
            point1?: undefined;
            point2?: undefined;
            object1Name?: undefined;
            object2Name?: undefined;
            objectName?: undefined;
            face1?: undefined;
            face2?: undefined;
            direction?: undefined;
        };
        required: string[];
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
            documentName?: undefined;
            objectNames?: undefined;
            point1?: undefined;
            point2?: undefined;
            object1Name?: undefined;
            object2Name?: undefined;
            objectName?: undefined;
            face1?: undefined;
            face2?: undefined;
            code?: undefined;
            direction?: undefined;
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
            filePath: {
                type: string;
                description: string;
            };
            direction: {
                type: string;
                enum: string[];
                description: string;
            };
            documentName?: undefined;
            point1?: undefined;
            point2?: undefined;
            object1Name?: undefined;
            object2Name?: undefined;
            objectName?: undefined;
            face1?: undefined;
            face2?: undefined;
            code?: undefined;
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
            filePath: {
                type: string;
                description: string;
            };
            documentName?: undefined;
            objectNames?: undefined;
            point1?: undefined;
            point2?: undefined;
            object1Name?: undefined;
            object2Name?: undefined;
            face1?: undefined;
            face2?: undefined;
            code?: undefined;
            direction?: undefined;
        };
        required: string[];
    };
})[];
export declare function handleImportExportTool(name: string, args: ToolArgs, bridge: FreeCADBridge): Promise<ToolResult>;
//# sourceMappingURL=import-export.d.ts.map