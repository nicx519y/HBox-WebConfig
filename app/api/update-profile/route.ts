import { NextResponse } from 'next/server';
import { storedConfig, getProfileDetails } from '@/app/api/data/store';
import { GameProfile } from '@/types/gamepad-config';

/**
 * Update profile config
 * @param request 
 * @returns 
 */
export async function POST(request: Request) {
    try {
        const { profileId, profileDetails }: { profileId: string, profileDetails: GameProfile } = await request.json();

        if (!storedConfig.profiles) return NextResponse.json({ error: 'No profiles found' });

        let profile = storedConfig.profiles.find(profile => profile.id === profileId);

        if (!profile) return NextResponse.json({ error: 'Profile not found' });

        profile = {
            ...profile,
            ...profileDetails,
        };

        if (profileDetails.keysConfig) {
            profile.keysConfig = {
                ...profile.keysConfig,
                ...profileDetails.keysConfig,
            };
        }

        if (profileDetails.triggerConfigs) {
            profile.triggerConfigs = {
                ...profile.triggerConfigs,
                ...profileDetails.triggerConfigs,
            };
        }

        if (profileDetails.ledsConfigs) {
            profile.ledsConfigs = {
                ...profile.ledsConfigs,
                ...profileDetails.ledsConfigs,
            };
        }

        storedConfig.profiles = storedConfig.profiles.map(p => p.id === profileId ? profile : p);

        return NextResponse.json({
            errNo: 0,
            data: {
                profileDetails: getProfileDetails(profileId),
            },
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update config' }, { status: 500 });
    }
} 