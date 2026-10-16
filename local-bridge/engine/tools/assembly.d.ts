import { FreeCADBridge } from '../freecad-bridge.js';
import { ToolResult, ToolArgs } from '../types.js';
export declare const ASSEMBLY_TOOLS: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            name: {
                type: string;
                description: string;
            };
            assemblyName?: undefined;
            objectName?: undefined;
            x?: undefined;
            y?: undefined;
            z?: undefined;
            componentName?: undefined;
            component1?: undefined;
            element1?: undefined;
            component2?: undefined;
            element2?: undefined;
            distance?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            assemblyName: {
                type: string;
                description: string;
            };
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
            name?: undefined;
            componentName?: undefined;
            component1?: undefined;
            element1?: undefined;
            component2?: undefined;
            element2?: undefined;
            distance?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            assemblyName: {
                type: string;
                description: string;
            };
            componentName: {
                type: string;
                description: string;
            };
            name?: undefined;
            objectName?: undefined;
            x?: undefined;
            y?: undefined;
            z?: undefined;
            component1?: undefined;
            element1?: undefined;
            component2?: undefined;
            element2?: undefined;
            distance?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            assemblyName: {
                type: string;
                description: string;
            };
            component1: {
                type: string;
                description: string;
            };
            element1: {
                type: string;
                description: string;
            };
            component2: {
                type: string;
                description: string;
            };
            element2: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            objectName?: undefined;
            x?: undefined;
            y?: undefined;
            z?: undefined;
            componentName?: undefined;
            distance?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            assemblyName: {
                type: string;
                description: string;
            };
            component1: {
                type: string;
                description: string;
            };
            element1: {
                type: string;
                description: string;
            };
            component2: {
                type: string;
                description: string;
            };
            element2: {
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
            objectName?: undefined;
            x?: undefined;
            y?: undefined;
            z?: undefined;
            componentName?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            assemblyName: {
                type: string;
                description: string;
            };
            name?: undefined;
            objectName?: undefined;
            x?: undefined;
            y?: undefined;
            z?: undefined;
            componentName?: undefined;
            component1?: undefined;
            element1?: undefined;
            component2?: undefined;
            element2?: undefined;
            distance?: undefined;
        };
        required: string[];
    };
})[];
export declare function handleAssemblyTool(name: string, args: ToolArgs, bridge: FreeCADBridge): Promise<ToolResult>;
//# sourceMappingURL=assembly.d.ts.map