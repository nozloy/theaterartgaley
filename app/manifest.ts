import type { MetadataRoute } from 'next'
import { SITE_DESCRIPTION, SITE_NAME } from '@/modules/seo/config'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: SITE_NAME,
		short_name: 'АРТГалей',
		description: SITE_DESCRIPTION,
		start_url: '/',
		display: 'standalone',
		background_color: '#050505',
		theme_color: '#0b0b0b',
		lang: 'ru',
		icons: [
			{
				src: '/favicon.ico',
				sizes: 'any',
				type: 'image/x-icon',
			},
		],
	}
}
