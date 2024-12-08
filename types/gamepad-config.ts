export const NUM_PROFILES_MAX = 8;
// LEDS animation cycle in milliseconds 
export const LEDS_ANIMATION_CYCLE = 6000;
// LEDS animation step in milliseconds
export const LEDS_ANIMATION_STEP = 80;
// Default color for LEDs
export const LEDS_COLOR_DEFAULT = "#000000";
// Default number of hotkeys max
export const DEFAULT_NUM_HOTKEYS_MAX = 11;
// max number of key binding per button
export const NUM_BIND_KEY_PER_BUTTON_MAX = 3;
// max length of profile name
export const PROFILE_NAME_MAX_LENGTH = 20;


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
    SOCD_MODE_NEUTRAL = "SOCD_MODE_NEUTRAL", // 中性 up + down = neutral, left + right = neutral
    SOCD_MODE_UP_PRIORITY = "SOCD_MODE_UP_PRIORITY", // 上优先 up + down = up, left + right = neutral
    SOCD_MODE_SECOND_INPUT_PRIORITY = "SOCD_MODE_SECOND_INPUT_PRIORITY", // 第二输入优先 
    SOCD_MODE_FIRST_INPUT_PRIORITY = "SOCD_MODE_FIRST_INPUT_PRIORITY", // 第一输入优先 
    SOCD_MODE_BYPASS = "SOCD_MODE_BYPASS", // 绕过 不做任何处理 所有dpad信号都有效
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

export enum HotkeyAction {
    None = "None",
    LedsEffectStyleNext = "LedsEffectStyleNext",
    LedsEffectStylePrev = "LedsEffectStylePrev",
    LedsBrightnessUp = "LedsBrightnessUp",
    LedsBrightnessDown = "LedsBrightnessDown",
    LedsEnableSwitch = "LedsEnableSwitch",
    CalibrationMode = "CalibrationMode",
    WebConfigMode = "WebConfigMode",
    XInputMode = "XInputMode",
    PS4Mode = "PS4Mode",
    NSSwitchMode = "NSSwitchMode",
    SystemReboot = "SystemReboot",
}

export const HotkeyActionList = Object.values(HotkeyAction);

export const HotkeyActionLabelMap = new Map<HotkeyAction, { label: string, description: string }>([
    [HotkeyAction.None, { 
        label: "None", 
        description: "No action" 
    }],
    [HotkeyAction.LedsEffectStyleNext, { 
        label: "Next LED Effect", 
        description: "Switch to next LED effect style" 
    }],
    [HotkeyAction.LedsEffectStylePrev, { 
        label: "Previous LED Effect", 
        description: "Switch to previous LED effect style" 
    }],
    [HotkeyAction.LedsBrightnessUp, { 
        label: "Increase Brightness", 
        description: "Increase LED brightness" 
    }],
    [HotkeyAction.LedsBrightnessDown, { 
        label: "Decrease Brightness", 
        description: "Decrease LED brightness" 
    }],
    [HotkeyAction.LedsEnableSwitch, { 
        label: "Toggle LEDs", 
        description: "Enable/Disable LEDs" 
    }],
    [HotkeyAction.WebConfigMode, { 
        label: "Web Config Mode", 
        description: "Enter web configuration mode" 
    }],
    [HotkeyAction.XInputMode, { 
        label: "XInput Mode", 
        description: "Switch to XInput mode" 
    }],
    [HotkeyAction.PS4Mode, { 
        label: "PS4 Mode", 
        description: "Switch to PS4 mode" 
    }],
    [HotkeyAction.NSSwitchMode, { 
        label: "Switch Mode", 
        description: "Switch to Nintendo Switch mode" 
    }],
    [HotkeyAction.SystemReboot, { 
        label: "System Reboot", 
        description: "Reboot the system" 
    }],
]);

export type Hotkey = {
    key: number,
    action: HotkeyAction,
    isLocked?: boolean,
}

export interface KeysConfig {
    inputMode?: Platform;
    socdMode?: GameSocdMode;
    invertXAxis?: boolean;
    invertYAxis?: boolean;
    fourWayMode?: boolean;
    keyMapping?: {
        [key in GameControllerButton]?: number[];
    };
}

