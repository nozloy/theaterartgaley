import { NextResponse } from 'next/server'
import { getServerEvent, setServerEvent } from '@/lib/server-event'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { existsSync } from 'fs'

export async function GET() {
	const event = await getServerEvent()
	return NextResponse.json(event)
}

export async function POST(request: Request) {
	try {
		const formData = await request.formData()
		const password = String(formData.get('password'))

		console.log('POST /api/event received')

		if (password !== process.env.EVENT_ADMIN_TOKEN) {
			console.warn('Unauthorized attempt to edit event')
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		let imageUrl = String(formData.get('image') ?? '')
		const file = formData.get('file') as File | null

		if (file && file.size > 0) {
			console.log(
				`Processing upload: ${file.name}, size: ${file.size}, type: ${file.type}`,
			)
			const buffer = Buffer.from(await file.arrayBuffer())
			const filename = `${uuidv4()}${path.extname(file.name)}`
			const dataDir = path.join(process.cwd(), 'data')
			const filePath = path.join(dataDir, filename)

			if (!existsSync(dataDir)) {
				await mkdir(dataDir, { recursive: true })
			}

			await writeFile(filePath, buffer)
			console.log(`File saved successfully to ${filePath}`)
			imageUrl = `/api/images/${filename}`
		}

		const eventData = {
			label: String(formData.get('label')),
			date: String(formData.get('date')),
			time: String(formData.get('time') ?? ''),
			address: String(formData.get('address')),
			kassirUrl: String(formData.get('kassirUrl') ?? ''),
			mapsUrl: String(formData.get('mapsUrl') ?? ''),
			description: String(formData.get('description') ?? ''),
			image: imageUrl,
		}

		await setServerEvent(eventData)
		console.log('Event saved successfully')
		return NextResponse.json({ ok: true })
	} catch (error) {
		console.error('Failed to save event:', error)
		return NextResponse.json(
			{ error: (error as Error).message },
			{ status: 500 },
		)
	}
}
