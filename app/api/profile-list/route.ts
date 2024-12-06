import { NextResponse } from 'next/server';
import { getConfig, getProfileList } from '@/app/api/data/store';

export async function GET() {
    try {
        const config = await getConfig();
        if (!config.profiles || config.profiles.length === 0) {
            return NextResponse.json({ errNo: 1, errorMessage: 'No profiles' });
        }

        return NextResponse.json({
            errNo: 0,
            data: {
                profileList: await getProfileList(),
            },
        });
    } catch (error) {
        return NextResponse.json({ errNo: 1, errorMessage: 'Failed to fetch profile list' }, { status: 500 });
    }
} 