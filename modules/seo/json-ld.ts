import type { EventData } from '@/lib/server-event'
import {
	SITE_DESCRIPTION,
	SITE_NAME,
	SITE_URL,
	SOCIAL_LINKS,
	DEFAULT_OG_IMAGE,
} from '@/modules/seo/config'

function toEventDateTime(startsAt?: string) {
	if (!startsAt) {
		return undefined
	}

	const parsed = Date.parse(startsAt)
	if (!Number.isFinite(parsed)) {
		return undefined
	}

	return new Date(parsed).toISOString()
}

function inferLocationName(address?: string) {
	if (!address) {
		return 'Театр АРТГалей'
	}
	if (/антал/i.test(address)) {
		return 'Анталья'
	}
	if (/казан/i.test(address)) {
		return 'Казань'
	}
	return address
}

export function getOrganizationJsonLd() {
	return {
		'@context': 'https://schema.org',
		'@type': 'TheaterGroup',
		name: SITE_NAME,
		description: SITE_DESCRIPTION,
		url: SITE_URL,
		logo: `${SITE_URL}/images/b/logo_light.png`,
		sameAs: [SOCIAL_LINKS.telegram, SOCIAL_LINKS.reviews],
		areaServed: ['RU', 'TR'],
	}
}

export function getWebsiteJsonLd() {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: SITE_NAME,
		url: SITE_URL,
		description: SITE_DESCRIPTION,
		inLanguage: 'ru',
	}
}

export function getEventJsonLd(event: EventData) {
	const startDate = toEventDateTime(event.startsAt)

	return {
		'@context': 'https://schema.org',
		'@type': 'Event',
		name: event.label,
		description: event.description || SITE_DESCRIPTION,
		image: [event.image || DEFAULT_OG_IMAGE],
		startDate,
		eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
		eventStatus: 'https://schema.org/EventScheduled',
		location: {
			'@type': 'Place',
			name: inferLocationName(event.address),
			address: event.address,
		},
		organizer: {
			'@type': 'Organization',
			name: SITE_NAME,
			url: SITE_URL,
		},
		offers: event.kassirUrl
			? {
					'@type': 'Offer',
					url: event.kassirUrl,
					availability: 'https://schema.org/InStock',
					priceCurrency: 'RUB',
			  }
			: undefined,
	}
}
