import { FreeCADBridge } from '../freecad-bridge.js';
import { ToolResult, ToolArgs } from '../types.js';
export declare const SPREADSHEET_TOOLS: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            name: {
                type: string;
                description: string;
            };
            sheetName?: undefined;
            cells?: undefined;
            cell?: undefined;
            alias?: undefined;
            objectName?: undefined;
            property?: undefined;
            expression?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            sheetName: {
                type: string;
                description: string;
            };
            cells: {
                type: string;
                items: {
                    type: string;
                    properties: {
                        cell: {
                            type: string;
                            description: string;
                        };
                        value: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                };
                description: string;
            };
            name?: undefined;
            cell?: undefined;
            alias?: undefined;
            objectName?: undefined;
            property?: undefined;
            expression?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            sheetName: {
                type: string;
                description: string;
            };
            cells: {
                type: string;
                items: {
                    type: string;
                    properties?: undefined;
                    required?: undefined;
                };
                description: string;
            };
            name?: undefined;
            cell?: undefined;
            alias?: undefined;
            objectName?: undefined;
            property?: undefined;
            expression?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            sheetName: {
                type: string;
                description: string;
            };
            cell: {
                type: string;
                description: string;
            };
            alias: {
                type: string;
                description: string;
            };
            name?: undefined;
            cells?: undefined;
            objectName?: undefined;
            property?: undefined;
            expression?: undefined;
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
            property: {
                type: string;
                description: string;
            };
            expression: {
                type: string;
                description: string;
            };
            name?: undefined;
            sheetName?: undefined;
            cells?: undefined;
            cell?: undefined;
            alias?: undefined;
        };
        required: string[];
    };
})[];
export declare function handleSpreadsheetTool(name: string, args: ToolArgs, bridge: FreeCADBridge): Promise<ToolResult>;
//# sourceMappingURL=spreadsheet.d.ts.map