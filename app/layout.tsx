/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import { ThemeProvider } from '@/components/theme-provider'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Театр АРТГалей – Современные спектакли в Анталии и Казани',
	description:
		'Театральная труппа АРТГалей: премьеры, гастроли, закулисье. Билеты онлайн. Актуальный репертуар и уникальные постановки в Анталии и Казани.',
	keywords: [
		'театр',
		'спектакли',
		'АРТГалей',
		'Анталия',
		'Казань',
		'купить билеты',
		'современный театр',
	],
	robots: 'index, follow',
	openGraph: {
		title: 'Театр АРТГалей – Современные спектакли в Анталии и Казани',
		description:
			'Погрузитесь в мир театра с АРТГалей. Узнайте о предстоящих спектаклях и приобретите билеты онлайн.',
		url: 'https://theaterartgaley.fun',
		siteName: 'АРТГалей',
		images: [
			{
				url: 'https://theaterartgaley.fun/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'Афиша спектакля АРТГалей',
			},
		],
		locale: 'ru_RU',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Театр АРТГалей – Современные спектакли в Анталии и Казани',
		description:
			'Откройте для себя уникальные постановки театра АРТГалей. Билеты доступны онлайн.',
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
	const yandexMetricaId = process.env.PUBLIC_YANDEX_METRICA?.trim()

	return (
		<html lang='ru' suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{yandexMetricaId ? (
					<>
						<Script
							id='yandex-metrika'
							strategy='afterInteractive'
							dangerouslySetInnerHTML={{
								__html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              ym(${JSON.stringify(yandexMetricaId)}, "init", {
                  clickmap:true,
                  trackLinks:true,
                  accurateTrackBounce:true,
                  webvisor:true
              });
            `,
							}}
						/>
						<noscript>
							<div>
								<img
									src={`https://mc.yandex.ru/watch/${yandexMetricaId}`}
									className='pointer-events-none'
									style={{ position: 'absolute', left: '-9999px' }}
									alt=''
								/>
							</div>
						</noscript>
					</>
				) : null}
				<ThemeProvider
					attribute='class'
					defaultTheme='dark'
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
