import { NextResponse } from 'next/server';
import { getProfileList, storedConfig } from '@/app/api/data/store';

export async function GET() {
    try {
        if (!storedConfig.profiles || storedConfig.profiles.length === 0) {
            return NextResponse.json({ errNo: 1, errorMessage: 'No profiles' });
        }

        return NextResponse.json({
            errNo: 0,
            data: {
                profileList: getProfileList(),
            },
        });

    } catch (error) {
        return NextResponse.json({ errNo: 1, errorMessage: 'Failed to fetch profile list' }, { status: 500 });
    }
} 