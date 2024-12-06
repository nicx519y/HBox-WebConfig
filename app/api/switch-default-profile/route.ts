import { GamepadConfig, GameProfile } from '@/types/gamepad-config';
import { NextResponse } from 'next/server';
import { storedConfig, getProfileDetails, getProfileList } from '@/app/api/data/store';

export async function POST(request: Request) {
    try {
        const { profileId }: { profileId: string } = await request.json();

        if (!profileId || profileId === "") return NextResponse.json({ errNo: 1, errorMessage: 'Profile ID is required' });

        if (!storedConfig.profiles 
            || storedConfig.profiles.length === 0 
            || !getProfileDetails(profileId)) {
            return NextResponse.json({ errNo: 1, errorMessage: 'No profiles found' });
        }
        
        storedConfig.defaultProfileId = profileId;

        return NextResponse.json({
            errNo: 0,
            data: {
                profileList: getProfileList(),
            },
        });
    } catch (error) {
        return NextResponse.json({ errNo: 1, errorMessage: 'Failed to switch default profile' }, { status: 500 });
    }
} 