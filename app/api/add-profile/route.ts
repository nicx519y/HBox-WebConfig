import { NextResponse } from "next/server";

import { storedConfig } from "@/app/api/gamepad-config/store";
import { Platform } from "@/types/gamepad-config";

export async function POST(request: Request) {
  try {
    const { profileName } = await request.json();
    const newProfileId = `profile-${Date.now()}`;
    
    storedConfig.profiles?.push({
      id: newProfileId,
      name: profileName,
      keysConfig: {
        inputMode: storedConfig.profiles?.[0]?.keysConfig?.inputMode ?? Platform.XINPUT,
      },
    });

    return NextResponse.json(storedConfig);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add profile' }, { status: 500 });
  }
} 