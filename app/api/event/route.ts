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
	delete eventData.password
	try {
		await setServerEvent(eventData)
		return NextResponse.json({ ok: true })
	} catch (error) {
		console.error('Failed to save event:', error)
		return NextResponse.json(
			{ error: (error as Error).message },
			{ status: 500 },
		)
	}
}
