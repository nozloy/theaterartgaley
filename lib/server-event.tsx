import 'server-only'
import fs from 'fs/promises'
import path from 'path'
import { EventData } from './event'

const dataPath =
	process.env.EVENT_DATA_PATH ?? path.join(process.cwd(), 'data/event.json')

export async function getServerEvent(): Promise<EventData> {
	let raw: string
	try {
		raw = await fs.readFile(dataPath, 'utf-8')
	} catch {
		throw new Error(
			`event.json not found at ${dataPath}. Copy data/event.example.json → data/event.json or mount volume.`,
		)
	}

	let data: EventData
	try {
		data = JSON.parse(raw)
	} catch {
		throw new Error('event.json contains invalid JSON')
	}

	validateEvent(data)
	return data
}

function validateEvent(data: Partial<EventData>) {
	const required: (keyof EventData)[] = ['label', 'date', 'address', 'image']
	for (const key of required) {
		if (!data[key]) {
			throw new Error(`event.json missing required field: ${key}`)
		}
	}
}
