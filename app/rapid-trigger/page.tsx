'use client';

import { RapidTriggerContent } from "@/components/rapid-trigger-content";
import { useGamepadConfig } from "@/contexts/gamepad-config-context";

export default function RapidTriggerPage() {
  const { defaultProfile, setProfileDetails, resetProfileDetails } = useGamepadConfig();
  
  return (
    <RapidTriggerContent 
      defaultProfile={defaultProfile}
      setProfileDetailsHandler={setProfileDetails}
      resetProfileDetailsHandler={resetProfileDetails}
    />
  );
} 