import { NextResponse } from 'next/server'
import { getServerEvent, setServerEvent } from '@/lib/server-event'

export async function GET() {
	const event = await getServerEvent()
	return NextResponse.json(event)
}

export async function POST(request: Request) {
	const { password, ...eventData } = await request.json()

	if (password !== process.env.EVENT_ADMIN_TOKEN) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	await setServerEvent(eventData)
	return NextResponse.json({ ok: true })
}
