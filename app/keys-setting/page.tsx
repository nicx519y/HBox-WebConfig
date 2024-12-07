'use client';

import { KeysSettingContent } from "@/components/keys-setting-content";
import { useGamepadConfig } from "@/contexts/gamepad-config-context";
import useUnsavedChangesWarning from "@/hooks/use-unsaved-changes-warning";

export default function KeysSettingPage() {
  const { defaultProfile, setProfileDetails, resetProfileDetails } = useGamepadConfig();
  const [_isDirty, setIsDirty] = useUnsavedChangesWarning();

  return (
    <KeysSettingContent 
      defaultProfile={defaultProfile}
      setProfileDetailsHandler={setProfileDetails}
      resetProfileDetailsHandler={resetProfileDetails}
      setIsDirty={setIsDirty}
    />
  );
} 