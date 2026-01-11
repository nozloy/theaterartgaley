import { NextResponse } from 'next/server'
import { getEvent } from '@/lib/event'

export async function GET() {
	const event = await getEvent()
	return NextResponse.json(event)
}
