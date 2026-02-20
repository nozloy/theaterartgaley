export const SITE_NAME = 'Театр АРТГалей'
export const SITE_DESCRIPTION =
	'Театральная труппа АРТГалей: премьеры, гастроли, закулисье. Билеты онлайн. Актуальный репертуар и уникальные постановки в Анталье и Казани.'

export const SITE_URL =
	process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://theaterartgaley.fun'

export const SITE_KEYWORDS = [
	'театр',
	'спектакли',
	'АРТГалей',
	'Анталья',
	'Казань',
	'купить билеты',
	'современный театр',
]

export const SOCIAL_LINKS = {
	telegram: 'https://t.me/artgaley',
	reviews: 'https://t.me/artgaleyto',
}

export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/afisha.png`
