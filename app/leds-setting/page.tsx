'use client';

import { LEDsSettingContent } from "@/components/leds-setting-content";
import { useGamepadConfig } from "@/contexts/gamepad-config-context";

export default function LedsSettingPage() {
  const { defaultProfile, setProfileDetails, resetProfileDetails } = useGamepadConfig();
  
  return (
    <LEDsSettingContent 
      defaultProfile={defaultProfile}
      setProfileDetailsHandler={setProfileDetails}
      resetProfileDetailsHandler={resetProfileDetails}
    />
  );
} 