import { NextResponse } from 'next/server';
import { storedConfig } from '@/app/api/data/store';
import { Hotkey } from '@/types/gamepad-config';

/**
 * Update hotkeys config
 * @param request 
 * @returns 
 */
export async function POST(request: Request) {
    try {
        const { hotkeysConfig }: { hotkeysConfig: Hotkey[] } = await request.json();

        if (!hotkeysConfig || hotkeysConfig.length === 0) {
            return NextResponse.json({ errNo: 1, errorMessage: 'Parameter error.' });  
        }

        if (!storedConfig.hotkeys) {
            return NextResponse.json({ errNo: 1, errorMessage: 'No hotkeys config' });
        }

        storedConfig.hotkeys = hotkeysConfig;

        return NextResponse.json({
            errNo: 0,
            data: {
                hotkeysConfig: storedConfig.hotkeys,
            },
        });

    } catch (error) {
        return NextResponse.json({ errNo: 1, errorMessage: 'Failed to update hotkeys config' }, { status: 500 });
    }
} 