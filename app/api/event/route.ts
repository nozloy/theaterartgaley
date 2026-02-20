import { NextResponse } from 'next/server'
import { getServerEvent } from '@/lib/server-event'
import { auth } from '@/lib/auth'
import { createEvent } from '@/lib/events'
import { uploadImageToS3 } from '@/lib/s3'

export async function GET() {
	const event = await getServerEvent()
	return NextResponse.json(event)
}

async function getAdminSession(request: Request) {
	const session = await auth.api.getSession({
		headers: request.headers,
	})

	if (!session) {
		return { error: 'Unauthorized', status: 401 as const }
	}

	const role = (session.user as { role?: string }).role
	if (role !== 'admin') {
		return { error: 'Forbidden', status: 403 as const }
	}

	return { session }
}

export async function POST(request: Request) {
	try {
		const access = await getAdminSession(request)
		if ('error' in access) {
			return NextResponse.json({ error: access.error }, { status: access.status })
		}

		const formData = await request.formData()
		let imageUrl = String(formData.get('image') ?? '').trim()
		const file = formData.get('file')

		if (file instanceof File && file.size > 0) {
			imageUrl = await uploadImageToS3(file)
		}

		const startsAtRaw = String(formData.get('startsAt') ?? '').trim()
		const dateRaw = String(formData.get('date') ?? '').trim()
		const timeRaw = String(formData.get('time') ?? '').trim()
		const startsAtInput =
			startsAtRaw || (dateRaw && timeRaw ? `${dateRaw}T${timeRaw}` : '')

		const eventData = {
			label: String(formData.get('label') ?? '').trim(),
			startsAtInput,
			address: String(formData.get('address') ?? '').trim(),
			kassirUrl: String(formData.get('kassirUrl') ?? '').trim(),
			mapsUrl: String(formData.get('mapsUrl') ?? '').trim(),
			description: String(formData.get('description') ?? '').trim(),
			image: imageUrl,
		}

		if (
			!eventData.label ||
			!eventData.startsAtInput ||
			!eventData.address ||
			!imageUrl
		) {
			return NextResponse.json(
				{
					error:
						'Missing required fields. Required: label, startsAt/date+time, address, image',
				},
				{ status: 400 },
			)
		}

		const event = await createEvent(eventData)
		return NextResponse.json({ ok: true, event })
	} catch (error) {
		console.error('Failed to create event', error)
		return NextResponse.json(
			{ error: (error as Error).message },
			{ status: 500 },
		)
	}
}
