import { FreeCADBridge } from '../freecad-bridge.js';
import { ToolResult, ToolArgs } from '../types.js';
export declare const DOCUMENT_TOOLS: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            name: {
                type: string;
                description: string;
            };
            filePath?: undefined;
            documentName?: undefined;
            objectName?: undefined;
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
            name?: undefined;
            documentName?: undefined;
            objectName?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            documentName: {
                type: string;
                description: string;
            };
            name?: undefined;
            filePath?: undefined;
            objectName?: undefined;
        };
        required: never[];
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
            documentName: {
                type: string;
                description: string;
            };
            name?: undefined;
            filePath?: undefined;
        };
        required: string[];
    };
})[];
export declare function handleDocumentTool(name: string, args: ToolArgs, bridge: FreeCADBridge): Promise<ToolResult>;
//# sourceMappingURL=document.d.ts.map