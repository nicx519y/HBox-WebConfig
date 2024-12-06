import { NextResponse } from 'next/server';
import { storedConfig } from '@/app/api/data/store';

/**
 * Get hotkeys config
 * @returns 
 */
export async function GET() {
    try {
        if (!storedConfig.hotkeys) {
            return NextResponse.json({ errNo: 1, errorMessage: 'No hotkeys config' });
        }
        return NextResponse.json({
            errNo: 0,
            data: {
                hotkeysConfig: storedConfig.hotkeys,
            },
        });
    } catch (error) {
        return NextResponse.json({ errNo: 1, errorMessage: 'Failed to fetch hotkeys config' });
    }
} 