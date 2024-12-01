'use client';

import { KeysSettingContent } from "@/components/keys-setting-content";
import { useGamepadConfig } from "@/contexts/gamepad-config-context";

export default function KeysSettingPage() {
  const { gamepadConfig, setProfileDetails, resetProfileDetails } = useGamepadConfig();
  
  return (
    <KeysSettingContent 
      gamepadConfig={gamepadConfig}
      setProfileDetailsHandler={setProfileDetails}
      resetProfileDetailsHandler={resetProfileDetails}
    />
  );
} 