'use client';

import { RapidTriggerContent } from "@/components/rapid-trigger-content";
import { useGamepadConfig } from "@/contexts/gamepad-config-context";

export default function RapidTriggerPage() {
  const { gamepadConfig, setProfileDetails, resetProfileDetails } = useGamepadConfig();
  
  return (
    <RapidTriggerContent 
      gamepadConfig={gamepadConfig}
      setProfileDetailsHandler={setProfileDetails}
      resetProfileDetailsHandler={resetProfileDetails}
    />
  );
} 