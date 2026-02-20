'use client'

import { useLayoutEffect, useMemo, useRef } from 'react'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { teamMembers } from '@/constants/team-members'
import { Sheet } from '@/components/ui/sheet'
import type { EventData } from '@/lib/server-event'
import CookieConsent from '@/storage/CookieConsent'
import { founder } from '@/modules/home/content'
import {
	buildTimelineCardsLatestFirst,
	cutText,
	splitTitle,
} from '@/modules/home/utils'
import { TopNavigation } from '@/components/shared/home/top-navigation'
import { HeroSection } from '@/components/shared/home/hero-section'
import { AboutSection } from '@/components/shared/home/about-section'
import { CalendarSection } from '@/components/shared/home/calendar-section'
import { CitiesTeamSection } from '@/components/shared/home/cities-team-section'
import { FooterSection } from '@/components/shared/home/footer-section'
import { MenuSheetContent } from '@/components/shared/home/menu-sheet-content'

const manrope = Manrope({
	subsets: ['latin', 'cyrillic'],
	weight: ['300', '400', '500', '600', '700'],
	variable: '--font-manrope',
})

const cormorant = Cormorant_Garamond({
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500', '600', '700'],
	style: ['normal', 'italic'],
	variable: '--font-cormorant',
})

interface TheaterHomeClientProps {
	event: EventData
	timelineEvents: EventData[]
}

export function TheaterHomeClient({
	event,
	timelineEvents,
}: TheaterHomeClientProps) {
	const rootRef = useRef<HTMLElement>(null)

	const eventTitle = event.label?.trim() || 'Новый показ скоро'
	const eventDate = event.date?.trim() || ''
	const eventAddress = event.address?.trim() || 'Следите за обновлениями'
	const eventKassir = event.kassirUrl?.trim() || undefined
	const eventMap = event.mapsUrl?.trim() || undefined
	const eventTime = event.time?.trim() || 'Время уточняется'
	const eventSummary = cutText(
		(event.description || '')
			.replace(/\r?\n/g, ' ')
			.replace(/\s+/g, ' ')
			.trim() || 'Иммерсивный спектакль с живой атмосферой и камерной подачей.',
		140,
	)
	const [titleLineA, titleLineB, titleLineC] = splitTitle(eventTitle)
	const featuredMembers = teamMembers.slice(0, 6)

	const timelineCardsLatestFirst = useMemo(
		() => buildTimelineCardsLatestFirst(event, timelineEvents),
		[event, timelineEvents],
	)

	useLayoutEffect(() => {
		if (!rootRef.current) {
			return
		}

		gsap.registerPlugin(ScrollTrigger)

		const ctx = gsap.context(() => {
			gsap.from('.st-hero-kicker', {
				opacity: 0,
				y: 24,
				duration: 0.9,
				ease: 'power3.out',
			})

			gsap.from('.st-hero-line', {
				opacity: 0,
				y: 84,
				duration: 1.3,
				stagger: 0.16,
				ease: 'power4.out',
				delay: 0.12,
			})

			gsap.from('.st-hero-meta', {
				opacity: 0,
				y: 24,
				duration: 0.95,
				stagger: 0.12,
				ease: 'power3.out',
				delay: 0.45,
			})

			gsap.utils.toArray<HTMLElement>('.st-reveal').forEach((element) => {
				gsap.from(element, {
					scrollTrigger: {
						trigger: element,
						start: 'top 86%',
						toggleActions: 'play none none reverse',
					},
					opacity: 0,
					y: 34,
					filter: 'blur(4px)',
					duration: 1.05,
					ease: 'power3.out',
				})
			})

			gsap.utils.toArray<HTMLElement>('.st-scale').forEach((element) => {
				gsap.from(element, {
					scrollTrigger: {
						trigger: element,
						start: 'top 82%',
						toggleActions: 'play none none reverse',
					},
					opacity: 0,
					scale: 0.94,
					filter: 'blur(5px)',
					duration: 1.15,
					ease: 'expo.out',
				})
			})

			const timelineCards = gsap.utils.toArray<HTMLElement>('.st-timeline-card')
			if (timelineCards.length > 0) {
				gsap.from(timelineCards, {
					scrollTrigger: {
						trigger: '#calendar',
						start: 'top 74%',
					},
					opacity: 0,
					y: 30,
					duration: 0.85,
					stagger: 0.1,
					ease: 'power2.out',
				})
			}

			const timelineLine =
				rootRef.current?.querySelector<HTMLElement>('.st-timeline-line')
			if (timelineLine) {
				gsap.from(timelineLine, {
					scrollTrigger: {
						trigger: '#calendar',
						start: 'top 74%',
					},
					scaleX: 0,
					duration: 1.3,
					ease: 'power3.out',
				})
			}
		}, rootRef)

		return () => {
			ctx.revert()
		}
	}, [])

	return (
		<Sheet>
			<main
				ref={rootRef}
				className={`${manrope.variable} ${cormorant.variable} relative min-h-screen overflow-x-clip bg-[#030303] text-slate-200 [font-family:var(--font-manrope)]`}
			>
				<TopNavigation eventKassir={eventKassir} />
				<HeroSection
					eventImage={event.image}
					eventTitle={eventTitle}
					titleLineA={titleLineA}
					titleLineB={titleLineB}
					titleLineC={titleLineC}
					eventDate={eventDate}
					eventTime={eventTime}
					eventAddress={eventAddress}
					eventSummary={eventSummary}
					eventKassir={eventKassir}
					eventMap={eventMap}
				/>
				<AboutSection founder={founder} />
				<CalendarSection timelineCardsLatestFirst={timelineCardsLatestFirst} />
				<CitiesTeamSection
					eventAddress={eventAddress}
					featuredMembers={featuredMembers}
				/>
				<FooterSection />
				<MenuSheetContent eventKassir={eventKassir} />

				<div className='pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4'>
					<div className='pointer-events-auto w-full max-w-3xl'>
						<CookieConsent />
					</div>
				</div>
			</main>
		</Sheet>
	)
}
