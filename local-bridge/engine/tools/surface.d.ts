import { FreeCADBridge } from '../freecad-bridge.js';
import { ToolResult, ToolArgs } from '../types.js';
export declare const SURFACE_TOOLS: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            objectName: {
                type: string;
                description: string;
            };
            edgeNames: {
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
            edges?: undefined;
            sectionNames?: undefined;
            faceName?: undefined;
            extensionLength?: undefined;
            edge1ObjectName?: undefined;
            edge1Name?: undefined;
            edge2ObjectName?: undefined;
            edge2Name?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            edges: {
                type: string;
                items: {
                    type: string;
                    properties: {
                        objectName: {
                            type: string;
                        };
                        edgeName: {
                            type: string;
                        };
                    };
                    required: string[];
                };
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            objectName?: undefined;
            edgeNames?: undefined;
            sectionNames?: undefined;
            faceName?: undefined;
            extensionLength?: undefined;
            edge1ObjectName?: undefined;
            edge1Name?: undefined;
            edge2ObjectName?: undefined;
            edge2Name?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            sectionNames: {
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
            edgeNames?: undefined;
            edges?: undefined;
            faceName?: undefined;
            extensionLength?: undefined;
            edge1ObjectName?: undefined;
            edge1Name?: undefined;
            edge2ObjectName?: undefined;
            edge2Name?: undefined;
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
            faceName: {
                type: string;
                description: string;
            };
            extensionLength: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            edgeNames?: undefined;
            edges?: undefined;
            sectionNames?: undefined;
            edge1ObjectName?: undefined;
            edge1Name?: undefined;
            edge2ObjectName?: undefined;
            edge2Name?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            edge1ObjectName: {
                type: string;
                description: string;
            };
            edge1Name: {
                type: string;
                description: string;
            };
            edge2ObjectName: {
                type: string;
                description: string;
            };
            edge2Name: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            objectName?: undefined;
            edgeNames?: undefined;
            edges?: undefined;
            sectionNames?: undefined;
            faceName?: undefined;
            extensionLength?: undefined;
        };
        required: string[];
    };
})[];
export declare function handleSurfaceTool(name: string, args: ToolArgs, bridge: FreeCADBridge): Promise<ToolResult>;
//# sourceMappingURL=surface.d.ts.map