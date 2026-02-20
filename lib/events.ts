import { randomUUID } from 'crypto'
import { db } from '@/lib/db'
import type { EventData } from '@/lib/server-event'

export type DashboardEvent = {
	id: string
	label: string
	startsAt: string
	date: string
	time: string
	address: string
	image: string
	kassirUrl: string
	mapsUrl: string
	description: string
	createdAt: string
	updatedAt: string
}

type EventRow = {
	id: string
	label: string
	starts_at: string
	address: string
	image: string
	kassir_url: string | null
	maps_url: string | null
	description: string | null
	created_at: string
	updated_at: string
}

const MOSCOW_TIME_ZONE = 'Europe/Moscow'
const MOSCOW_UTC_OFFSET_HOURS = 3

let eventsTableInitialized = false

export async function ensureEventsTable() {
	if (eventsTableInitialized) {
		return
	}

	await db.query(`
		CREATE TABLE IF NOT EXISTS events (
			id TEXT PRIMARY KEY,
			label TEXT NOT NULL,
			starts_at TIMESTAMPTZ NOT NULL,
			address TEXT NOT NULL,
			image TEXT NOT NULL,
			kassir_url TEXT,
			maps_url TEXT,
			description TEXT,
			created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
			updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
		);
	`)

	await db.query(
		'CREATE INDEX IF NOT EXISTS events_starts_at_idx ON events (starts_at);',
	)

	eventsTableInitialized = true
}

export function parseMoscowDateTimeInput(input: string): Date | null {
	const value = input.trim()
	const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(value)
	if (!match) {
		return null
	}

	const year = Number(match[1])
	const month = Number(match[2])
	const day = Number(match[3])
	const hour = Number(match[4])
	const minute = Number(match[5])

	if (
		!Number.isFinite(year) ||
		!Number.isFinite(month) ||
		!Number.isFinite(day) ||
		!Number.isFinite(hour) ||
		!Number.isFinite(minute)
	) {
		return null
	}

	if (month < 1 || month > 12 || day < 1 || day > 31 || hour > 23 || minute > 59) {
		return null
	}

	// Moscow time is UTC+3 year-round.
	const utcTimestamp = Date.UTC(
		year,
		month - 1,
		day,
		hour - MOSCOW_UTC_OFFSET_HOURS,
		minute,
	)
	const parsed = new Date(utcTimestamp)
	if (Number.isNaN(parsed.getTime())) {
		return null
	}
	return parsed
}

function formatMoscowDate(dateIso: string) {
	return new Intl.DateTimeFormat('ru-RU', {
		day: 'numeric',
		month: 'long',
		timeZone: MOSCOW_TIME_ZONE,
	}).format(new Date(dateIso))
}

function formatMoscowTime(dateIso: string) {
	return new Intl.DateTimeFormat('ru-RU', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
		timeZone: MOSCOW_TIME_ZONE,
	}).format(new Date(dateIso))
}

function mapRowToDashboardEvent(row: EventRow): DashboardEvent {
	return {
		id: row.id,
		label: row.label,
		startsAt: row.starts_at,
		date: formatMoscowDate(row.starts_at),
		time: formatMoscowTime(row.starts_at),
		address: row.address,
		image: row.image,
		kassirUrl: row.kassir_url ?? '',
		mapsUrl: row.maps_url ?? '',
		description: row.description ?? '',
		createdAt: row.created_at,
		updatedAt: row.updated_at,
	}
}

function mapRowToEventData(row: EventRow): EventData {
	return {
		label: row.label,
		date: formatMoscowDate(row.starts_at),
		time: formatMoscowTime(row.starts_at),
		address: row.address,
		image: row.image,
		kassirUrl: row.kassir_url ?? '',
		mapsUrl: row.maps_url ?? '',
		description: row.description ?? '',
		startsAt: row.starts_at,
	}
}

export async function getNearestUpcomingEvent(): Promise<EventData | null> {
	await ensureEventsTable()

	const result = await db.query<EventRow>(
		`SELECT
			id, label, starts_at, address, image, kassir_url, maps_url, description, created_at, updated_at
		 FROM events
		 WHERE starts_at >= NOW()
		 ORDER BY starts_at ASC
		 LIMIT 1`,
	)

	const eventRow = result.rows[0]
	if (!eventRow) {
		return null
	}

	return mapRowToEventData(eventRow)
}

