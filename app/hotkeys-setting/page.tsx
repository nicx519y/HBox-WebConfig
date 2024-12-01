'use client';

import { HotkeysSettingContent } from "@/components/hotkeys-setting-content";
import { useGamepadConfig } from "@/contexts/gamepad-config-context";

export default function HotkeysSettingPage() {
  const { gamepadConfig, setProfileDetails, resetProfileDetails } = useGamepadConfig();
  
  return (
    <HotkeysSettingContent 
      gamepadConfig={gamepadConfig}
      setProfileDetailsHandler={setProfileDetails}
      resetProfileDetailsHandler={resetProfileDetails}
    />
  );
} 