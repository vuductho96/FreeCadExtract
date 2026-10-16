import { FreeCADBridge } from '../freecad-bridge.js';
import { ToolResult, ToolArgs } from '../types.js';
export declare const MESH_TOOLS: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            objectName: {
                type: string;
                description: string;
            };
            linearDeflection: {
                type: string;
                description: string;
            };
            angularDeflection: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            meshName?: undefined;
            sewing?: undefined;
            fillHoles?: undefined;
            removeDuplicates?: undefined;
            fixNormals?: undefined;
            targetReduction?: undefined;
            maxEdgeLength?: undefined;
            mesh1Name?: undefined;
            mesh2Name?: undefined;
            operation?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            meshName: {
                type: string;
                description: string;
            };
            sewing: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            objectName?: undefined;
            linearDeflection?: undefined;
            angularDeflection?: undefined;
            fillHoles?: undefined;
            removeDuplicates?: undefined;
            fixNormals?: undefined;
            targetReduction?: undefined;
            maxEdgeLength?: undefined;
            mesh1Name?: undefined;
            mesh2Name?: undefined;
            operation?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            meshName: {
                type: string;
                description: string;
            };
            fillHoles: {
                type: string;
                description: string;
            };
            removeDuplicates: {
                type: string;
                description: string;
            };
            fixNormals: {
                type: string;
                description: string;
            };
            objectName?: undefined;
            linearDeflection?: undefined;
            angularDeflection?: undefined;
            name?: undefined;
            sewing?: undefined;
            targetReduction?: undefined;
            maxEdgeLength?: undefined;
            mesh1Name?: undefined;
            mesh2Name?: undefined;
            operation?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            meshName: {
                type: string;
                description: string;
            };
            targetReduction: {
                type: string;
                description: string;
            };
            objectName?: undefined;
            linearDeflection?: undefined;
            angularDeflection?: undefined;
            name?: undefined;
            sewing?: undefined;
            fillHoles?: undefined;
            removeDuplicates?: undefined;
            fixNormals?: undefined;
            maxEdgeLength?: undefined;
            mesh1Name?: undefined;
            mesh2Name?: undefined;
            operation?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            meshName: {
                type: string;
                description: string;
            };
            maxEdgeLength: {
                type: string;
                description: string;
            };
            objectName?: undefined;
            linearDeflection?: undefined;
            angularDeflection?: undefined;
            name?: undefined;
            sewing?: undefined;
            fillHoles?: undefined;
            removeDuplicates?: undefined;
            fixNormals?: undefined;
            targetReduction?: undefined;
            mesh1Name?: undefined;
            mesh2Name?: undefined;
            operation?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            meshName: {
                type: string;
                description: string;
            };
            objectName?: undefined;
            linearDeflection?: undefined;
            angularDeflection?: undefined;
            name?: undefined;
            sewing?: undefined;
            fillHoles?: undefined;
            removeDuplicates?: undefined;
            fixNormals?: undefined;
            targetReduction?: undefined;
            maxEdgeLength?: undefined;
            mesh1Name?: undefined;
            mesh2Name?: undefined;
            operation?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            mesh1Name: {
                type: string;
                description: string;
            };
            mesh2Name: {
                type: string;
                description: string;
            };
            operation: {
                type: string;
                enum: string[];
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            objectName?: undefined;
            linearDeflection?: undefined;
            angularDeflection?: undefined;
            meshName?: undefined;
            sewing?: undefined;
            fillHoles?: undefined;
            removeDuplicates?: undefined;
            fixNormals?: undefined;
            targetReduction?: undefined;
            maxEdgeLength?: undefined;
        };
        required: string[];
    };
})[];
export declare function handleMeshTool(name: string, args: ToolArgs, bridge: FreeCADBridge): Promise<ToolResult>;
//# sourceMappingURL=mesh.d.ts.map