export async function getMostRecentPastEvent(): Promise<EventData | null> {
	await ensureEventsTable()

	const result = await db.query<EventRow>(
		`SELECT
			id, label, starts_at, address, image, kassir_url, maps_url, description, created_at, updated_at
		 FROM events
		 WHERE starts_at < NOW()
		 ORDER BY starts_at DESC
		 LIMIT 1`,
	)

	const eventRow = result.rows[0]
	if (!eventRow) {
		return null
	}

	return mapRowToEventData(eventRow)
}

export async function listTimelineEvents(limit = 24): Promise<EventData[]> {
	await ensureEventsTable()

	const safeLimit = Number.isFinite(limit)
		? Math.min(Math.max(Math.trunc(limit), 1), 60)
		: 24

	const result = await db.query<EventRow>(
		`SELECT
			id, label, starts_at, address, image, kassir_url, maps_url, description, created_at, updated_at
		 FROM events
		 ORDER BY starts_at DESC
		 LIMIT $1`,
		[safeLimit],
	)

	return result.rows.map(mapRowToEventData)
}

export async function listEventsForAdmin(): Promise<DashboardEvent[]> {
	await ensureEventsTable()

	const result = await db.query<EventRow>(
		`SELECT
			id, label, starts_at, address, image, kassir_url, maps_url, description, created_at, updated_at
		 FROM events`,
	)

	const mapped = result.rows.map(mapRowToDashboardEvent)
	const now = Date.now()
	const upcoming = mapped
		.filter((event) => new Date(event.startsAt).getTime() >= now)
		.sort(
			(a, b) =>
				new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
		)
	const past = mapped
		.filter((event) => new Date(event.startsAt).getTime() < now)
		.sort(
			(a, b) =>
				new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime(),
		)

	return [...upcoming, ...past]
}

type CreateEventInput = {
	label: string
	startsAtInput: string
	address: string
	image: string
	kassirUrl?: string
	mapsUrl?: string
	description?: string
}

type UpdateEventInput = CreateEventInput & {
	id: string
}

export async function createEvent(input: CreateEventInput): Promise<DashboardEvent> {
	await ensureEventsTable()

	const startsAt = parseMoscowDateTimeInput(input.startsAtInput)
	if (!startsAt) {
		throw new Error(
			'Неверная дата или время. Используйте формат времени для Москвы (UTC+3).',
		)
	}

	const label = input.label.trim()
	const address = input.address.trim()
	const image = input.image.trim()

	if (!label || !address || !image) {
		throw new Error('Заполните обязательные поля: название, дата/время, адрес, изображение.')
	}

	const id = randomUUID()

	const inserted = await db.query<EventRow>(
		`INSERT INTO events (
			id, label, starts_at, address, image, kassir_url, maps_url, description, created_at, updated_at
		)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
		RETURNING
			id, label, starts_at, address, image, kassir_url, maps_url, description, created_at, updated_at`,
		[
			id,
			label,
			startsAt.toISOString(),
			address,
			image,
			input.kassirUrl?.trim() ?? '',
			input.mapsUrl?.trim() ?? '',
			input.description?.trim() ?? '',
		],
	)

	return mapRowToDashboardEvent(inserted.rows[0])
}

export async function updateEvent(input: UpdateEventInput): Promise<DashboardEvent> {
	await ensureEventsTable()

	const id = input.id.trim()
	if (!id) {
		throw new Error('Не передан идентификатор мероприятия.')
	}

	const startsAt = parseMoscowDateTimeInput(input.startsAtInput)
	if (!startsAt) {
		throw new Error(
			'Неверная дата или время. Используйте формат времени для Москвы (UTC+3).',
		)
	}

	const label = input.label.trim()
	const address = input.address.trim()
	const image = input.image.trim()

	if (!label || !address || !image) {
		throw new Error('Заполните обязательные поля: название, дата/время, адрес, изображение.')
	}

	const updated = await db.query<EventRow>(
		`UPDATE events
		 SET
			label = $2,
			starts_at = $3,
			address = $4,
			image = $5,
			kassir_url = $6,
			maps_url = $7,
			description = $8,
			updated_at = NOW()
		 WHERE id = $1
		 RETURNING
			id, label, starts_at, address, image, kassir_url, maps_url, description, created_at, updated_at`,
		[
			id,
			label,
			startsAt.toISOString(),
			address,
			image,
			input.kassirUrl?.trim() ?? '',
			input.mapsUrl?.trim() ?? '',
			input.description?.trim() ?? '',
		],
	)

	const row = updated.rows[0]
	if (!row) {
		throw new Error('Мероприятие не найдено.')
	}

	return mapRowToDashboardEvent(row)
}
