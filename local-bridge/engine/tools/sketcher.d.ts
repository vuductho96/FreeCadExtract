import { FreeCADBridge } from '../freecad-bridge.js';
import { ToolResult, ToolArgs } from '../types.js';
export declare const SKETCHER_TOOLS: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            name: {
                type: string;
                description: string;
            };
            plane: {
                type: string;
                enum: string[];
                description: string;
            };
            sketchName?: undefined;
            x1?: undefined;
            y1?: undefined;
            x2?: undefined;
            y2?: undefined;
            centerX?: undefined;
            centerY?: undefined;
            radius?: undefined;
            startAngle?: undefined;
            endAngle?: undefined;
            constraintType?: undefined;
            index1?: undefined;
            index2?: undefined;
            value?: undefined;
            majorRadius?: undefined;
            minorRadius?: undefined;
            points?: undefined;
            closed?: undefined;
            sides?: undefined;
            width?: undefined;
            x?: undefined;
            y?: undefined;
            objectName?: undefined;
            edgeName?: undefined;
            vertexIndex?: undefined;
            geoIndex?: undefined;
            posX?: undefined;
            posY?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            sketchName: {
                type: string;
                description: string;
            };
            x1: {
                type: string;
                description: string;
            };
            y1: {
                type: string;
                description: string;
            };
            x2: {
                type: string;
                description: string;
            };
            y2: {
                type: string;
                description: string;
            };
            name?: undefined;
            plane?: undefined;
            centerX?: undefined;
            centerY?: undefined;
            radius?: undefined;
            startAngle?: undefined;
            endAngle?: undefined;
            constraintType?: undefined;
            index1?: undefined;
            index2?: undefined;
            value?: undefined;
            majorRadius?: undefined;
            minorRadius?: undefined;
            points?: undefined;
            closed?: undefined;
            sides?: undefined;
            width?: undefined;
            x?: undefined;
            y?: undefined;
            objectName?: undefined;
            edgeName?: undefined;
            vertexIndex?: undefined;
            geoIndex?: undefined;
            posX?: undefined;
            posY?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            sketchName: {
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
            radius: {
                type: string;
                description: string;
            };
            name?: undefined;
            plane?: undefined;
            x1?: undefined;
            y1?: undefined;
            x2?: undefined;
            y2?: undefined;
            startAngle?: undefined;
            endAngle?: undefined;
            constraintType?: undefined;
            index1?: undefined;
            index2?: undefined;
            value?: undefined;
            majorRadius?: undefined;
            minorRadius?: undefined;
            points?: undefined;
            closed?: undefined;
            sides?: undefined;
            width?: undefined;
            x?: undefined;
            y?: undefined;
            objectName?: undefined;
            edgeName?: undefined;
            vertexIndex?: undefined;
            geoIndex?: undefined;
            posX?: undefined;
            posY?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            sketchName: {
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
            radius: {
                type: string;
                description: string;
            };
            startAngle: {
                type: string;
                description: string;
            };
            endAngle: {
                type: string;
                description: string;
            };
            name?: undefined;
            plane?: undefined;
            x1?: undefined;
            y1?: undefined;
            x2?: undefined;
            y2?: undefined;
            constraintType?: undefined;
            index1?: undefined;
            index2?: undefined;
            value?: undefined;
            majorRadius?: undefined;
            minorRadius?: undefined;
            points?: undefined;
            closed?: undefined;
            sides?: undefined;
            width?: undefined;
            x?: undefined;
            y?: undefined;
            objectName?: undefined;
            edgeName?: undefined;
            vertexIndex?: undefined;
            geoIndex?: undefined;
            posX?: undefined;
            posY?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            sketchName: {
                type: string;
                description: string;
            };
            constraintType: {
                type: string;
                enum: string[];
                description: string;
            };
            index1: {
                type: string;
                description: string;
            };
            index2: {
                type: string;
                description: string;
            };
            value: {
                type: string;
                description: string;
            };
            name?: undefined;
            plane?: undefined;
            x1?: undefined;
            y1?: undefined;
            x2?: undefined;
            y2?: undefined;
            centerX?: undefined;
            centerY?: undefined;
            radius?: undefined;
            startAngle?: undefined;
            endAngle?: undefined;
            majorRadius?: undefined;
            minorRadius?: undefined;
            points?: undefined;
            closed?: undefined;
            sides?: undefined;
            width?: undefined;
            x?: undefined;
            y?: undefined;
            objectName?: undefined;
            edgeName?: undefined;
            vertexIndex?: undefined;
            geoIndex?: undefined;
            posX?: undefined;
            posY?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            sketchName: {
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
            majorRadius: {
                type: string;
                description: string;
            };
            minorRadius: {
                type: string;
                description: string;
            };
            name?: undefined;
            plane?: undefined;
            x1?: undefined;
            y1?: undefined;
            x2?: undefined;
            y2?: undefined;
            radius?: undefined;
            startAngle?: undefined;
            endAngle?: undefined;
            constraintType?: undefined;
            index1?: undefined;
            index2?: undefined;
            value?: undefined;
            points?: undefined;
            closed?: undefined;
            sides?: undefined;
            width?: undefined;
            x?: undefined;
            y?: undefined;
            objectName?: undefined;
            edgeName?: undefined;
            vertexIndex?: undefined;
            geoIndex?: undefined;
            posX?: undefined;
            posY?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            sketchName: {
                type: string;
                description: string;
            };
            points: {
                type: string;
                items: {
                    type: string;
                    properties: {
                        x: {
                            type: string;
                        };
                        y: {
                            type: string;
                        };
                    };
                    required: string[];
                };
                description: string;
            };
            closed: {
                type: string;
                description: string;
            };
            name?: undefined;
            plane?: undefined;
            x1?: undefined;
            y1?: undefined;
            x2?: undefined;
            y2?: undefined;
            centerX?: undefined;
            centerY?: undefined;
            radius?: undefined;
            startAngle?: undefined;
            endAngle?: undefined;
            constraintType?: undefined;
            index1?: undefined;
            index2?: undefined;
            value?: undefined;
            majorRadius?: undefined;
            minorRadius?: undefined;
            sides?: undefined;
            width?: undefined;
            x?: undefined;
            y?: undefined;
            objectName?: undefined;
            edgeName?: undefined;
            vertexIndex?: undefined;
            geoIndex?: undefined;
            posX?: undefined;
            posY?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            sketchName: {
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
            radius: {
                type: string;
                description: string;
            };
            sides: {
                type: string;
                description: string;
            };
            name?: undefined;
            plane?: undefined;
            x1?: undefined;
            y1?: undefined;
            x2?: undefined;
            y2?: undefined;
            startAngle?: undefined;
            endAngle?: undefined;
            constraintType?: undefined;
            index1?: undefined;
            index2?: undefined;
            value?: undefined;
            majorRadius?: undefined;
            minorRadius?: undefined;
            points?: undefined;
            closed?: undefined;
            width?: undefined;
            x?: undefined;
            y?: undefined;
            objectName?: undefined;
            edgeName?: undefined;
            vertexIndex?: undefined;
            geoIndex?: undefined;
            posX?: undefined;
            posY?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            sketchName: {
                type: string;
                description: string;
            };
            x1: {
                type: string;
                description: string;
            };
            y1: {
                type: string;
                description: string;
            };
            x2: {
                type: string;
                description: string;
            };
            y2: {
                type: string;
                description: string;
            };
            width: {
                type: string;
                description: string;
            };
            name?: undefined;
            plane?: undefined;
            centerX?: undefined;
            centerY?: undefined;
            radius?: undefined;
            startAngle?: undefined;
            endAngle?: undefined;
            constraintType?: undefined;
            index1?: undefined;
            index2?: undefined;
            value?: undefined;
            majorRadius?: undefined;
            minorRadius?: undefined;
            points?: undefined;
            closed?: undefined;
            sides?: undefined;
            x?: undefined;
            y?: undefined;
            objectName?: undefined;
            edgeName?: undefined;
            vertexIndex?: undefined;
            geoIndex?: undefined;
            posX?: undefined;
            posY?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            sketchName: {
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
            name?: undefined;
            plane?: undefined;
            x1?: undefined;
            y1?: undefined;
            x2?: undefined;
            y2?: undefined;
            centerX?: undefined;
            centerY?: undefined;
            radius?: undefined;
            startAngle?: undefined;
            endAngle?: undefined;
            constraintType?: undefined;
            index1?: undefined;
            index2?: undefined;
            value?: undefined;
            majorRadius?: undefined;
            minorRadius?: undefined;
            points?: undefined;
            closed?: undefined;
            sides?: undefined;
            width?: undefined;
            objectName?: undefined;
            edgeName?: undefined;
            vertexIndex?: undefined;
            geoIndex?: undefined;
            posX?: undefined;
            posY?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            sketchName: {
                type: string;
                description: string;
            };
            objectName: {
                type: string;
                description: string;
            };
            edgeName: {
                type: string;
                description: string;
            };
            name?: undefined;
            plane?: undefined;
            x1?: undefined;
            y1?: undefined;
            x2?: undefined;
            y2?: undefined;
            centerX?: undefined;
            centerY?: undefined;
            radius?: undefined;
            startAngle?: undefined;
            endAngle?: undefined;
            constraintType?: undefined;
            index1?: undefined;
            index2?: undefined;
            value?: undefined;
            majorRadius?: undefined;
            minorRadius?: undefined;
            points?: undefined;
            closed?: undefined;
            sides?: undefined;
            width?: undefined;
            x?: undefined;
            y?: undefined;
            vertexIndex?: undefined;
            geoIndex?: undefined;
            posX?: undefined;
            posY?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            sketchName: {
                type: string;
                description: string;
            };
            vertexIndex: {
                type: string;
                description: string;
            };
            radius: {
                type: string;
                description: string;
            };
            name?: undefined;
            plane?: undefined;
            x1?: undefined;
            y1?: undefined;
            x2?: undefined;
            y2?: undefined;
            centerX?: undefined;
            centerY?: undefined;
            startAngle?: undefined;
            endAngle?: undefined;
            constraintType?: undefined;
            index1?: undefined;
            index2?: undefined;
            value?: undefined;
            majorRadius?: undefined;
            minorRadius?: undefined;
            points?: undefined;
            closed?: undefined;
            sides?: undefined;
            width?: undefined;
            x?: undefined;
            y?: undefined;
            objectName?: undefined;
            edgeName?: undefined;
            geoIndex?: undefined;
            posX?: undefined;
            posY?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            sketchName: {
                type: string;
                description: string;
            };
            geoIndex: {
                type: string;
                description: string;
            };
            posX: {
                type: string;
                description: string;
            };
            posY: {
                type: string;
                description: string;
            };
            name?: undefined;
            plane?: undefined;
            x1?: undefined;
            y1?: undefined;
            x2?: undefined;
            y2?: undefined;
            centerX?: undefined;
            centerY?: undefined;
            radius?: undefined;
            startAngle?: undefined;
            endAngle?: undefined;
            constraintType?: undefined;
            index1?: undefined;
            index2?: undefined;
            value?: undefined;
            majorRadius?: undefined;
            minorRadius?: undefined;
            points?: undefined;
            closed?: undefined;
            sides?: undefined;
            width?: undefined;
            x?: undefined;
            y?: undefined;
            objectName?: undefined;
            edgeName?: undefined;
            vertexIndex?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            sketchName: {
                type: string;
                description: string;
            };
            geoIndex: {
                type: string;
                description: string;
            };
            name?: undefined;
            plane?: undefined;
            x1?: undefined;
            y1?: undefined;
            x2?: undefined;
            y2?: undefined;
            centerX?: undefined;
            centerY?: undefined;
            radius?: undefined;
            startAngle?: undefined;
            endAngle?: undefined;
            constraintType?: undefined;
            index1?: undefined;
            index2?: undefined;
            value?: undefined;
            majorRadius?: undefined;
            minorRadius?: undefined;
            points?: undefined;
            closed?: undefined;
            sides?: undefined;
            width?: undefined;
            x?: undefined;
            y?: undefined;
            objectName?: undefined;
            edgeName?: undefined;
            vertexIndex?: undefined;
            posX?: undefined;
            posY?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            sketchName: {
                type: string;
                description: string;
            };
            name?: undefined;
            plane?: undefined;
            x1?: undefined;
            y1?: undefined;
            x2?: undefined;
            y2?: undefined;
            centerX?: undefined;
            centerY?: undefined;
            radius?: undefined;
            startAngle?: undefined;
            endAngle?: undefined;
            constraintType?: undefined;
            index1?: undefined;
            index2?: undefined;
            value?: undefined;
            majorRadius?: undefined;
            minorRadius?: undefined;
            points?: undefined;
            closed?: undefined;
            sides?: undefined;
            width?: undefined;
            x?: undefined;
            y?: undefined;
            objectName?: undefined;
            edgeName?: undefined;
            vertexIndex?: undefined;
            geoIndex?: undefined;
            posX?: undefined;
            posY?: undefined;
        };
        required: string[];
    };
})[];
export declare function handleSketcherTool(name: string, args: ToolArgs, bridge: FreeCADBridge): Promise<ToolResult>;
//# sourceMappingURL=sketcher.d.ts.map