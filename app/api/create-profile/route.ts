import { NextResponse } from "next/server";

import { storedConfig, getProfileDetails, getProfileList, getInitialProfileDetails } from "@/app/api/data/store";

export async function POST(request: Request) {
    try {
        const { profileName } = await request.json();
        const newProfileId = `profile-${Date.now()}`;

        if (!profileName || profileName === "") {
            return NextResponse.json({ errNo: 1, errorMessage: 'Profile name is required' });
        }

        if (!storedConfig.profiles || storedConfig.profiles.length >= (storedConfig.numProfilesMax ?? 0)) {
            return NextResponse.json({ errNo: 1, errorMessage: 'Max number of profiles reached' });
        }

        storedConfig.profiles?.push(getInitialProfileDetails(newProfileId, profileName));
        storedConfig.defaultProfileId = newProfileId;

        return NextResponse.json({
            errNo: 0,
            data: {
                profileList: getProfileList(),
            },
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add profile' }, { status: 500 });
    }
} 