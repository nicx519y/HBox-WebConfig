'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { GamepadConfig, GameProfile, LedsEffectStyle, Platform, NUM_PROFILES_MAX, GameSocdMode, GameControllerButton, Hotkey, RapidTriggerConfig, GameProfileList } from '@/types/gamepad-config';

interface GamepadConfigContextType {
    profileList: GameProfileList;
    defaultProfile: GameProfile;
    hotkeysConfig: Hotkey[];
    fetchDefaultProfile: () => void;
    fetchProfileList: () => void;
    fetchHotkeysConfig: () => void;
    setProfileDetails: (profileId: string, profileDetails: GameProfile) => void;
    resetProfileDetails: () => void;
    createProfile: (profileName: string) => void;
    deleteProfile: (profileId: string) => void;
    switchProfile: (profileId: string) => void;
    updateHotkeysConfig: (hotkeysConfig: Hotkey[]) => void;
    isLoading: boolean;
    error: string | null;
}

const GamepadConfigContext = createContext<GamepadConfigContextType | undefined>(undefined);

/**
 * convert profile details
 * @param profile - GameProfile
 * @returns 
 */
const converProfileDetails = (profile: any) => {
    const newProfile: GameProfile = {
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
    }
    return newProfile;
}

/**
 * process response
 * @param response - Response
 * @returns 
 */
const processResponse = async (response: Response, setError: (error: string | null) => void) => {
    if (!response.ok) throw new Error('Failed to fetch config');
    const data = await response.json();
    if(data.errNo) {
        setError(data.errorMessage);
        return;
    }
    return data.data;
}

/**
 * GamepadConfigProvider
 * @param children - React.ReactNode
 * @returns 
 */
export function GamepadConfigProvider({ children }: { children: React.ReactNode }) {
    const [profileList, setProfileList] = useState<GameProfileList>({ defaultId: "", maxNumProfiles: 0, items: [] });
    const [defaultProfile, setDefaultProfile] = useState<GameProfile>({ id: "", name: "" });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [hotkeysConfig, setHotkeysConfig] = useState<Hotkey[]>([]);

    useEffect(() => {
        fetchProfileList();
        fetchHotkeysConfig();
    }, []);

    useEffect(() => {
        if (profileList.defaultId !== "") {
            fetchDefaultProfile();
        }
    }, [profileList]);

    const fetchDefaultProfile = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/default-profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await processResponse(response, setError);
            if (!data) {
                throw new Error('Failed to fetch default profile');
            };
            setDefaultProfile(converProfileDetails(data.profileDetails) ?? {});
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchProfileList = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/profile-list', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }); 
            const data = await processResponse(response, setError);
            if (!data) {
                throw new Error('Failed to fetch profile list');
            };
            setProfileList(data.profileList);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchHotkeysConfig = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/hotkeys-config', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await processResponse(response, setError);
            if (!data) {
                throw new Error('Failed to fetch hotkeys config');
            };
            setHotkeysConfig(data.hotkeysConfig);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    }

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

            const data = await processResponse(response, setError);
            if (!data) {
                throw new Error('Failed to update profile');
            };

            // 如果更新的是 profile 的 name，则需要重新获取 profile list
            if(profileDetails.hasOwnProperty("name") || profileDetails.hasOwnProperty("id")) {
                fetchProfileList();
            } else { // 否则更新 default profile
                setDefaultProfile(converProfileDetails(data.profileDetails) ?? {});
            }
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const resetProfileDetails = async () => {
        await fetchDefaultProfile();
    };

    const createProfile = async (profileName: string) => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/create-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ profileName }),
            });

            const data = await processResponse(response, setError);
            if (!data) {
                return;
            };
            setProfileList(data.profileList);
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

            const data = await processResponse(response, setError);
            if (!data) {
                return;
            };
            setProfileList(data.profileList);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const switchProfile = async (profileId: string) => {
        try {
            console.log("switchProfile: ", profileId);
            setIsLoading(true);
            const response = await fetch('/api/switch-default-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ profileId }),
            });
            const data = await processResponse(response, setError);
            if (!data) {
                return;
            };
            setProfileList(data.profileList);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const updateHotkeysConfig = async (hotkeysConfig: Hotkey[]) => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/update-hotkeys-config', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ hotkeysConfig }),
            });
            const data = await processResponse(response, setError);
            if (!data) {
                return;
            }
            setHotkeysConfig(data.hotkeysConfig);
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
            profileList,
            defaultProfile,
            hotkeysConfig,
            fetchDefaultProfile,
            fetchProfileList,
            fetchHotkeysConfig,
            setProfileDetails,
            resetProfileDetails,
            createProfile,
            deleteProfile,
            switchProfile,
            updateHotkeysConfig,
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