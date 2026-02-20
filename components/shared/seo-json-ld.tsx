import { getEventJsonLd, getOrganizationJsonLd, getWebsiteJsonLd } from '@/modules/seo/json-ld'
import type { EventData } from '@/lib/server-event'

type SeoJsonLdProps = {
	event: EventData
}

export function SeoJsonLd({ event }: SeoJsonLdProps) {
	const payload = [getOrganizationJsonLd(), getWebsiteJsonLd(), getEventJsonLd(event)]

	return (
		<script
			type='application/ld+json'
			dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
		/>
	)
}
