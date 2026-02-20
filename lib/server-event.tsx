import 'server-only'
import { db } from '@/lib/db'
import {
	ensureEventsTable,
	getMostRecentPastEvent,
	getNearestUpcomingEvent,
	listTimelineEvents,
} from '@/lib/events'

export interface EventData {
	label: string
	date: string
	time?: string
	address: string
	image: string
	kassirUrl?: string
	mapsUrl?: string
	description?: string
	startsAt?: string
}

const EMPTY_EVENT_PLACEHOLDER: EventData = {
	label: 'Новый показ скоро',
	date: '',
	time: '',
	address: 'Следите за обновлениями',
	image: '/images/masks.png',
	kassirUrl: '',
	mapsUrl: '',
	description:
		'Ближайшие показы появятся после публикации нового мероприятия в админ-панели.',
}

type LegacyEventRow = {
	label: string
	date: string
	time: string | null
	address: string
	image: string
	kassir_url: string | null
	maps_url: string | null
	description: string | null
}

let legacyTableInitialized = false

async function ensureLegacyEventTable() {
	if (legacyTableInitialized) {
		return
	}

	await db.query(`
		CREATE TABLE IF NOT EXISTS next_event (
			id SMALLINT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
			label TEXT NOT NULL,
			date TEXT NOT NULL,
			time TEXT,
			address TEXT NOT NULL,
			image TEXT NOT NULL,
			kassir_url TEXT,
			maps_url TEXT,
			description TEXT,
			updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
		);
	`)

	legacyTableInitialized = true
}

function validateEvent(data: Partial<EventData>) {
	const required: (keyof EventData)[] = ['label', 'date', 'address', 'image']
	for (const key of required) {
		if (!data[key]) {
			throw new Error(`event data missing required field: ${key}`)
		}
	}
}

async function getLegacyEventFromDb(): Promise<EventData | null> {
	await ensureLegacyEventTable()

	const result = await db.query<LegacyEventRow>(
		`SELECT label, date, time, address, image, kassir_url, maps_url, description
		 FROM next_event
		 WHERE id = 1
		 LIMIT 1`,
	)

	const eventRow = result.rows[0]
	if (!eventRow) {
		return null
	}

	return {
		label: eventRow.label,
		date: eventRow.date,
		time: eventRow.time ?? '',
		address: eventRow.address,
		image: eventRow.image,
		kassirUrl: eventRow.kassir_url ?? '',
		mapsUrl: eventRow.maps_url ?? '',
		description: eventRow.description ?? '',
	}
}

export async function getServerEvent(): Promise<EventData> {
	try {
		await ensureEventsTable()
		const nearestUpcoming = await getNearestUpcomingEvent()
		if (nearestUpcoming) {
			return nearestUpcoming
		}

		const mostRecentPast = await getMostRecentPastEvent()
		if (mostRecentPast) {
			return mostRecentPast
		}
	} catch (error) {
		console.warn('Failed to read events from PostgreSQL table "events":', error)
	}

	try {
		const legacyEvent = await getLegacyEventFromDb()
		if (legacyEvent) {
			return legacyEvent
		}
	} catch (error) {
		console.warn(
			'Failed to read events from PostgreSQL legacy table "next_event":',
			error,
		)
	}

	return EMPTY_EVENT_PLACEHOLDER
}

export async function getServerTimelineEvents(limit = 24): Promise<EventData[]> {
	try {
		await ensureEventsTable()
		const events = await listTimelineEvents(limit)
		if (events.length > 0) {
			return events
		}
	} catch (error) {
		console.warn('Failed to read timeline events from PostgreSQL table "events":', error)
	}

	try {
		const legacyEvent = await getLegacyEventFromDb()
		if (legacyEvent) {
			return [legacyEvent]
		}
	} catch (error) {
		console.warn(
			'Failed to read timeline legacy event from PostgreSQL table "next_event":',
			error,
		)
	}

	return [EMPTY_EVENT_PLACEHOLDER]
}

export async function setServerEvent(data: EventData) {
	validateEvent(data)
	await ensureLegacyEventTable()

	await db.query(
		`INSERT INTO next_event (
			id, label, date, time, address, image, kassir_url, maps_url, description, updated_at
		)
		VALUES (1, $1, $2, $3, $4, $5, $6, $7, $8, NOW())
		ON CONFLICT (id) DO UPDATE
		SET
			label = EXCLUDED.label,
			date = EXCLUDED.date,
			time = EXCLUDED.time,
			address = EXCLUDED.address,
			image = EXCLUDED.image,
			kassir_url = EXCLUDED.kassir_url,
			maps_url = EXCLUDED.maps_url,
			description = EXCLUDED.description,
			updated_at = NOW()`,
		[
			data.label,
			data.date,
			data.time ?? '',
			data.address,
			data.image,
			data.kassirUrl ?? '',
			data.mapsUrl ?? '',
			data.description ?? '',
		],
	)
}
