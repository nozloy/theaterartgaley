import { useEffect, useMemo, useRef, useState } from 'react'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { TimelineEventCardBody } from '@/components/shared/home/timeline-event-card-body'
import type { TimelineCard } from '@/modules/home/types'

type CalendarSectionProps = {
	timelineCardsLatestFirst: TimelineCard[]
}

export function CalendarSection({ timelineCardsLatestFirst }: CalendarSectionProps) {
	const desktopTimelineRef = useRef<HTMLDivElement>(null)
	const [desktopCardLimit, setDesktopCardLimit] = useState(3)

	const desktopTimelineCards = useMemo(() => {
		const selected = timelineCardsLatestFirst.slice(0, desktopCardLimit)
		return [...selected].reverse()
	}, [desktopCardLimit, timelineCardsLatestFirst])

	const mobileTimelineCards = useMemo(
		() => timelineCardsLatestFirst.slice(0, 5),
		[timelineCardsLatestFirst],
	)

	useEffect(() => {
		const target = desktopTimelineRef.current
		if (!target) {
			return
		}

		const updateDesktopCardLimit = () => {
			const containerWidth = target.clientWidth
			if (!containerWidth) {
				return
			}
			const cardWidth = 316
			const gap = 28
			const visibleCards = Math.max(
				1,
				Math.floor((containerWidth + gap) / (cardWidth + gap)),
			)
			setDesktopCardLimit(visibleCards)
		}

		updateDesktopCardLimit()

		if (typeof ResizeObserver === 'undefined') {
			window.addEventListener('resize', updateDesktopCardLimit)
			return () => {
				window.removeEventListener('resize', updateDesktopCardLimit)
			}
		}

		const observer = new ResizeObserver(updateDesktopCardLimit)
		observer.observe(target)
		window.addEventListener('resize', updateDesktopCardLimit)

		return () => {
			observer.disconnect()
			window.removeEventListener('resize', updateDesktopCardLimit)
		}
	}, [])

	return (
		<section
			id='calendar'
			className='relative overflow-hidden border-t border-white/5 bg-[#080808] py-24'
		>
			<div className='mx-auto mb-14 w-full max-w-[1400px] px-6 lg:pl-16 lg:pr-28'>
				<h2 className='st-reveal [font-family:var(--font-cormorant)] text-4xl text-white md:text-6xl'>
					Афиша событий
				</h2>
			</div>

			<div
				ref={desktopTimelineRef}
				className='mx-auto hidden w-full max-w-[1400px] px-6 pb-10 lg:block lg:pl-16 lg:pr-28'
			>
				<div className='relative flex items-start gap-7 pt-12'>
					<div className='st-timeline-line absolute left-0 top-[40px] h-px w-full origin-left bg-gradient-to-r from-transparent via-white/20 to-transparent' />

					{desktopTimelineCards.map((card) => {
						const isPrimary = Boolean(card.highlight)

						return (
							<article
								key={card.id}
								className={`st-timeline-card group relative z-10 ${
									isPrimary ? 'w-[360px]' : 'w-[296px]'
								}`}
							>
								<div className='relative mb-7 flex flex-col items-center'>
									<div
										className={`rounded-full border-2 transition-colors ${
											isPrimary
												? 'h-4 w-4 border-[#d4af37] bg-[#d4af37] shadow-[0_0_18px_rgba(212,175,55,0.45)]'
												: 'h-3 w-3 border-slate-600 bg-[#080808] group-hover:border-[#d4af37]'
										}`}
									/>
									<span
										className={`absolute -top-8 tracking-[0.2em] ${
											isPrimary
												? 'text-xs font-bold text-[#d4af37]'
												: 'text-[10px] font-medium text-slate-500'
										}`}
									>
										{card.date}
									</span>
								</div>

								<TimelineEventCardBody card={card} highlighted={isPrimary} />
							</article>
						)
					})}
				</div>
			</div>

			<div className='mx-auto w-full max-w-[1400px] px-6 lg:hidden'>
				<Carousel
					opts={{
						align: 'start',
						containScroll: 'trimSnaps',
					}}
					className='st-reveal'
				>
					<CarouselContent>
						{mobileTimelineCards.map((card) => {
							const isPrimary = Boolean(card.highlight)

							return (
								<CarouselItem key={`mobile-${card.id}`} className='basis-[88%]'>
									<article className='st-timeline-card group relative z-10'>
										<div className='mb-3 flex items-center justify-between border-b border-white/10 pb-3'>
											<span className='whitespace-nowrap text-[10px] uppercase tracking-[0.18em] text-[#d4af37] sm:text-[11px] sm:tracking-[0.2em]'>
												{card.date}
											</span>
											<div
												className={`rounded-full border-2 ${
													isPrimary
														? 'h-3.5 w-3.5 border-[#d4af37] bg-[#d4af37] shadow-[0_0_14px_rgba(212,175,55,0.45)]'
														: 'h-3 w-3 border-slate-600 bg-[#080808]'
												}`}
											/>
										</div>
										<TimelineEventCardBody card={card} highlighted={isPrimary} />
									</article>
								</CarouselItem>
							)
						})}
					</CarouselContent>
				</Carousel>
			</div>
		</section>
	)
}
