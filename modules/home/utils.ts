import type { EventData } from '@/lib/server-event'
import type { TimelineCard, TimelineStatus } from '@/modules/home/types'

const monthToShort: Record<string, string> = {
	января: 'ЯНВ',
	февраля: 'ФЕВ',
	марта: 'МАР',
	апреля: 'АПР',
	мая: 'МАЙ',
	июня: 'ИЮН',
	июля: 'ИЮЛ',
	августа: 'АВГ',
	сентября: 'СЕН',
	октября: 'ОКТ',
	ноября: 'НОЯ',
	декабря: 'ДЕК',
}

export function toShortDate(dateLabel: string) {
	const cleaned = dateLabel.toLowerCase().replace(/,/g, ' ').trim()
	if (!cleaned) {
		return 'СКОРО'
	}
	const [day, month] = cleaned.split(/\s+/)
	if (!day) {
		return 'СКОРО'
	}
	if (!month) {
		return day.toUpperCase()
	}
	const normalizedMonth = monthToShort[month] ?? month.slice(0, 3).toUpperCase()
	return `${day} ${normalizedMonth}`.toUpperCase()
}

export function splitTitle(label: string) {
	const words = label.trim().split(/\s+/).filter(Boolean)
	if (words.length === 0) {
		return ['Новый', 'показ', 'скоро'] as const
	}
	if (words.length <= 2) {
		return [label, '', ''] as const
	}
	return [words[0], words[1], words.slice(2).join(' ')] as const
}

export function getExternalProps(href: string) {
	if (href.startsWith('http://') || href.startsWith('https://')) {
		return { target: '_blank', rel: 'noreferrer' } as const
	}
	return {}
}

export function cutText(value: string, limit: number) {
	if (value.length <= limit) {
		return value
	}
	return `${value.slice(0, limit).trim()}...`
}

export function splitMemberName(name: string) {
	const [firstLine, ...rest] = name.trim().split(/\s+/).filter(Boolean)
	return {
		firstLine: firstLine || '',
		secondLine: rest.join(' '),
	}
}

export function parseEventTimestamp(event: EventData) {
	if (!event.startsAt) {
		return Number.NaN
	}
	const timestamp = Date.parse(event.startsAt)
	return Number.isFinite(timestamp) ? timestamp : Number.NaN
}

function getTimelineCity(address: string) {
	return /антал/i.test(address) ? 'Анталья' : 'Казань'
}

function mapEventToTimelineCard(event: EventData, index: number): TimelineCard {
	const startsAtTimestamp = parseEventTimestamp(event)
	const status: TimelineStatus =
		Number.isFinite(startsAtTimestamp) && startsAtTimestamp < Date.now()
			? 'past'
			: 'current'

	return {
		id: `${event.startsAt ?? event.date}-${event.label}-${index}`,
		status,
		date: toShortDate(event.date?.trim() || ''),
		city: getTimelineCity(event.address || ''),
		time: event.time?.trim() || '',
		title: event.label?.trim() || 'Новый показ скоро',
		image: event.image || '/images/masks.png',
		address: event.address?.trim() || '',
		href: event.kassirUrl?.trim() || undefined,
		startsAtTimestamp,
	}
}

function compareTimelineCardsDesc(a: TimelineCard, b: TimelineCard) {
	const aHasTimestamp = Number.isFinite(a.startsAtTimestamp)
	const bHasTimestamp = Number.isFinite(b.startsAtTimestamp)

	if (aHasTimestamp && bHasTimestamp) {
		return b.startsAtTimestamp - a.startsAtTimestamp
	}
	if (aHasTimestamp) {
		return -1
	}
	if (bHasTimestamp) {
		return 1
	}
	return 0
}

function buildEventKey(event: EventData) {
	return `${event.startsAt ?? ''}|${event.label}|${event.date}|${event.time ?? ''}|${event.address}`
}

export function buildTimelineCardsLatestFirst(
	event: EventData,
	timelineEvents: EventData[],
): TimelineCard[] {
	const sourceEvents = [event, ...timelineEvents]
	const uniqueEvents = sourceEvents.filter((candidate, index, array) => {
		const candidateKey = buildEventKey(candidate)
		return (
			array.findIndex((item) => buildEventKey(item) === candidateKey) === index
		)
	})

	const cards = uniqueEvents.map(mapEventToTimelineCard)
	const anchorTimestamp = parseEventTimestamp(event)
	const filteredCards = Number.isFinite(anchorTimestamp)
		? cards.filter(
				(card) =>
					!Number.isFinite(card.startsAtTimestamp) ||
					card.startsAtTimestamp <= anchorTimestamp,
		  )
		: cards
	const timelineSource = filteredCards.length > 0 ? filteredCards : cards
	const sorted = [...timelineSource].sort(compareTimelineCardsDesc)

	return sorted.map((card, index) => ({
		...card,
		highlight: index === 0,
		badge:
			index === 0
				? card.status === 'past'
					? 'Последний показ'
					: 'Ближайший показ'
				: card.status === 'past'
					? 'Архив'
					: undefined,
	}))
}

export function getInitialCityId(eventAddress: string) {
	return /антал/i.test(eventAddress) ? 'antalya' : 'kazan'
}
