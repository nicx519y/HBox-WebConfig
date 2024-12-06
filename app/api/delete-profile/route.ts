import { NextResponse } from "next/server";

import { getProfileDetails, getProfileList, storedConfig } from "@/app/api/data/store";
import { Platform } from "@/types/gamepad-config";

export async function POST(request: Request) {
    try {
        const { profileId } = await request.json();

        if (!profileId) {
            return NextResponse.json({ errNo: 1, errorMessage: 'Profile ID is required' });
        }
        if (profileId === "default") {
            return NextResponse.json({ errNo: 1, errorMessage: 'First profile cannot be deleted' });
        }
        if (!storedConfig.profiles
            || storedConfig.profiles.length <= 1
            || storedConfig.profiles.find(p => p.id === profileId) === undefined) {
            return NextResponse.json({ errNo: 1, errorMessage: 'Profile not found' });
        }

        storedConfig.profiles = storedConfig.profiles?.filter(p => p.id !== profileId);
        storedConfig.defaultProfileId = storedConfig.profiles?.[0]?.id ?? "";

        return NextResponse.json({
            errNo: 0,
            data: {
                profileList: getProfileList(),
            },
        });
    } catch (error) {
        return NextResponse.json({ errNo: 1, errorMessage: 'Failed to delete profile' }, { status: 500 });
    }
} 