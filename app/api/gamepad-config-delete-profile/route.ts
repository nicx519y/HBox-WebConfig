import { NextResponse } from 'next/server';
import { storedConfig } from '../gamepad-config/store';
import { GameProfile } from '@/types/gamepad-config';

export async function POST(request: Request) {
  try {
    const { profileId } = await request.json();
    
    // 不允许删除默认配置
    if (profileId === 'default') {
      return NextResponse.json({ error: 'Cannot delete default profile' }, { status: 400 });
    }

    storedConfig.profiles = storedConfig.profiles?.filter((profile: GameProfile) => profile.id !== profileId);
    
    // 如果删除的是当前选中的配置，切换到默认配置
    if (storedConfig.defaultProfileId === profileId) {
      storedConfig.defaultProfileId = 'default';
    }

    return NextResponse.json(storedConfig);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete profile' }, { status: 500 });
  }
} 