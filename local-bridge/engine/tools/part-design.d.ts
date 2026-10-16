import { FreeCADBridge } from '../freecad-bridge.js';
import { ToolResult, ToolArgs } from '../types.js';
export declare const PART_DESIGN_TOOLS: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            sketchName: {
                type: string;
                description: string;
            };
            length: {
                type: string;
                description: string;
            };
            symmetric: {
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
            depth?: undefined;
            angle?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            sketchNames?: undefined;
            solid?: undefined;
            profileName?: undefined;
            pathName?: undefined;
            objectName?: undefined;
            radius?: undefined;
            edgeNames?: undefined;
            size?: undefined;
            diameter?: undefined;
            holeType?: undefined;
            counterboreDiameter?: undefined;
            counterboreDepth?: undefined;
            countersinkAngle?: undefined;
            threaded?: undefined;
            thickness?: undefined;
            faceNames?: undefined;
            featureName?: undefined;
            directionAxis?: undefined;
            occurrences?: undefined;
            axis?: undefined;
            plane?: undefined;
            pitch?: undefined;
            height?: undefined;
            turns?: undefined;
            leftHanded?: undefined;
            spineName?: undefined;
            pullDirection?: undefined;
            transformNames?: undefined;
            subElements?: undefined;
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
            depth: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            length?: undefined;
            symmetric?: undefined;
            reversed?: undefined;
            angle?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            sketchNames?: undefined;
            solid?: undefined;
            profileName?: undefined;
            pathName?: undefined;
            objectName?: undefined;
            radius?: undefined;
            edgeNames?: undefined;
            size?: undefined;
            diameter?: undefined;
            holeType?: undefined;
            counterboreDiameter?: undefined;
            counterboreDepth?: undefined;
            countersinkAngle?: undefined;
            threaded?: undefined;
            thickness?: undefined;
            faceNames?: undefined;
            featureName?: undefined;
            directionAxis?: undefined;
            occurrences?: undefined;
            axis?: undefined;
            plane?: undefined;
            pitch?: undefined;
            height?: undefined;
            turns?: undefined;
            leftHanded?: undefined;
            spineName?: undefined;
            pullDirection?: undefined;
            transformNames?: undefined;
            subElements?: undefined;
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
            angle: {
                type: string;
                description: string;
            };
            axisX: {
                type: string;
                description: string;
            };
            axisY: {
                type: string;
                description: string;
            };
            axisZ: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            length?: undefined;
            symmetric?: undefined;
            reversed?: undefined;
            depth?: undefined;
            sketchNames?: undefined;
            solid?: undefined;
            profileName?: undefined;
            pathName?: undefined;
            objectName?: undefined;
            radius?: undefined;
            edgeNames?: undefined;
            size?: undefined;
            diameter?: undefined;
            holeType?: undefined;
            counterboreDiameter?: undefined;
            counterboreDepth?: undefined;
            countersinkAngle?: undefined;
            threaded?: undefined;
            thickness?: undefined;
            faceNames?: undefined;
            featureName?: undefined;
            directionAxis?: undefined;
            occurrences?: undefined;
            axis?: undefined;
            plane?: undefined;
            pitch?: undefined;
            height?: undefined;
            turns?: undefined;
            leftHanded?: undefined;
            spineName?: undefined;
            pullDirection?: undefined;
            transformNames?: undefined;
            subElements?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            sketchNames: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            solid: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            sketchName?: undefined;
            length?: undefined;
            symmetric?: undefined;
            reversed?: undefined;
            depth?: undefined;
            angle?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            profileName?: undefined;
            pathName?: undefined;
            objectName?: undefined;
            radius?: undefined;
            edgeNames?: undefined;
            size?: undefined;
            diameter?: undefined;
            holeType?: undefined;
            counterboreDiameter?: undefined;
            counterboreDepth?: undefined;
            countersinkAngle?: undefined;
            threaded?: undefined;
            thickness?: undefined;
            faceNames?: undefined;
            featureName?: undefined;
            directionAxis?: undefined;
            occurrences?: undefined;
            axis?: undefined;
            plane?: undefined;
            pitch?: undefined;
            height?: undefined;
            turns?: undefined;
            leftHanded?: undefined;
            spineName?: undefined;
            pullDirection?: undefined;
            transformNames?: undefined;
            subElements?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            profileName: {
                type: string;
                description: string;
            };
            pathName: {
                type: string;
                description: string;
            };
            solid: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            sketchName?: undefined;
            length?: undefined;
            symmetric?: undefined;
            reversed?: undefined;
            depth?: undefined;
            angle?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            sketchNames?: undefined;
            objectName?: undefined;
            radius?: undefined;
            edgeNames?: undefined;
            size?: undefined;
            diameter?: undefined;
            holeType?: undefined;
            counterboreDiameter?: undefined;
            counterboreDepth?: undefined;
            countersinkAngle?: undefined;
            threaded?: undefined;
            thickness?: undefined;
            faceNames?: undefined;
            featureName?: undefined;
            directionAxis?: undefined;
            occurrences?: undefined;
            axis?: undefined;
            plane?: undefined;
            pitch?: undefined;
            height?: undefined;
            turns?: undefined;
            leftHanded?: undefined;
            spineName?: undefined;
            pullDirection?: undefined;
            transformNames?: undefined;
            subElements?: undefined;
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
            radius: {
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
            sketchName?: undefined;
            length?: undefined;
            symmetric?: undefined;
            reversed?: undefined;
            depth?: undefined;
            angle?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            sketchNames?: undefined;
            solid?: undefined;
            profileName?: undefined;
            pathName?: undefined;
            size?: undefined;
            diameter?: undefined;
            holeType?: undefined;
            counterboreDiameter?: undefined;
            counterboreDepth?: undefined;
            countersinkAngle?: undefined;
            threaded?: undefined;
            thickness?: undefined;
            faceNames?: undefined;
            featureName?: undefined;
            directionAxis?: undefined;
            occurrences?: undefined;
            axis?: undefined;
            plane?: undefined;
            pitch?: undefined;
            height?: undefined;
            turns?: undefined;
            leftHanded?: undefined;
            spineName?: undefined;
            pullDirection?: undefined;
            transformNames?: undefined;
            subElements?: undefined;
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
            size: {
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
            sketchName?: undefined;
            length?: undefined;
            symmetric?: undefined;
            reversed?: undefined;
            depth?: undefined;
            angle?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            sketchNames?: undefined;
            solid?: undefined;
            profileName?: undefined;
            pathName?: undefined;
            radius?: undefined;
            diameter?: undefined;
            holeType?: undefined;
            counterboreDiameter?: undefined;
            counterboreDepth?: undefined;
            countersinkAngle?: undefined;
            threaded?: undefined;
            thickness?: undefined;
            faceNames?: undefined;
            featureName?: undefined;
            directionAxis?: undefined;
            occurrences?: undefined;
            axis?: undefined;
            plane?: undefined;
            pitch?: undefined;
            height?: undefined;
            turns?: undefined;
            leftHanded?: undefined;
            spineName?: undefined;
            pullDirection?: undefined;
            transformNames?: undefined;
            subElements?: undefined;
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
            diameter: {
                type: string;
                description: string;
            };
            depth: {
                type: string;
                description: string;
            };
            holeType: {
                type: string;
                enum: string[];
                description: string;
            };
            counterboreDiameter: {
                type: string;
                description: string;
            };
            counterboreDepth: {
                type: string;
                description: string;
            };
            countersinkAngle: {
                type: string;
                description: string;
            };
            threaded: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            length?: undefined;
            symmetric?: undefined;
            reversed?: undefined;
            angle?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            sketchNames?: undefined;
            solid?: undefined;
            profileName?: undefined;
            pathName?: undefined;
            objectName?: undefined;
            radius?: undefined;
            edgeNames?: undefined;
            size?: undefined;
            thickness?: undefined;
            faceNames?: undefined;
            featureName?: undefined;
            directionAxis?: undefined;
            occurrences?: undefined;
            axis?: undefined;
            plane?: undefined;
            pitch?: undefined;
            height?: undefined;
            turns?: undefined;
            leftHanded?: undefined;
            spineName?: undefined;
            pullDirection?: undefined;
            transformNames?: undefined;
            subElements?: undefined;
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
            thickness: {
                type: string;
                description: string;
            };
            faceNames: {
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
            sketchName?: undefined;
            length?: undefined;
            symmetric?: undefined;
            reversed?: undefined;
            depth?: undefined;
            angle?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            sketchNames?: undefined;
            solid?: undefined;
            profileName?: undefined;
            pathName?: undefined;
            radius?: undefined;
            edgeNames?: undefined;
            size?: undefined;
            diameter?: undefined;
            holeType?: undefined;
            counterboreDiameter?: undefined;
            counterboreDepth?: undefined;
            countersinkAngle?: undefined;
            threaded?: undefined;
            featureName?: undefined;
            directionAxis?: undefined;
            occurrences?: undefined;
            axis?: undefined;
            plane?: undefined;
            pitch?: undefined;
            height?: undefined;
            turns?: undefined;
            leftHanded?: undefined;
            spineName?: undefined;
            pullDirection?: undefined;
            transformNames?: undefined;
            subElements?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            featureName: {
                type: string;
                description: string;
            };
            directionAxis: {
                type: string;
                enum: string[];
                description: string;
            };
            length: {
                type: string;
                description: string;
            };
            occurrences: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            sketchName?: undefined;
            symmetric?: undefined;
            reversed?: undefined;
            depth?: undefined;
            angle?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            sketchNames?: undefined;
            solid?: undefined;
            profileName?: undefined;
            pathName?: undefined;
            objectName?: undefined;
            radius?: undefined;
            edgeNames?: undefined;
            size?: undefined;
            diameter?: undefined;
            holeType?: undefined;
            counterboreDiameter?: undefined;
            counterboreDepth?: undefined;
            countersinkAngle?: undefined;
            threaded?: undefined;
            thickness?: undefined;
            faceNames?: undefined;
            axis?: undefined;
            plane?: undefined;
            pitch?: undefined;
            height?: undefined;
            turns?: undefined;
            leftHanded?: undefined;
            spineName?: undefined;
            pullDirection?: undefined;
            transformNames?: undefined;
            subElements?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            featureName: {
                type: string;
                description: string;
            };
            axis: {
                type: string;
                enum: string[];
                description: string;
            };
            angle: {
                type: string;
                description: string;
            };
            occurrences: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            sketchName?: undefined;
            length?: undefined;
            symmetric?: undefined;
            reversed?: undefined;
            depth?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            sketchNames?: undefined;
            solid?: undefined;
            profileName?: undefined;
            pathName?: undefined;
            objectName?: undefined;
            radius?: undefined;
            edgeNames?: undefined;
            size?: undefined;
            diameter?: undefined;
            holeType?: undefined;
            counterboreDiameter?: undefined;
            counterboreDepth?: undefined;
            countersinkAngle?: undefined;
            threaded?: undefined;
            thickness?: undefined;
            faceNames?: undefined;
            directionAxis?: undefined;
            plane?: undefined;
            pitch?: undefined;
            height?: undefined;
            turns?: undefined;
            leftHanded?: undefined;
            spineName?: undefined;
            pullDirection?: undefined;
            transformNames?: undefined;
            subElements?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            featureName: {
                type: string;
                description: string;
            };
            plane: {
                type: string;
                enum: string[];
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            sketchName?: undefined;
            length?: undefined;
            symmetric?: undefined;
            reversed?: undefined;
            depth?: undefined;
            angle?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            sketchNames?: undefined;
            solid?: undefined;
            profileName?: undefined;
            pathName?: undefined;
            objectName?: undefined;
            radius?: undefined;
            edgeNames?: undefined;
            size?: undefined;
            diameter?: undefined;
            holeType?: undefined;
            counterboreDiameter?: undefined;
            counterboreDepth?: undefined;
            countersinkAngle?: undefined;
            threaded?: undefined;
            thickness?: undefined;
            faceNames?: undefined;
            directionAxis?: undefined;
            occurrences?: undefined;
            axis?: undefined;
            pitch?: undefined;
            height?: undefined;
            turns?: undefined;
            leftHanded?: undefined;
            spineName?: undefined;
            pullDirection?: undefined;
            transformNames?: undefined;
            subElements?: undefined;
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
            pitch: {
                type: string;
                description: string;
            };
            height: {
                type: string;
                description: string;
            };
            turns: {
                type: string;
                description: string;
            };
            leftHanded: {
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
            length?: undefined;
            symmetric?: undefined;
            depth?: undefined;
            angle?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            sketchNames?: undefined;
            solid?: undefined;
            profileName?: undefined;
            pathName?: undefined;
            objectName?: undefined;
            radius?: undefined;
            edgeNames?: undefined;
            size?: undefined;
            diameter?: undefined;
            holeType?: undefined;
            counterboreDiameter?: undefined;
            counterboreDepth?: undefined;
            countersinkAngle?: undefined;
            threaded?: undefined;
            thickness?: undefined;
            faceNames?: undefined;
            featureName?: undefined;
            directionAxis?: undefined;
            occurrences?: undefined;
            axis?: undefined;
            plane?: undefined;
            spineName?: undefined;
            pullDirection?: undefined;
            transformNames?: undefined;
            subElements?: undefined;
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
            pitch: {
                type: string;
                description: string;
            };
            height: {
                type: string;
                description: string;
            };
            turns: {
                type: string;
                description: string;
            };
            leftHanded: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            length?: undefined;
            symmetric?: undefined;
            reversed?: undefined;
            depth?: undefined;
            angle?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            sketchNames?: undefined;
            solid?: undefined;
            profileName?: undefined;
            pathName?: undefined;
            objectName?: undefined;
            radius?: undefined;
            edgeNames?: undefined;
            size?: undefined;
            diameter?: undefined;
            holeType?: undefined;
            counterboreDiameter?: undefined;
            counterboreDepth?: undefined;
            countersinkAngle?: undefined;
            threaded?: undefined;
            thickness?: undefined;
            faceNames?: undefined;
            featureName?: undefined;
            directionAxis?: undefined;
            occurrences?: undefined;
            axis?: undefined;
            plane?: undefined;
            spineName?: undefined;
            pullDirection?: undefined;
            transformNames?: undefined;
            subElements?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            profileName: {
                type: string;
                description: string;
            };
            spineName: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            sketchName?: undefined;
            length?: undefined;
            symmetric?: undefined;
            reversed?: undefined;
            depth?: undefined;
            angle?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            sketchNames?: undefined;
            solid?: undefined;
            pathName?: undefined;
            objectName?: undefined;
            radius?: undefined;
            edgeNames?: undefined;
            size?: undefined;
            diameter?: undefined;
            holeType?: undefined;
            counterboreDiameter?: undefined;
            counterboreDepth?: undefined;
            countersinkAngle?: undefined;
            threaded?: undefined;
            thickness?: undefined;
            faceNames?: undefined;
            featureName?: undefined;
            directionAxis?: undefined;
            occurrences?: undefined;
            axis?: undefined;
            plane?: undefined;
            pitch?: undefined;
            height?: undefined;
            turns?: undefined;
            leftHanded?: undefined;
            pullDirection?: undefined;
            transformNames?: undefined;
            subElements?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            featureName: {
                type: string;
                description: string;
            };
            faceNames: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            angle: {
                type: string;
                description: string;
            };
            pullDirection: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            sketchName?: undefined;
            length?: undefined;
            symmetric?: undefined;
            reversed?: undefined;
            depth?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            sketchNames?: undefined;
            solid?: undefined;
            profileName?: undefined;
            pathName?: undefined;
            objectName?: undefined;
            radius?: undefined;
            edgeNames?: undefined;
            size?: undefined;
            diameter?: undefined;
            holeType?: undefined;
            counterboreDiameter?: undefined;
            counterboreDepth?: undefined;
            countersinkAngle?: undefined;
            threaded?: undefined;
            thickness?: undefined;
            directionAxis?: undefined;
            occurrences?: undefined;
            axis?: undefined;
            plane?: undefined;
            pitch?: undefined;
            height?: undefined;
            turns?: undefined;
            leftHanded?: undefined;
            spineName?: undefined;
            transformNames?: undefined;
            subElements?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            featureName: {
                type: string;
                description: string;
            };
            transformNames: {
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
            sketchName?: undefined;
            length?: undefined;
            symmetric?: undefined;
            reversed?: undefined;
            depth?: undefined;
            angle?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            sketchNames?: undefined;
            solid?: undefined;
            profileName?: undefined;
            pathName?: undefined;
            objectName?: undefined;
            radius?: undefined;
            edgeNames?: undefined;
            size?: undefined;
            diameter?: undefined;
            holeType?: undefined;
            counterboreDiameter?: undefined;
            counterboreDepth?: undefined;
            countersinkAngle?: undefined;
            threaded?: undefined;
            thickness?: undefined;
            faceNames?: undefined;
            directionAxis?: undefined;
            occurrences?: undefined;
            axis?: undefined;
            plane?: undefined;
            pitch?: undefined;
            height?: undefined;
            turns?: undefined;
            leftHanded?: undefined;
            spineName?: undefined;
            pullDirection?: undefined;
            subElements?: undefined;
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
            subElements: {
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
            sketchName?: undefined;
            length?: undefined;
            symmetric?: undefined;
            reversed?: undefined;
            depth?: undefined;
            angle?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            sketchNames?: undefined;
            solid?: undefined;
            profileName?: undefined;
            pathName?: undefined;
            radius?: undefined;
            edgeNames?: undefined;
            size?: undefined;
            diameter?: undefined;
            holeType?: undefined;
            counterboreDiameter?: undefined;
            counterboreDepth?: undefined;
            countersinkAngle?: undefined;
            threaded?: undefined;
            thickness?: undefined;
            faceNames?: undefined;
            featureName?: undefined;
            directionAxis?: undefined;
            occurrences?: undefined;
            axis?: undefined;
            plane?: undefined;
            pitch?: undefined;
            height?: undefined;
            turns?: undefined;
            leftHanded?: undefined;
            spineName?: undefined;
            pullDirection?: undefined;
            transformNames?: undefined;
        };
        required: string[];
    };
})[];
export declare function handlePartDesignTool(name: string, args: ToolArgs, bridge: FreeCADBridge): Promise<ToolResult>;
//# sourceMappingURL=part-design.d.ts.map