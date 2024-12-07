'use client';

import { RapidTriggerContent } from "@/components/rapid-trigger-content";
import { useGamepadConfig } from "@/contexts/gamepad-config-context";
import useUnsavedChangesWarning from "@/hooks/use-unsaved-changes-warning";
export default function RapidTriggerPage() {
  const { defaultProfile, setProfileDetails, resetProfileDetails } = useGamepadConfig();
  const [_isDirty, setIsDirty] = useUnsavedChangesWarning();

  return (
    <RapidTriggerContent 
      defaultProfile={defaultProfile}
      setProfileDetailsHandler={setProfileDetails}
      resetProfileDetailsHandler={resetProfileDetails}
      setIsDirty={setIsDirty}
    />
  );
}   