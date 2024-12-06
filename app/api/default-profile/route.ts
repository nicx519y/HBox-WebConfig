import { NextResponse } from 'next/server';
import { storedConfig, getProfileDetails } from '@/app/api/data/store';

export async function GET() {
    try {
        if (!storedConfig.profiles
            || !storedConfig.defaultProfileId
            || storedConfig.defaultProfileId === ""
            || storedConfig.profiles.length === 0) {
            return NextResponse.json({ errNo: 1, errorMessage: 'No default profile' });
        }
        return NextResponse.json({
            errNo: 0,
            data: {
                profileDetails: getProfileDetails(storedConfig.defaultProfileId),
            },
        });
    } catch (error) {
        return NextResponse.json({ errNo: 1, errorMessage: 'Failed to fetch default profile' });
    }
} 