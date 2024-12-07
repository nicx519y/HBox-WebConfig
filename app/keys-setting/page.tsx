'use client';

import { KeysSettingContent } from "@/components/keys-setting-content";
import { useGamepadConfig } from "@/contexts/gamepad-config-context";

export default function KeysSettingPage() {
  const { defaultProfile, setProfileDetails, resetProfileDetails } = useGamepadConfig();
  
  return (
    <KeysSettingContent 
      defaultProfile={defaultProfile}
      setProfileDetailsHandler={setProfileDetails}
      resetProfileDetailsHandler={resetProfileDetails}
    />
  );
} 