export interface GameProfile {
    id: string;
    name?: string;
    keysConfig?: KeysConfig;
    triggerConfigs?: {
        isAllBtnsConfiguring?: boolean;
        triggerConfigs?: RapidTriggerConfig[];
    };
    ledsConfigs?: {
        ledEnabled: boolean;
        ledsEffectStyle: LedsEffectStyle;
        ledColors: string[];
        ledBrightness: number;
    };
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

export interface GamepadConfig {
    version?: number;
    defaultProfileId?: string;
    isCalibrateCompleted?: boolean;
    numProfilesMax?: number;
    ADCButtons?: ADCButton[];
    GPIOButtons?: GPIOButton[];
    profiles?: GameProfile[];
    hotkeys?: Hotkey[];
}

export enum LedsEffectStyle {
    STATIC = "STATIC",
    BREATHING = "BREATHING",
    // WAVE = "WAVE",
}

export type RapidTriggerConfig = {
    topDeadzone: number;
    bottomDeadzone: number;
    pressAccuracy: number;
    releaseAccuracy: number;
}

export const LedsEffectStyleList = Object.values(LedsEffectStyle);

export const LedsEffectStyleLabelMap = new Map<LedsEffectStyle, { label: string, description: string, icon: string, hasBackColor2: boolean }>([
    [LedsEffectStyle.STATIC, { label: "Static", description: "Static color", icon: "sun-dim", hasBackColor2: false }],
    [LedsEffectStyle.BREATHING, { label: "Breathing", description: "Breathing color", icon: "activity", hasBackColor2: true }],
]);

export const ledColorsLabel = [ "Front Color", "Back Color 1", "Back Color 2" ];

// UI Text Constants
export const UI_TEXT = {
    // Common Button Labels
    BUTTON_RESET: "Reset",
    BUTTON_SAVE: "Save",
    BUTTON_REBOOT_WITH_SAVING: "Reboot With Saving",
    BUTTON_CANCEL: "Cancel",
    BUTTON_SUBMIT: "Submit",
    BUTTON_CONFIRM: "Confirm",
    
    // Dialog Titles
    DIALOG_REBOOT_CONFIRM_TITLE: "Are you sure?",
    DIALOG_REBOOT_SUCCESS_TITLE: "Reboot successful",
    DIALOG_CREATE_PROFILE_TITLE: "Create New Profile",
    DIALOG_RENAME_PROFILE_TITLE: "Rename Profile",
    
    // Dialog Messages
    DIALOG_REBOOT_CONFIRM_MESSAGE: "Rebooting the system with saving will save the current profile and ending the current session. Are you sure to continue?",
    DIALOG_REBOOT_SUCCESS_MESSAGE: "Rebooting the system with saving is successful. You can now close this window and start enjoying the gaming experience.",
    DIALOG_CREATE_PROFILE_CONFIRM_MESSAGE: "Creating a new profile will create a new profile and ending the current session. Are you sure to continue?",
    DIALOG_RENAME_PROFILE_CONFIRM_MESSAGE: "Renaming the current profile will save the current profile and ending the current session. Are you sure to continue?",
    
    // Error Messages
    ERROR_KEY_ALREADY_BINDED_TITLE: "Key already binded",
    ERROR_KEY_ALREADY_BINDED_DESC: "Please select another key, or unbind the key first",
    
    // Profile Related
    PROFILE_CREATE_DIALOG_TITLE: "Create New Profile",
    PROFILE_DELETE_DIALOG_TITLE: "Delete Profile",
    PROFILE_DELETE_CONFIRM_MESSAGE: "Deleting this profile can not be undone or reverted. Are you sure you want to delete this profile?",
    PROFILE_NAME_LABEL: "Profile Name",
    PROFILE_NAME_PLACEHOLDER: "Enter profile name",
    
    // Settings Labels
    SETTINGS_SOCD_LABEL: "SOCD Mode",
    SETTINGS_PLATFORM_LABEL: "Platform",
    SETTINGS_LEDS_ENABLE_LABEL: "Enable LEDs",
    SETTINGS_LEDS_EFFECT_LABEL: "LED Effect Style",
    SETTINGS_LEDS_BRIGHTNESS_LABEL: "LED Brightness",
    SETTINGS_LEDS_COLOR_FRONT_LABEL: "Front Color",
    SETTINGS_LEDS_COLOR_BACK1_LABEL: "Back Color 1",
    SETTINGS_LEDS_COLOR_BACK2_LABEL: "Back Color 2",
    SETTINGS_KEY_MAPPING_AUTO_SWITCH_LABEL: "Auto Switch",
    SETTINGS_KEY_MAPPING_MANUAL_SWITCH_LABEL: "Manual Switch",
    SETTINGS_RAPID_TRIGGER_ONFIGURING_BUTTON: "Configuring button: ",
    SETTINGS_RAPID_TRIGGER_SELECT_A_BUTTON_TO_CONFIGURE: "Select a button to configure",
    SETTINGS_RAPID_TRIGGER_TOP_DEADZONE_LABEL: "Top Deadzone (mm)",
    SETTINGS_RAPID_TRIGGER_BOTTOM_DEADZONE_LABEL: "Bottom Deadzone (mm)",
    SETTINGS_RAPID_TRIGGER_PRESS_ACCURACY_LABEL: "Press Accuracy (mm)",
    SETTINGS_RAPID_TRIGGER_RELEASE_ACCURACY_LABEL: "Release Accuracy (mm)",

    // Select Value Text
    SELECT_VALUE_TEXT_PLACEHOLDER: "Select action",
    
    // Tooltips
    TOOLTIP_SOCD_MODE: "SOCD (Simultaneous Opposing Cardinal Directions) handling mode",
    TOOLTIP_PLATFORM_MODE: "Select the platform for controller input",
    TOOLTIP_LEDS_ENABLE: "Toggle LED lighting effects",
    TOOLTIP_LEDS_EFFECT: "Choose the LED animation style",
    TOOLTIP_LEDS_BRIGHTNESS: "Adjust the brightness of LEDs",
    TOOLTIP_AUTO_SWITCH: "Auto Switch: Automatically switch the button field when the input key is changed.\nManual Switch: Manually set the active button field.",
    
    // API Response Messages
    API_REBOOT_SUCCESS_MESSAGE: "System is rebooting",
    API_REBOOT_ERROR_MESSAGE: "Failed to reboot system",
    
    // Loading States
    LOADING_MESSAGE: "Loading...",
    
    // Validation Messages
    VALIDATION_PROFILE_NAME_MAX_LENGTH: `Profile name cannot exceed ${PROFILE_NAME_MAX_LENGTH} characters`,
    VALIDATION_PROFILE_NAME_REQUIRED: "Profile name is required",
    VALIDATION_PROFILE_NAME_CANNOT_BE_SAME_AS_CURRENT_PROFILE_NAME: "Profile name cannot be the same as the current profile name",
    VALIDATION_PROFILE_NAME_ALREADY_EXISTS: "Profile name already exists",
    VALIDATION_PROFILE_NAME_SPECIAL_CHARACTERS: "Profile name cannot contain special characters",
    
    // Keys Settings
    SETTINGS_KEYS_TITLE: "KEYS SETTINGS",
    SETTINGS_KEYS_HELPER_TEXT: `- Input Mode: The input mode of the game controller.\n- Key Mapping: The mapping relationship between the Hitbox buttons and the Game Controller buttons.`,

    // LEDs Settings
    SETTINGS_LEDS_TITLE: "LEDS SETTINGS",
    SETTINGS_LEDS_HELPER_TEXT: "The LED effect style, colors, and brightness can be customized here.\n- Static: The LEDs are always on with the same color.\n- Breathing: The LEDs breath with the two colors.\n- Front Color: The color of the LEDs when the button is pressed.\n- back Color: The color of the LEDs based on the effect.",

    // Rapid Trigger Settings
    SETTINGS_RAPID_TRIGGER_TITLE: "RAPID TRIGGER SETTINGS",
    SETTINGS_RAPID_TRIGGER_HELPER_TEXT: "The rapid trigger settings can be customized here.\n- Top Deadzone: The distance from the top of the trigger to the deadzone.\n- Bottom Deadzone: The distance from the bottom of the trigger to the deadzone.\n- Press Accuracy: The accuracy of the trigger when pressed.\n- Release Accuracy: The accuracy of the trigger when released.",

    // Hotkeys Settings
    SETTINGS_HOTKEYS_TITLE: "HOTKEYS SETTINGS",
    SETTINGS_HOTKEYS_HELPER_TEXT: `Configure up to ${DEFAULT_NUM_HOTKEYS_MAX} hotkeys for quick access to various functions.\n- Click on the hotkey field and press the desired key on the hitbox to bind the hotkey.\n- Choice the hotkey action from the dropdown list.\n- Locked hotkeys are used for web configuration mode because this function is required.`,

    // Profile Select
    PROFILE_SELECT_CREATE_BUTTON: "Create New Profile",
    PROFILE_SELECT_RENAME_BUTTON: "Rename Profile",
    PROFILE_SELECT_DELETE_BUTTON: "Delete Profile",
    PROFILE_SELECT_MENU_BUTTON: "Profile Menu",
    PROFILE_SELECT_RENAME_DIALOG_TITLE: "Rename Profile",
    PROFILE_SELECT_RENAME_FIELD_LABEL: "Profile Name",
    PROFILE_SELECT_RENAME_FIELD_PLACEHOLDER: "Enter new profile name",
    PROFILE_SELECT_DELETE_CONFIRM_MESSAGE: "Deleting this profile can not be undone or reverted. Are you sure you want to delete this profile?",
} as const;

