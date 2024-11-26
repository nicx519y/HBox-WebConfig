export enum Platform {
    XINPUT = "XINPUT",
    PS4 = "PS4",
    SWITCH = "SWITCH",
}

export const PlatformList = Object.values(Platform);

export const PlatformLabelMap = new Map<Platform, { label: string, description: string }>([
    [Platform.XINPUT, { 
        label: "Xbox", 
        description: "Xbox controller" 
    }],
    [Platform.PS4, { 
        label: "PlayStation 4", 
        description: "PlayStation 4 controller" 
    }],
    [Platform.SWITCH, { 
        label: "Nintendo Switch", 
        description: "Nintendo Switch controller" 
    }],
]);

export enum GameControllerButton {
    DPAD_UP = "DPAD_UP",
    DPAD_DOWN = "DPAD_DOWN",
    DPAD_LEFT = "DPAD_LEFT",
    DPAD_RIGHT = "DPAD_RIGHT",
    L1 = "L1",
    R1 = "R1",
    L2 = "L2",
    R2 = "R2",
    L3 = "L3",
    R3 = "R3",
    B1 = "B1",
    B2 = "B2",
    B3 = "B3",
    B4 = "B4",
    S1 = "S1",
    S2 = "S2",
    A1 = "A1",
    A2 = "A2",
}

export const GameControllerButtonList = Object.values(GameControllerButton);
/**
 * max number of key binding per button
 */
export const NumBindKeyPerButtonMax = 3;


export const XInputButtonMap = new Map<GameControllerButton, string>([
    [GameControllerButton.DPAD_UP, "DPAD_UP"],
    [GameControllerButton.DPAD_DOWN, "DPAD_DOWN"],
    [GameControllerButton.DPAD_LEFT, "DPAD_LEFT"],
    [GameControllerButton.DPAD_RIGHT, "DPAD_RIGHT"],
    [GameControllerButton.S1, "BACK"],
    [GameControllerButton.S2, "START"],
    [GameControllerButton.A1, "HOME"],
    [GameControllerButton.L1, "LB"],
    [GameControllerButton.R1, "RB"],
    [GameControllerButton.L2, "LT"],
    [GameControllerButton.R2, "RT"],
    [GameControllerButton.L3, "LEFT_THUMB"],
    [GameControllerButton.R3, "RIGHT_THUMB"],
    [GameControllerButton.B1, "A"],
    [GameControllerButton.B2, "B"],
    [GameControllerButton.B3, "X"],
    [GameControllerButton.B4, "Y"],
]);

export const PS4ButtonMap = new Map<GameControllerButton, string>([
    [GameControllerButton.DPAD_UP, "DPAD_UP"],
    [GameControllerButton.DPAD_DOWN, "DPAD_DOWN"],
    [GameControllerButton.DPAD_LEFT, "DPAD_LEFT"],
    [GameControllerButton.DPAD_RIGHT, "DPAD_RIGHT"],
    [GameControllerButton.S1, "TOUCHPAD"],
    [GameControllerButton.S2, "START"],
    [GameControllerButton.A1, "HOME"],
    [GameControllerButton.L1, "L1"],
    [GameControllerButton.R1, "R1"],
    [GameControllerButton.L2, "L2"],
    [GameControllerButton.R2, "R2"],
    [GameControllerButton.L3, "LEFT_THUMB"],
    [GameControllerButton.R3, "RIGHT_THUMB"],
    [GameControllerButton.B1, "SOUTH"],
    [GameControllerButton.B2, "EAST"],
    [GameControllerButton.B3, "WEST"],
    [GameControllerButton.B4, "NORTH"],
]);

export const SwitchButtonMap = new Map<GameControllerButton, string>([
    [GameControllerButton.DPAD_UP, "DPAD_UP"],
    [GameControllerButton.DPAD_DOWN, "DPAD_DOWN"],
    [GameControllerButton.DPAD_LEFT, "DPAD_LEFT"],
    [GameControllerButton.DPAD_RIGHT, "DPAD_RIGHT"],
    [GameControllerButton.S1, "MINUS"],
    [GameControllerButton.S2, "PLUS"],
    [GameControllerButton.A1, "HOME"],
    [GameControllerButton.A2, "CAPTURE"],
    [GameControllerButton.L1, "L"],
    [GameControllerButton.R1, "R"],
    [GameControllerButton.L2, "ZL"],
    [GameControllerButton.R2, "ZR"],
    [GameControllerButton.L3, "LEFT_THUMB"],
    [GameControllerButton.R3, "RIGHT_THUMB"],
    [GameControllerButton.B1, "B"],
    [GameControllerButton.B2, "A"],
    [GameControllerButton.B3, "Y"],
    [GameControllerButton.B4, "X"],
]);

export type GameProfileList = {
    defaultId: string;
    maxNumProfiles: number;
    items: GameProfile[];
}

export enum GameSocdMode {
    SOCD_MODE_UP_PRIORITY = "SOCD_MODE_UP_PRIORITY",
    SOCD_MODE_NEUTRAL = "SOCD_MODE_NEUTRAL",
    SOCD_MODE_SECOND_INPUT_PRIORITY = "SOCD_MODE_SECOND_INPUT_PRIORITY",
    SOCD_MODE_FIRST_INPUT_PRIORITY = "SOCD_MODE_FIRST_INPUT_PRIORITY",
    SOCD_MODE_BYPASS = "SOCD_MODE_BYPASS",
}

export const GameSocdModeList = Object.values(GameSocdMode);

export const GameSocdModeLabelMap = new Map<GameSocdMode, { label: string, description: string }>([
    [GameSocdMode.SOCD_MODE_UP_PRIORITY, { 
        label: "Up Priority", 
        description: "The first input is prioritized when the two inputs are the same." 
    }],
    [GameSocdMode.SOCD_MODE_NEUTRAL, { 
        label: "Neutral", 
        description: "The first input is prioritized when the two inputs are different." 
    }],
    [GameSocdMode.SOCD_MODE_SECOND_INPUT_PRIORITY, { 
        label: "Sec Input Priority", 
        description: "The second input is prioritized when the two inputs are different." 
    }],
    [GameSocdMode.SOCD_MODE_FIRST_INPUT_PRIORITY, { 
        label: "First Input Priority", 
        description: "The first input is prioritized when the two inputs are different." 
    }],
    [GameSocdMode.SOCD_MODE_BYPASS, { 
        label: "Bypass", 
        description: "Bypass the SOCD mode and use the first input." 
    }],
]);

export type GameProfile = {
    id?: string,
    name?: string,
    inputMode?: Platform,
    invertXAxis?: boolean,
    invertYAxis?: boolean,
    fourWayMode?: boolean,
    socdMode?: GameSocdMode, 
    keyMapping?: Map<GameControllerButton, Number[]>,
}

export type ADCButton = {
    virtualPin: number,
    magnettization: number,
    topPosition: number,
    bottomPosition: number,
}

export type GPIOButton = {
    virtualPin: number,
}

export type GamepadConfig = {
    version?: number,
    defaultProfileId?: string,
    isCalibrateCompleted?: boolean,
    numProfilesMax?: number,
    ADCButtons?: ADCButton[],
    GPIOButtons?: GPIOButton[],
    profiles?: GameProfile[],
}
