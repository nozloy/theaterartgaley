import { TheaterHomeClient } from '@/components/shared/theater-home-client'
import { getServerEvent, getServerTimelineEvents } from '@/lib/server-event'

export const dynamic = 'force-dynamic'

export default async function Home() {
	const [event, timelineEvents] = await Promise.all([
		getServerEvent(),
		getServerTimelineEvents(),
	])

	return <TheaterHomeClient event={event} timelineEvents={timelineEvents} />
}
