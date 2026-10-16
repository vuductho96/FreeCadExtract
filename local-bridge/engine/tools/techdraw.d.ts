import { FreeCADBridge } from '../freecad-bridge.js';
import { ToolResult, ToolArgs } from '../types.js';
export declare const TECHDRAW_TOOLS: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            template: {
                type: string;
                enum: string[];
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            pageName?: undefined;
            objectName?: undefined;
            direction?: undefined;
            scale?: undefined;
            x?: undefined;
            y?: undefined;
            views?: undefined;
            viewName?: undefined;
            dimensionType?: undefined;
            edge?: undefined;
            vertex1?: undefined;
            vertex2?: undefined;
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
            pageName: {
                type: string;
                description: string;
            };
            objectName: {
                type: string;
                description: string;
            };
            direction: {
                type: string;
                enum: string[];
                description: string;
            };
            scale: {
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
            name: {
                type: string;
                description: string;
            };
            template?: undefined;
            views?: undefined;
            viewName?: undefined;
            dimensionType?: undefined;
            edge?: undefined;
            vertex1?: undefined;
            vertex2?: undefined;
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
            pageName: {
                type: string;
                description: string;
            };
            objectName: {
                type: string;
                description: string;
            };
            views: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            scale: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            template?: undefined;
            direction?: undefined;
            x?: undefined;
            y?: undefined;
            viewName?: undefined;
            dimensionType?: undefined;
            edge?: undefined;
            vertex1?: undefined;
            vertex2?: undefined;
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
            pageName: {
                type: string;
                description: string;
            };
            viewName: {
                type: string;
                description: string;
            };
            dimensionType: {
                type: string;
                enum: string[];
                description: string;
            };
            edge: {
                type: string;
                description: string;
            };
            vertex1: {
                type: string;
                description: string;
            };
            vertex2: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            template?: undefined;
            objectName?: undefined;
            direction?: undefined;
            scale?: undefined;
            x?: undefined;
            y?: undefined;
            views?: undefined;
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
            pageName: {
                type: string;
                description: string;
            };
            filePath: {
                type: string;
                description: string;
            };
            template?: undefined;
            name?: undefined;
            objectName?: undefined;
            direction?: undefined;
            scale?: undefined;
            x?: undefined;
            y?: undefined;
            views?: undefined;
            viewName?: undefined;
            dimensionType?: undefined;
            edge?: undefined;
            vertex1?: undefined;
            vertex2?: undefined;
        };
        required: string[];
    };
})[];
export declare function handleTechDrawTool(name: string, args: ToolArgs, bridge: FreeCADBridge): Promise<ToolResult>;
//# sourceMappingURL=techdraw.d.ts.map