import { GamepadConfig, GameSocdMode, LedsEffectStyle, Platform, NUM_PROFILES_MAX, HotkeyAction } from '@/types/gamepad-config';

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
    hotkeys: [
      { key: 0, action: HotkeyAction.WebConfigMode, isLocked: true },
    ],
  }],
}; 