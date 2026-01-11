import { EditEvent } from '@/components/shared/edit-event'
import { EventData, getServerEvent } from '@/lib/server-event'

export default async function Event() {
	const currentEvent: EventData = await getServerEvent()
	return (
		<div>
			<EditEvent data={currentEvent} />
		</div>
	)
}
