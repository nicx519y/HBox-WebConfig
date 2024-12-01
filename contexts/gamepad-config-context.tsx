'use client';

import { createContext, useContext, useState } from 'react';
import { GamepadConfig, GameProfile, Platform } from '@/types/gamepad-config';

const defaultConfig: GamepadConfig = {
  version: 1,
  defaultProfileId: "default",
  isCalibrateCompleted: false,
  numProfilesMax: 1,
  profiles: [{
    id: "default",
    name: "Default",
    inputMode: Platform.XINPUT,
    // 添加其他必要的默认值
  }]
};

interface GamepadConfigContextType {
  gamepadConfig: GamepadConfig;
  setProfileDetails: (profileId: string, profileDetails: GameProfile) => Promise<void>;
  resetProfileDetails: () => Promise<void>;
}

const GamepadConfigContext = createContext<GamepadConfigContextType | undefined>(undefined);

export function GamepadConfigProvider({ children }: { children: React.ReactNode }) {
  const [gamepadConfig, setGamepadConfig] = useState<GamepadConfig>(defaultConfig);

  const setProfileDetails = async (profileId: string, profileDetails: GameProfile) => {
    setGamepadConfig(prev => ({
      ...prev,
      profiles: prev.profiles?.map(profile =>
        profile.id === profileId ? { ...profile, ...profileDetails } : profile
      )
    }));
  };

  const resetProfileDetails = async () => {
    setGamepadConfig(defaultConfig);
  };

  return (
    <GamepadConfigContext.Provider value={{ 
      gamepadConfig, 
      setProfileDetails, 
      resetProfileDetails 
    }}>
      {children}
    </GamepadConfigContext.Provider>
  );
}

export function useGamepadConfig() {
  const context = useContext(GamepadConfigContext);
  if (context === undefined) {
    throw new Error('useGamepadConfig must be used within a GamepadConfigProvider');
  }
  return context;
} 