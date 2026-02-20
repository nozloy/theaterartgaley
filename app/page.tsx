import type { Metadata } from 'next'
import { TheaterHomeClient } from '@/components/shared/theater-home-client'
import { SeoJsonLd } from '@/components/shared/seo-json-ld'
import { getServerEvent, getServerTimelineEvents } from '@/lib/server-event'
import { SITE_DESCRIPTION, SITE_NAME } from '@/modules/seo/config'

export const revalidate = 300

export const metadata: Metadata = {
	title: `${SITE_NAME} - Ближайшие спектакли`,
	description: SITE_DESCRIPTION,
	alternates: {
		canonical: '/',
	},
}

export default async function Home() {
	const [event, timelineEvents] = await Promise.all([
		getServerEvent(),
		getServerTimelineEvents(),
	])

	return (
		<>
			<SeoJsonLd event={event} />
			<TheaterHomeClient event={event} timelineEvents={timelineEvents} />
		</>
	)
}
