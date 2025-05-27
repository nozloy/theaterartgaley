import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Театр ArtGaley – Современные спектакли в Анталии и Казани',
	description:
		'Театральная труппа ArtGaley: премьеры, гастроли, закулисье. Билеты онлайн. Актуальный репертуар и уникальные постановки в Анталии и Казани.',
	keywords: [
		'театр',
		'спектакли',
		'ArtGaley',
		'Анталия',
		'Казань',
		'купить билеты',
		'современный театр',
	],
	robots: 'index, follow',
	openGraph: {
		title: 'Театр ArtGaley – Современные спектакли в Анталии и Казани',
		description:
			'Погрузитесь в мир театра с ArtGaley. Узнайте о предстоящих спектаклях и приобретите билеты онлайн.',
		url: 'https://theaterartgaley.fun',
		siteName: 'ArtGaley',
		images: [
			{
				url: 'https://theaterartgaley.fun/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'Афиша спектакля ArtGaley',
			},
		],
		locale: 'ru_RU',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Театр ArtGaley – Современные спектакли в Анталии и Казани',
		description:
			'Откройте для себя уникальные постановки театра ArtGaley. Билеты доступны онлайн.',
		creator: '@artgaley',
		images: ['https://theaterartgaley.fun/og-image.jpg'],
	},
	alternates: {
		canonical: 'https://theaterartgaley.fun',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru' className='dark'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	)
}
