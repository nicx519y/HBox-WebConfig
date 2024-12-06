import { 
    GamepadConfig, 
    GameSocdMode, 
    LedsEffectStyle, 
    Platform, 
    NUM_PROFILES_MAX, 
    HotkeyAction, 
    GameProfileList, 
    GameProfile 
} from '@/types/gamepad-config';

// 这里模拟数据库存储，实际应用中应该连接到真实数据库
export const storedConfig: GamepadConfig = {
    version: 1,
    defaultProfileId: "default",
    isCalibrateCompleted: false,
    numProfilesMax: NUM_PROFILES_MAX,
    profiles: [{
        id: "default",
        name: "Default Profile",
        keysConfig: {
            inputMode: Platform.XINPUT,
            socdMode: GameSocdMode.SOCD_MODE_UP_PRIORITY,
            invertXAxis: false,
            invertYAxis: false,
            fourWayMode: false,
            keyMapping: {},
        },
        ledsConfigs: {
            ledEnabled: false,
            ledsEffectStyle: LedsEffectStyle.STATIC,
            ledColors: ["#000000", "#000000", "#000000"],
            ledBrightness: 100,
        },
    }],
    hotkeys: [
        { key: 0, action: HotkeyAction.WebConfigMode, isLocked: true },
    ],
};

/**
 * 获取profile列表
 * @returns 
 */
export const getProfileList = (): GameProfileList => {
    return {
        defaultId: storedConfig.defaultProfileId ?? "",
        maxNumProfiles: storedConfig.numProfilesMax ?? 0,
        items: storedConfig.profiles?.map(p => ({
            id: p.id ?? "",
            name: p.name ?? "",
        })) ?? [],
    };
};  

/**
 * 获取指定profile的详情    
 * @param profileId 
 * @returns 
 */
export const getProfileDetails = (profileId: string): GameProfile | null => {
    return storedConfig.profiles?.find(p => p.id === profileId) ?? null;
};  

/**
 * 获取初始化配置的profile详情
 * @param id 
 * @param name 
 * @returns 
 */
export const getInitialProfileDetails = (id: string, name: string): GameProfile => {
    return {
        id: id,
        name: name,
        keysConfig: {
            inputMode: Platform.XINPUT,
            socdMode: GameSocdMode.SOCD_MODE_UP_PRIORITY,
            invertXAxis: false,
            invertYAxis: false,
            fourWayMode: false,
            keyMapping: {}, // 默认按键映射
        },
        ledsConfigs: {
            ledEnabled: false,
            ledsEffectStyle: LedsEffectStyle.STATIC,
            ledColors: ["#000000", "#000000", "#000000"],
            ledBrightness: 100,
        },
    };
};

