'use client';

import { LEDsSettingContent } from "@/components/leds-setting-content";
import { useGamepadConfig } from "@/contexts/gamepad-config-context";

export default function LedsSettingPage() {
  const { gamepadConfig, setProfileDetails, resetProfileDetails } = useGamepadConfig();
  
  return (
    <LEDsSettingContent 
      gamepadConfig={gamepadConfig}
      setProfileDetailsHandler={setProfileDetails}
      resetProfileDetailsHandler={resetProfileDetails}
    />
  );
} 