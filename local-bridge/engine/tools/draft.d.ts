import { FreeCADBridge } from '../freecad-bridge.js';
import { ToolResult, ToolArgs } from '../types.js';
export declare const DRAFT_TOOLS: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
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
                        z: {
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
            name: {
                type: string;
                description: string;
            };
            sides?: undefined;
            radius?: undefined;
            x?: undefined;
            y?: undefined;
            z?: undefined;
            majorRadius?: undefined;
            minorRadius?: undefined;
            width?: undefined;
            height?: undefined;
            objectName?: undefined;
            faceNames?: undefined;
            objectNames?: undefined;
            text?: undefined;
            size?: undefined;
            fontFile?: undefined;
            copy?: undefined;
            angle?: undefined;
            centerX?: undefined;
            centerY?: undefined;
            centerZ?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            scaleX?: undefined;
            scaleY?: undefined;
            scaleZ?: undefined;
            distance?: undefined;
            pathName?: undefined;
            count?: undefined;
            point1X?: undefined;
            point1Y?: undefined;
            point1Z?: undefined;
            point2X?: undefined;
            point2Y?: undefined;
            point2Z?: undefined;
            directionX?: undefined;
            directionY?: undefined;
            directionZ?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            sides: {
                type: string;
                description: string;
            };
            radius: {
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
            points?: undefined;
            closed?: undefined;
            majorRadius?: undefined;
            minorRadius?: undefined;
            width?: undefined;
            height?: undefined;
            objectName?: undefined;
            faceNames?: undefined;
            objectNames?: undefined;
            text?: undefined;
            size?: undefined;
            fontFile?: undefined;
            copy?: undefined;
            angle?: undefined;
            centerX?: undefined;
            centerY?: undefined;
            centerZ?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            scaleX?: undefined;
            scaleY?: undefined;
            scaleZ?: undefined;
            distance?: undefined;
            pathName?: undefined;
            count?: undefined;
            point1X?: undefined;
            point1Y?: undefined;
            point1Z?: undefined;
            point2X?: undefined;
            point2Y?: undefined;
            point2Z?: undefined;
            directionX?: undefined;
            directionY?: undefined;
            directionZ?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            majorRadius: {
                type: string;
                description: string;
            };
            minorRadius: {
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
            points?: undefined;
            closed?: undefined;
            sides?: undefined;
            radius?: undefined;
            width?: undefined;
            height?: undefined;
            objectName?: undefined;
            faceNames?: undefined;
            objectNames?: undefined;
            text?: undefined;
            size?: undefined;
            fontFile?: undefined;
            copy?: undefined;
            angle?: undefined;
            centerX?: undefined;
            centerY?: undefined;
            centerZ?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            scaleX?: undefined;
            scaleY?: undefined;
            scaleZ?: undefined;
            distance?: undefined;
            pathName?: undefined;
            count?: undefined;
            point1X?: undefined;
            point1Y?: undefined;
            point1Z?: undefined;
            point2X?: undefined;
            point2Y?: undefined;
            point2Z?: undefined;
            directionX?: undefined;
            directionY?: undefined;
            directionZ?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
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
            points?: undefined;
            closed?: undefined;
            sides?: undefined;
            radius?: undefined;
            majorRadius?: undefined;
            minorRadius?: undefined;
            objectName?: undefined;
            faceNames?: undefined;
            objectNames?: undefined;
            text?: undefined;
            size?: undefined;
            fontFile?: undefined;
            copy?: undefined;
            angle?: undefined;
            centerX?: undefined;
            centerY?: undefined;
            centerZ?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            scaleX?: undefined;
            scaleY?: undefined;
            scaleZ?: undefined;
            distance?: undefined;
            pathName?: undefined;
            count?: undefined;
            point1X?: undefined;
            point1Y?: undefined;
            point1Z?: undefined;
            point2X?: undefined;
            point2Y?: undefined;
            point2Z?: undefined;
            directionX?: undefined;
            directionY?: undefined;
            directionZ?: undefined;
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
            points?: undefined;
            closed?: undefined;
            sides?: undefined;
            radius?: undefined;
            x?: undefined;
            y?: undefined;
            z?: undefined;
            majorRadius?: undefined;
            minorRadius?: undefined;
            width?: undefined;
            height?: undefined;
            objectNames?: undefined;
            text?: undefined;
            size?: undefined;
            fontFile?: undefined;
            copy?: undefined;
            angle?: undefined;
            centerX?: undefined;
            centerY?: undefined;
            centerZ?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            scaleX?: undefined;
            scaleY?: undefined;
            scaleZ?: undefined;
            distance?: undefined;
            pathName?: undefined;
            count?: undefined;
            point1X?: undefined;
            point1Y?: undefined;
            point1Z?: undefined;
            point2X?: undefined;
            point2Y?: undefined;
            point2Z?: undefined;
            directionX?: undefined;
            directionY?: undefined;
            directionZ?: undefined;
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
            name: {
                type: string;
                description: string;
            };
            points?: undefined;
            closed?: undefined;
            sides?: undefined;
            radius?: undefined;
            x?: undefined;
            y?: undefined;
            z?: undefined;
            majorRadius?: undefined;
            minorRadius?: undefined;
            width?: undefined;
            height?: undefined;
            objectName?: undefined;
            faceNames?: undefined;
            text?: undefined;
            size?: undefined;
            fontFile?: undefined;
            copy?: undefined;
            angle?: undefined;
            centerX?: undefined;
            centerY?: undefined;
            centerZ?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            scaleX?: undefined;
            scaleY?: undefined;
            scaleZ?: undefined;
            distance?: undefined;
            pathName?: undefined;
            count?: undefined;
            point1X?: undefined;
            point1Y?: undefined;
            point1Z?: undefined;
            point2X?: undefined;
            point2Y?: undefined;
            point2Z?: undefined;
            directionX?: undefined;
            directionY?: undefined;
            directionZ?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            text: {
                type: string;
                description: string;
            };
            size: {
                type: string;
                description: string;
            };
            fontFile: {
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
            points?: undefined;
            closed?: undefined;
            sides?: undefined;
            radius?: undefined;
            majorRadius?: undefined;
            minorRadius?: undefined;
            width?: undefined;
            height?: undefined;
            objectName?: undefined;
            faceNames?: undefined;
            objectNames?: undefined;
            copy?: undefined;
            angle?: undefined;
            centerX?: undefined;
            centerY?: undefined;
            centerZ?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            scaleX?: undefined;
            scaleY?: undefined;
            scaleZ?: undefined;
            distance?: undefined;
            pathName?: undefined;
            count?: undefined;
            point1X?: undefined;
            point1Y?: undefined;
            point1Z?: undefined;
            point2X?: undefined;
            point2Y?: undefined;
            point2Z?: undefined;
            directionX?: undefined;
            directionY?: undefined;
            directionZ?: undefined;
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
            copy: {
                type: string;
                description: string;
            };
            points?: undefined;
            closed?: undefined;
            name?: undefined;
            sides?: undefined;
            radius?: undefined;
            majorRadius?: undefined;
            minorRadius?: undefined;
            width?: undefined;
            height?: undefined;
            objectName?: undefined;
            faceNames?: undefined;
            text?: undefined;
            size?: undefined;
            fontFile?: undefined;
            angle?: undefined;
            centerX?: undefined;
            centerY?: undefined;
            centerZ?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            scaleX?: undefined;
            scaleY?: undefined;
            scaleZ?: undefined;
            distance?: undefined;
            pathName?: undefined;
            count?: undefined;
            point1X?: undefined;
            point1Y?: undefined;
            point1Z?: undefined;
            point2X?: undefined;
            point2Y?: undefined;
            point2Z?: undefined;
            directionX?: undefined;
            directionY?: undefined;
            directionZ?: undefined;
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
            angle: {
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
            centerZ: {
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
            copy: {
                type: string;
                description: string;
            };
            points?: undefined;
            closed?: undefined;
            name?: undefined;
            sides?: undefined;
            radius?: undefined;
            x?: undefined;
            y?: undefined;
            z?: undefined;
            majorRadius?: undefined;
            minorRadius?: undefined;
            width?: undefined;
            height?: undefined;
            objectName?: undefined;
            faceNames?: undefined;
            text?: undefined;
            size?: undefined;
            fontFile?: undefined;
            scaleX?: undefined;
            scaleY?: undefined;
            scaleZ?: undefined;
            distance?: undefined;
            pathName?: undefined;
            count?: undefined;
            point1X?: undefined;
            point1Y?: undefined;
            point1Z?: undefined;
            point2X?: undefined;
            point2Y?: undefined;
            point2Z?: undefined;
            directionX?: undefined;
            directionY?: undefined;
            directionZ?: undefined;
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
            scaleX: {
                type: string;
                description: string;
            };
            scaleY: {
                type: string;
                description: string;
            };
            scaleZ: {
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
            centerZ: {
                type: string;
                description: string;
            };
            copy: {
                type: string;
                description: string;
            };
            points?: undefined;
            closed?: undefined;
            name?: undefined;
            sides?: undefined;
            radius?: undefined;
            x?: undefined;
            y?: undefined;
            z?: undefined;
            majorRadius?: undefined;
            minorRadius?: undefined;
            width?: undefined;
            height?: undefined;
            objectName?: undefined;
            faceNames?: undefined;
            text?: undefined;
            size?: undefined;
            fontFile?: undefined;
            angle?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            distance?: undefined;
            pathName?: undefined;
            count?: undefined;
            point1X?: undefined;
            point1Y?: undefined;
            point1Z?: undefined;
            point2X?: undefined;
            point2Y?: undefined;
            point2Z?: undefined;
            directionX?: undefined;
            directionY?: undefined;
            directionZ?: undefined;
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
            distance: {
                type: string;
                description: string;
            };
            copy: {
                type: string;
                description: string;
            };
            points?: undefined;
            closed?: undefined;
            name?: undefined;
            sides?: undefined;
            radius?: undefined;
            x?: undefined;
            y?: undefined;
            z?: undefined;
            majorRadius?: undefined;
            minorRadius?: undefined;
            width?: undefined;
            height?: undefined;
            faceNames?: undefined;
            objectNames?: undefined;
            text?: undefined;
            size?: undefined;
            fontFile?: undefined;
            angle?: undefined;
            centerX?: undefined;
            centerY?: undefined;
            centerZ?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            scaleX?: undefined;
            scaleY?: undefined;
            scaleZ?: undefined;
            pathName?: undefined;
            count?: undefined;
            point1X?: undefined;
            point1Y?: undefined;
            point1Z?: undefined;
            point2X?: undefined;
            point2Y?: undefined;
            point2Z?: undefined;
            directionX?: undefined;
            directionY?: undefined;
            directionZ?: undefined;
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
            points?: undefined;
            closed?: undefined;
            name?: undefined;
            sides?: undefined;
            radius?: undefined;
            x?: undefined;
            y?: undefined;
            z?: undefined;
            majorRadius?: undefined;
            minorRadius?: undefined;
            width?: undefined;
            height?: undefined;
            objectName?: undefined;
            faceNames?: undefined;
            text?: undefined;
            size?: undefined;
            fontFile?: undefined;
            copy?: undefined;
            angle?: undefined;
            centerX?: undefined;
            centerY?: undefined;
            centerZ?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            scaleX?: undefined;
            scaleY?: undefined;
            scaleZ?: undefined;
            distance?: undefined;
            pathName?: undefined;
            count?: undefined;
            point1X?: undefined;
            point1Y?: undefined;
            point1Z?: undefined;
            point2X?: undefined;
            point2Y?: undefined;
            point2Z?: undefined;
            directionX?: undefined;
            directionY?: undefined;
            directionZ?: undefined;
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
            pathName: {
                type: string;
                description: string;
            };
            count: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            points?: undefined;
            closed?: undefined;
            sides?: undefined;
            radius?: undefined;
            x?: undefined;
            y?: undefined;
            z?: undefined;
            majorRadius?: undefined;
            minorRadius?: undefined;
            width?: undefined;
            height?: undefined;
            faceNames?: undefined;
            objectNames?: undefined;
            text?: undefined;
            size?: undefined;
            fontFile?: undefined;
            copy?: undefined;
            angle?: undefined;
            centerX?: undefined;
            centerY?: undefined;
            centerZ?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            scaleX?: undefined;
            scaleY?: undefined;
            scaleZ?: undefined;
            distance?: undefined;
            point1X?: undefined;
            point1Y?: undefined;
            point1Z?: undefined;
            point2X?: undefined;
            point2Y?: undefined;
            point2Z?: undefined;
            directionX?: undefined;
            directionY?: undefined;
            directionZ?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            point1X: {
                type: string;
                description: string;
            };
            point1Y: {
                type: string;
                description: string;
            };
            point1Z: {
                type: string;
                description: string;
            };
            point2X: {
                type: string;
                description: string;
            };
            point2Y: {
                type: string;
                description: string;
            };
            point2Z: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            points?: undefined;
            closed?: undefined;
            sides?: undefined;
            radius?: undefined;
            x?: undefined;
            y?: undefined;
            z?: undefined;
            majorRadius?: undefined;
            minorRadius?: undefined;
            width?: undefined;
            height?: undefined;
            objectName?: undefined;
            faceNames?: undefined;
            objectNames?: undefined;
            text?: undefined;
            size?: undefined;
            fontFile?: undefined;
            copy?: undefined;
            angle?: undefined;
            centerX?: undefined;
            centerY?: undefined;
            centerZ?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            scaleX?: undefined;
            scaleY?: undefined;
            scaleZ?: undefined;
            distance?: undefined;
            pathName?: undefined;
            count?: undefined;
            directionX?: undefined;
            directionY?: undefined;
            directionZ?: undefined;
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
            directionX: {
                type: string;
                description: string;
            };
            directionY: {
                type: string;
                description: string;
            };
            directionZ: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            points?: undefined;
            closed?: undefined;
            sides?: undefined;
            radius?: undefined;
            x?: undefined;
            y?: undefined;
            z?: undefined;
            majorRadius?: undefined;
            minorRadius?: undefined;
            width?: undefined;
            height?: undefined;
            faceNames?: undefined;
            objectNames?: undefined;
            text?: undefined;
            size?: undefined;
            fontFile?: undefined;
            copy?: undefined;
            angle?: undefined;
            centerX?: undefined;
            centerY?: undefined;
            centerZ?: undefined;
            axisX?: undefined;
            axisY?: undefined;
            axisZ?: undefined;
            scaleX?: undefined;
            scaleY?: undefined;
            scaleZ?: undefined;
            distance?: undefined;
            pathName?: undefined;
            count?: undefined;
            point1X?: undefined;
            point1Y?: undefined;
            point1Z?: undefined;
            point2X?: undefined;
            point2Y?: undefined;
            point2Z?: undefined;
        };
        required: string[];
    };
})[];
export declare function handleDraftTool(name: string, args: ToolArgs, bridge: FreeCADBridge): Promise<ToolResult>;
//# sourceMappingURL=draft.d.ts.map