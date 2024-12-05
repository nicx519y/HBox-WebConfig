import { NextResponse } from 'next/server';
import { storedConfig } from './store';

export async function GET() {
  try {
    return NextResponse.json(storedConfig);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch config' }, { status: 500 });
  }
} 