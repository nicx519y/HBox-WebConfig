import { NextResponse } from 'next/server';
import { getConfig, getProfileDetails } from '@/app/api/data/store';

export async function GET() {
    try {
        const config = await getConfig();
        if (!config.profiles
            || !config.defaultProfileId
            || config.defaultProfileId === ""
            || config.profiles.length === 0) {
            return NextResponse.json({ errNo: 1, errorMessage: 'No default profile' });
        }

        const profileDetails = await getProfileDetails(config.defaultProfileId);
        return NextResponse.json({
            errNo: 0,
            data: {
                profileDetails,
            },
        });
    } catch (error) {
        return NextResponse.json({ errNo: 1, errorMessage: 'Failed to fetch default profile' });
    }
} 