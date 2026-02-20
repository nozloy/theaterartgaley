import { SITE_DESCRIPTION, SITE_URL } from '@/modules/seo/config'

export function GET() {
	const body = [
		'# Театр АРТГалей',
		`> ${SITE_DESCRIPTION}`,
		'',
		'## About',
		'- Театральные постановки и гастроли в Анталье и Казани.',
		'- Актуальные события и ссылки на покупку билетов на главной странице.',
		'',
		'## Canonical URLs',
		`- ${SITE_URL}/`,
		`- ${SITE_URL}/privacy`,
	].join('\n')

	return new Response(body, {
		headers: {
			'content-type': 'text/plain; charset=utf-8',
			'cache-control': 'public, s-maxage=86400, stale-while-revalidate=604800',
		},
	})
}
