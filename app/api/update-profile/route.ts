import { GamepadConfig, GameProfile } from '@/types/gamepad-config';
import { NextResponse } from 'next/server';
import { storedConfig } from '../gamepad-config/store';

export async function POST(request: Request) {
  try {
    const { profileId, profileDetails }: { profileId: string, profileDetails: GameProfile } = await request.json();
    
    if(!storedConfig.profiles) return NextResponse.json({ error: 'No profiles found' }, { status: 404 });

    let profile = storedConfig.profiles.find(profile => profile.id === profileId);

    if(!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 });

    profile = {
      ...profile,
      ...profileDetails,
    }; 

    if(profileDetails.keysConfig) {
      profile.keysConfig = {
        ...profile.keysConfig,
        ...profileDetails.keysConfig,
      };
    }

    if(profileDetails.triggerConfigs) {
      profile.triggerConfigs = {
        ...profile.triggerConfigs,
        ...profileDetails.triggerConfigs,
      };
    }

    if(profileDetails.ledsConfigs) {
      profile.ledsConfigs = {
        ...profile.ledsConfigs,
        ...profileDetails.ledsConfigs,
      };
    }

    if(profileDetails.hotkeys) {
      profile.hotkeys = profileDetails.hotkeys;
    }

    storedConfig.profiles = storedConfig.profiles.map(p => p.id === profileId ? profile : p);
    
    return NextResponse.json(storedConfig);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update config' }, { status: 500 });
  }
} 