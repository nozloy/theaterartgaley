import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { gsap } from 'gsap'
import { teamMembers } from '@/constants/team-members'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cityStories } from '@/modules/home/content'
import { getInitialCityId, splitMemberName } from '@/modules/home/utils'
import type { TeamMember } from '@/types/team'

type CitiesTeamSectionProps = {
	eventAddress: string
	featuredMembers: TeamMember[]
}

export function CitiesTeamSection({
	eventAddress,
	featuredMembers,
}: CitiesTeamSectionProps) {
	const [activeCityId, setActiveCityId] = useState<string>(
		getInitialCityId(eventAddress),
	)
	const cityStoryRef = useRef<HTMLDivElement>(null)

	const activeCityStory = useMemo(
		() => cityStories.find((city) => city.id === activeCityId) ?? cityStories[0],
		[activeCityId],
	)

	useEffect(() => {
		if (!cityStoryRef.current) {
			return
		}
		gsap.killTweensOf(cityStoryRef.current)
		gsap.fromTo(
			cityStoryRef.current,
			{ autoAlpha: 0, y: 16 },
			{
				autoAlpha: 1,
				y: 0,
				duration: 0.5,
				ease: 'power2.out',
				clearProps: 'opacity,visibility,transform',
			},
		)
	}, [activeCityId])

	return (
		<section id='cities' className='bg-[#030303] py-24'>
			<div className='mx-auto w-full max-w-[1400px] px-6 lg:pl-16 lg:pr-28'>
				<div className='grid grid-cols-1 border border-white/10 lg:hidden'>
					{cityStories.map((city, index) => (
						<Drawer key={`city-mobile-${city.id}`}>
							<DrawerTrigger asChild>
								<button
									type='button'
									className={`st-scale group relative block h-[320px] overflow-hidden sm:h-[380px] ${
										index === 0 ? 'border-b border-white/10' : ''
									}`}
									aria-label={`Открыть информацию о городе ${city.city}`}
								>
									<Image
										src={city.image}
										alt={city.city}
										fill
										className='pointer-events-none object-cover opacity-45 transition duration-700 group-hover:scale-105 group-hover:opacity-65'
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent' />
									<div className='relative z-10 flex h-full flex-col justify-end p-6 sm:p-8'>
										<h3 className='[font-family:var(--font-cormorant)] text-4xl text-white sm:text-5xl'>
											{city.city.toUpperCase()}
										</h3>
										<p className='mt-2 text-xs uppercase tracking-[0.18em] text-[#d4af37]'>
											{city.since}
										</p>
										<div className='mt-4 flex items-center gap-1 text-xs uppercase tracking-[0.18em] text-slate-300'>
											Подробнее
											<ArrowUpRight className='h-3.5 w-3.5' />
										</div>
									</div>
								</button>
							</DrawerTrigger>
							<DrawerContent className='border-white/10 bg-[#090909] text-slate-200'>
								<div className='mx-auto w-full max-w-2xl'>
									<DrawerHeader className='border-b border-white/10 text-left'>
										<DrawerDescription className='text-[11px] uppercase tracking-[0.18em] text-[#d4af37]'>
											{city.since}
										</DrawerDescription>
										<DrawerTitle className='[font-family:var(--font-cormorant)] text-4xl text-white'>
											{city.city}
										</DrawerTitle>
									</DrawerHeader>
									<ScrollArea className='h-[72vh]'>
										<div className='space-y-5 p-5'>
											<div className='relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-black/40'>
												<Image
													src={city.image}
													alt={city.city}
													fill
													className='pointer-events-none object-cover'
												/>
											</div>
											<p className='text-sm leading-relaxed text-slate-300'>
												{city.description}
											</p>
											<p className='text-sm leading-relaxed text-slate-300'>
												{city.fullText}
											</p>
										</div>
									</ScrollArea>
									<div className='border-t border-white/10 p-4'>
										<DrawerClose asChild>
											<button
												type='button'
												className='w-full rounded-full border border-white/15 px-4 py-3 text-[11px] uppercase tracking-[0.16em] text-slate-200 transition-colors hover:border-[#d4af37]/60 hover:text-white'
											>
												Закрыть
											</button>
										</DrawerClose>
									</div>
								</div>
							</DrawerContent>
						</Drawer>
					))}
				</div>

				<div className='hidden grid-cols-1 border border-white/10 lg:grid lg:grid-cols-2'>
					{cityStories.map((city, index) => (
						<button
							key={city.id}
							type='button'
							onClick={() => setActiveCityId(city.id)}
							aria-pressed={activeCityId === city.id}
							className={`st-scale group relative block h-[460px] overflow-hidden ${
								index === 0 ? 'border-r border-white/10' : ''
							} ${
								activeCityId === city.id
									? 'ring-1 ring-inset ring-[#d4af37]/65'
									: ''
							}`}
						>
							<Image
								src={city.image}
								alt={city.city}
								fill
								className='pointer-events-none object-cover opacity-45 transition duration-1000 group-hover:scale-110 group-hover:opacity-70'
							/>
							<div className='absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent' />
							<div className='relative z-10 flex h-full flex-col justify-end p-10'>
								<h3 className='st-reveal [font-family:var(--font-cormorant)] text-6xl text-white'>
									{city.city.toUpperCase()}
								</h3>
								<p className='mt-2 text-xs uppercase tracking-[0.18em] text-[#d4af37]'>
									{city.since}
								</p>
								<div className='mt-4 h-px w-0 bg-[#d4af37] transition-all duration-500 group-hover:w-24' />
								<p className='mt-4 max-w-sm translate-y-3 text-sm font-light leading-relaxed text-slate-300 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100'>
									{city.description}
								</p>
								<span className='mt-4 inline-flex items-center gap-1 text-xs uppercase tracking-[0.18em] text-slate-300'>
									Подробнее
									<ArrowUpRight className='h-3.5 w-3.5' />
								</span>
							</div>
						</button>
					))}
				</div>

				<div className='mt-6 hidden rounded-2xl border border-white/10 bg-[#0d0d0d] p-5 sm:p-6 lg:block'>
					<div ref={cityStoryRef}>
						<div className='flex flex-wrap items-baseline gap-3'>
							<h3 className='[font-family:var(--font-cormorant)] text-3xl text-white sm:text-4xl'>
								{activeCityStory.city}
							</h3>
							<span className='text-xs uppercase tracking-[0.18em] text-[#d4af37]'>
								{activeCityStory.since}
							</span>
						</div>
						<p className='mt-4 text-sm leading-relaxed text-slate-300'>
							{activeCityStory.description}
						</p>
						<p className='mt-4 text-sm leading-relaxed text-slate-300'>
							{activeCityStory.fullText}
						</p>
					</div>
				</div>

				<section id='faces' className='mt-20'>
					<div className='mb-10 flex flex-wrap items-end justify-between gap-4'>
						<div>
							<h2 className='st-reveal [font-family:var(--font-cormorant)] text-4xl text-white'>
								Лица театра
							</h2>
							<p className='st-reveal mt-2 text-[10px] uppercase tracking-[0.2em] text-slate-500'>
								{featuredMembers.length} артистов на сцене прямо сейчас
							</p>
						</div>
						<div className='hidden lg:block'>
							<Sheet>
								<SheetTrigger asChild>
									<button
										type='button'
										className='st-reveal inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-slate-300 transition-colors hover:border-[#d4af37]/50 hover:text-white'
									>
										Достижения
										<ArrowUpRight className='h-3.5 w-3.5' />
									</button>
								</SheetTrigger>
								<SheetContent
									side='right'
									className='w-[92vw] overflow-y-auto border-white/10 bg-[#090909] text-slate-200 sm:max-w-2xl'
								>
									<SheetHeader>
										<SheetTitle className='[font-family:var(--font-cormorant)] text-3xl text-white'>
											Труппа АРТГалей
										</SheetTitle>
										<SheetDescription className='text-slate-400'>
											{teamMembers.length} артистов и участников проекта.
										</SheetDescription>
									</SheetHeader>
									<div className='mt-7 grid gap-4 sm:grid-cols-2'>
										{teamMembers.map((member) => {
											const { firstLine, secondLine } = splitMemberName(member.name)
											return (
												<article
													key={member.id}
													className='rounded-xl border border-white/10 bg-[#111111] p-4'
												>
													<div className='flex items-start gap-3'>
														<div className='relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-white/10'>
															<Image
																src={member.avatar ?? '/images/subject.png'}
																alt={member.name}
																fill
																className='pointer-events-none object-cover'
															/>
														</div>
														<div className='min-w-0'>
															<h3 className='[font-family:var(--font-cormorant)] text-2xl leading-none text-white'>
																<span className='block'>{firstLine}</span>
																<span className='block'>{secondLine || '\u00A0'}</span>
															</h3>
															<p className='mt-2 text-xs uppercase tracking-[0.16em] text-[#d4af37]'>
																{member.roles.join(' • ')}
															</p>
														</div>
													</div>
													<p className='mt-3 text-sm leading-relaxed text-slate-400'>
														{member.experience.slice(0, 2).join(' · ') ||
															'Опыт не указан'}
													</p>
												</article>
											)
										})}
									</div>
								</SheetContent>
							</Sheet>
						</div>
					</div>

					<div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6'>
						{featuredMembers.map((member) => (
							<Fragment key={member.id}>
								<Drawer>
									<DrawerTrigger asChild>
										<button
											type='button'
											className='st-face-card group relative overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0d] text-left transition-all duration-300 lg:hidden'
											aria-label={`Открыть информацию об актере ${member.name}`}
										>
											<div className='relative aspect-[4/5] overflow-hidden'>
												<Image
													src={member.avatar ?? '/images/subject.png'}
													alt={member.name}
													fill
													className='pointer-events-none object-cover object-center grayscale transition duration-500'
												/>
												<div className='pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 via-black/20 to-transparent' />
											</div>
											<div className='p-3'>
												<p className='[font-family:var(--font-cormorant)] text-xl leading-none text-white'>
													{member.name}
												</p>
											</div>
										</button>
									</DrawerTrigger>
									<DrawerContent className='border-white/10 bg-[#090909] text-slate-200'>
										<div className='mx-auto w-full max-w-2xl'>
											<DrawerHeader className='border-b border-white/10 text-left'>
												<DrawerDescription className='text-[11px] uppercase tracking-[0.18em] text-[#d4af37]'>
													{member.roles.join(' • ') || 'Труппа АРТГалей'}
												</DrawerDescription>
												<DrawerTitle className='[font-family:var(--font-cormorant)] text-4xl text-white'>
													{member.name}
												</DrawerTitle>
											</DrawerHeader>
											<ScrollArea className='h-[72vh]'>
												<div className='space-y-5 p-5'>
													<div className='relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-black/40 sm:aspect-[16/10]'>
														<Image
															src={member.avatar ?? '/images/subject.png'}
															alt={member.name}
															fill
															className='pointer-events-none object-cover object-top'
														/>
													</div>
													<p className='text-xs uppercase tracking-[0.16em] text-slate-400'>
														{member.roles.join(' • ') || 'Участник проекта'}
													</p>
													{member.experience.length > 0 ? (
														<ul className='list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-300 marker:text-[#d4af37]'>
															{member.experience.map((item) => (
																<li key={item}>{item}</li>
															))}
														</ul>
													) : (
														<p className='text-sm leading-relaxed text-slate-300'>
															Опыт не указан.
														</p>
													)}
												</div>
											</ScrollArea>
											<div className='border-t border-white/10 p-4'>
												<DrawerClose asChild>
													<button
														type='button'
														className='w-full rounded-full border border-white/15 px-4 py-3 text-[11px] uppercase tracking-[0.16em] text-slate-200 transition-colors hover:border-[#d4af37]/60 hover:text-white'
													>
														Закрыть
													</button>
												</DrawerClose>
											</div>
										</div>
									</DrawerContent>
								</Drawer>

								<article className='st-face-card group relative hidden overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0d] transition-all duration-300 hover:-translate-y-1 hover:border-[#d4af37]/45 hover:shadow-[0_16px_36px_-20px_rgba(0,0,0,0.9)] lg:block'>
									<div className='relative aspect-[4/5] overflow-hidden'>
										<Image
											src={member.avatar ?? '/images/subject.png'}
											alt={member.name}
											fill
											className='pointer-events-none object-cover object-center grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0'
										/>
										<div className='pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 via-black/20 to-transparent' />
									</div>
									<div className='p-3'>
										<p className='[font-family:var(--font-cormorant)] text-xl leading-none text-white'>
											{member.name}
										</p>
									</div>
								</article>
							</Fragment>
						))}
					</div>
				</section>
			</div>
		</section>
	)
}
