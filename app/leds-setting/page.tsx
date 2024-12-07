'use client';

import { LEDsSettingContent } from "@/components/leds-setting-content";
import { useGamepadConfig } from "@/contexts/gamepad-config-context";
import useUnsavedChangesWarning from "@/hooks/use-unsaved-changes-warning";

export default function LedsSettingPage() {
  const { defaultProfile, setProfileDetails, resetProfileDetails } = useGamepadConfig();
  const [isDirty, setIsDirty] = useUnsavedChangesWarning();
  return (
    <LEDsSettingContent 
      defaultProfile={defaultProfile}
      setProfileDetailsHandler={setProfileDetails}
      resetProfileDetailsHandler={resetProfileDetails}
      setIsDirty={setIsDirty}
    />
  );
} 