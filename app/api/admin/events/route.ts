import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createEvent, listEventsForAdmin, updateEvent } from '@/lib/events'
import { uploadImageToS3 } from '@/lib/s3'

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

export async function GET(request: Request) {
	try {
		const access = await getAdminSession(request)
		if ('error' in access) {
			return NextResponse.json({ error: access.error }, { status: access.status })
		}

		const events = await listEventsForAdmin()
		return NextResponse.json({ events })
	} catch (error) {
		console.error('Failed to load events', error)
		return NextResponse.json(
			{ error: (error as Error).message },
			{ status: 500 },
		)
	}
}

export async function POST(request: Request) {
	try {
		const access = await getAdminSession(request)
		if ('error' in access) {
			return NextResponse.json({ error: access.error }, { status: access.status })
		}

		const formData = await request.formData()
		const file = formData.get('file')
		let image = String(formData.get('image') ?? '').trim()

		if (file instanceof File && file.size > 0) {
			image = await uploadImageToS3(file, 'events')
		}

		const event = await createEvent({
			label: String(formData.get('label') ?? ''),
			startsAtInput: String(formData.get('startsAt') ?? ''),
			address: String(formData.get('address') ?? ''),
			image,
			kassirUrl: String(formData.get('kassirUrl') ?? ''),
			mapsUrl: String(formData.get('mapsUrl') ?? ''),
			description: String(formData.get('description') ?? ''),
		})

		return NextResponse.json({ ok: true, event })
	} catch (error) {
		console.error('Failed to create event', error)
		return NextResponse.json(
			{ error: (error as Error).message },
			{ status: 400 },
		)
	}
}

export async function PATCH(request: Request) {
	try {
		const access = await getAdminSession(request)
		if ('error' in access) {
			return NextResponse.json({ error: access.error }, { status: access.status })
		}

		const formData = await request.formData()
		const file = formData.get('file')
		let image = String(formData.get('image') ?? '').trim()

		if (file instanceof File && file.size > 0) {
			image = await uploadImageToS3(file, 'events')
		}

		const id = String(formData.get('id') ?? '').trim()
		const label = String(formData.get('label') ?? '').trim()
		const startsAtInput = String(formData.get('startsAt') ?? '').trim()
		const address = String(formData.get('address') ?? '').trim()

		if (!id || !label || !startsAtInput || !address || !image) {
			return NextResponse.json(
				{
					error:
						'Missing required fields. Required: id, label, startsAt, address, image',
				},
				{ status: 400 },
			)
		}

		const event = await updateEvent({
			id,
			label,
			startsAtInput,
			address,
			image,
			kassirUrl: String(formData.get('kassirUrl') ?? ''),
			mapsUrl: String(formData.get('mapsUrl') ?? ''),
			description: String(formData.get('description') ?? ''),
		})

		return NextResponse.json({ ok: true, event })
	} catch (error) {
		console.error('Failed to update event', error)
		return NextResponse.json(
			{ error: (error as Error).message },
			{ status: 400 },
		)
	}
}
