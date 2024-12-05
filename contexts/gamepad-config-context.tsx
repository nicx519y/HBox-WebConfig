'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { GamepadConfig, GameProfile, LedsEffectStyle, Platform, NUM_PROFILES_MAX, GameSocdMode, GameControllerButton, Hotkey, RapidTriggerConfig } from '@/types/gamepad-config';

const defaultConfig: GamepadConfig = {
  version: 1,
  defaultProfileId: "default",
  isCalibrateCompleted: false,
  numProfilesMax: NUM_PROFILES_MAX,
  profiles: [{
    id: "default",
    name: "Default Profile",
    keysConfig: {
      inputMode: Platform.XINPUT,
      socdMode: GameSocdMode.SOCD_MODE_UP_PRIORITY,
      invertXAxis: false,
      invertYAxis: false,
      fourWayMode: false,
      keyMapping: {},
    },
    ledsConfigs: {
      ledEnabled: false,
      ledsEffectStyle: LedsEffectStyle.STATIC,
      ledColors: ["#000000", "#000000", "#000000"],
      ledBrightness: 100,
    },
    hotkeys: [],
  }]
};

interface GamepadConfigContextType {
  gamepadConfig: GamepadConfig;
  setProfileDetails: (profileId: string, profileDetails: GameProfile) => Promise<void>;
  resetProfileDetails: () => Promise<void>;
  addNewProfile: (profileName: string) => Promise<void>;
  deleteProfile: (profileId: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const GamepadConfigContext = createContext<GamepadConfigContextType | undefined>(undefined);

/**
 * convert GamepadConfig
 * @param gamepadConfig - GamepadConfig
 */ 
const convertGamepadConfig = (gamepadConfig: any) => {
  const newConfig: GamepadConfig = {
    ...gamepadConfig,
  }
  newConfig.profiles = gamepadConfig.profiles?.map((profile: any) => ({
    ...profile,
    keysConfig: {
      inputMode: profile.keysConfig?.inputMode as Platform ?? Platform.XINPUT,
      socdMode: profile.keysConfig?.socdMode as GameSocdMode ?? GameSocdMode.SOCD_MODE_UP_PRIORITY,
      invertXAxis: profile.keysConfig?.invertXAxis as boolean ?? false,
      invertYAxis: profile.keysConfig?.invertYAxis as boolean ?? false,
      fourWayMode: profile.keysConfig?.fourWayMode as boolean ?? false,
      keyMapping: profile.keysConfig?.keyMapping as { [key in GameControllerButton]?: number[] } ?? {},
    },
    ledsConfigs: {
      ledEnabled: profile.ledsConfigs?.ledEnabled as boolean ?? false,
      ledsEffectStyle: profile.ledsConfigs?.ledsEffectStyle as LedsEffectStyle ?? LedsEffectStyle.STATIC,
      ledColors: profile.ledsConfigs?.ledColors as string[] ?? ["#000000", "#000000", "#000000"],
      ledBrightness: profile.ledsConfigs?.ledBrightness as number ?? 100,
    },
    hotkeys: profile.hotkeys as Hotkey[] ?? [],
    triggerConfigs: profile.triggerConfigs as { [key: number]: RapidTriggerConfig } ?? {},
  })) ?? [];

  console.log("convertGamepadConfig: ", newConfig);

  return newConfig;
}

/**
 * GamepadConfigProvider
 * @param children - React.ReactNode
 * @returns 
 */
export function GamepadConfigProvider({ children }: { children: React.ReactNode }) {
  const [gamepadConfig, setGamepadConfig] = useState<GamepadConfig>(defaultConfig);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGamepadConfig();
  }, []);

  const fetchGamepadConfig = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/gamepad-config');
      if (!response.ok) throw new Error('Failed to fetch config');
      const data = await response.json();
      convertGamepadConfig(data);
      setGamepadConfig(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const setProfileDetails = async (profileId: string, profileDetails: GameProfile) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profileId, profileDetails }),
      });
      
      if (!response.ok) throw new Error('Failed to update config');
      const updatedConfig: GamepadConfig = await response.json();
      convertGamepadConfig(updatedConfig);
      setGamepadConfig(updatedConfig);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const resetProfileDetails = async () => {
    console.log("resetProfileDetails");
    await fetchGamepadConfig();
  };

  const addNewProfile = async (profileName: string) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/add-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profileName }),
      });
      
      if (!response.ok) throw new Error('Failed to add profile');
      const updatedConfig = await response.json();
      convertGamepadConfig(updatedConfig);
      setGamepadConfig(updatedConfig);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProfile = async (profileId: string) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/delete-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profileId }),
      });
      
      if (!response.ok) throw new Error('Failed to delete profile');
      const updatedConfig = await response.json();
      convertGamepadConfig(updatedConfig);
      setGamepadConfig(updatedConfig);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GamepadConfigContext.Provider value={{ 
      gamepadConfig, 
      setProfileDetails, 
      resetProfileDetails,
      addNewProfile,
      deleteProfile,
      isLoading,
      error
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