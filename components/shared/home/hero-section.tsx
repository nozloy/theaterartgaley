import Image from 'next/image'
import { ArrowUpRight, CalendarDays, MapPin } from 'lucide-react'
import { getExternalProps } from '@/modules/home/utils'

type HeroSectionProps = {
	eventImage: string
	eventTitle: string
	titleLineA: string
	titleLineB: string
	titleLineC: string
	eventDate: string
	eventTime: string
	eventAddress: string
	eventSummary: string
	eventKassir?: string
	eventMap?: string
}

export function HeroSection({
	eventImage,
	eventTitle,
	titleLineA,
	titleLineB,
	titleLineC,
	eventDate,
	eventTime,
	eventAddress,
	eventSummary,
	eventKassir,
	eventMap,
}: HeroSectionProps) {
	return (
		<section
			id='hero'
			className='relative flex min-h-screen items-end overflow-hidden pt-24 lg:pt-0'
		>
			<div className='absolute inset-0 bg-black'>
				<Image
					src={eventImage}
					alt=''
					aria-hidden
					fill
					priority
					className='pointer-events-none h-full w-full scale-105 object-cover object-center opacity-32 blur-[2px]'
				/>
				<Image
					src={eventImage}
					alt={eventTitle}
					fill
					priority
					className='pointer-events-none h-full w-full object-contain object-center opacity-85 lg:object-[78%_center]'
				/>
				<div className='absolute inset-0 bg-gradient-to-r from-[#030303]/88 via-[#030303]/52 to-[#030303]/18' />
				<div className='absolute inset-0 bg-gradient-to-t from-[#030303]/72 via-[#030303]/12 to-transparent' />
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_75%_45%,rgba(212,175,55,0.12),transparent_42%)]' />
			</div>

			<div className='relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-12 px-6 pb-16 lg:grid-cols-12 lg:gap-8 lg:pl-16 lg:pr-28 lg:pb-20'>
				<div className='lg:col-span-8'>
					<p className='st-hero-kicker mb-6 pl-1 text-xs uppercase tracking-[0.38em] text-[#d4af37]'>
						Премьера сезона
					</p>
					<h1 className='[font-family:var(--font-cormorant)] text-[3.2rem] leading-[0.9] text-white sm:text-[4.4rem] md:text-[5.4rem] lg:text-[6.6rem] xl:text-[7.4rem]'>
						{titleLineA && <span className='st-hero-line block'>{titleLineA}</span>}
						{titleLineB && (
							<span className='st-hero-line block pl-8 italic font-light text-slate-300 sm:pl-14'>
								{titleLineB}
							</span>
						)}
						{titleLineC && <span className='st-hero-line block'>{titleLineC}</span>}
					</h1>

					<div className='mt-9 grid gap-7 text-sm md:grid-cols-2 md:gap-10'>
						<div className='st-hero-meta'>
							<p className='mb-2 text-[11px] font-medium uppercase tracking-[0.24em] text-slate-300'>
								Когда
							</p>
							<p className='flex items-center gap-2.5 text-lg leading-snug text-white [font-family:var(--font-cormorant)] sm:text-xl'>
								<CalendarDays className='h-4 w-4 shrink-0 text-[#d4af37]' />
								<span className='min-w-0'>
									{eventDate ? `${eventDate}, ${eventTime}` : eventTime}
								</span>
							</p>
						</div>
						<div className='st-hero-meta'>
							<p className='mb-2 text-[11px] font-medium uppercase tracking-[0.24em] text-slate-300'>
								Где
							</p>
							<p className='flex items-start gap-2.5 text-lg leading-snug text-white [font-family:var(--font-cormorant)] sm:text-xl'>
								<MapPin className='mt-1 h-4 w-4 shrink-0 text-[#d4af37]' />
								<span className='min-w-0 break-words'>{eventAddress}</span>
							</p>
						</div>
					</div>
				</div>

				<div className='st-hero-meta flex flex-col justify-end pb-2 lg:col-span-4 lg:items-end'>
					<p className='max-w-xs text-sm font-light leading-relaxed text-slate-300 lg:text-right'>
						{eventSummary}
					</p>
					<div className='mt-10 flex flex-wrap items-center gap-6'>
						<a
							href={eventKassir || '#calendar'}
							{...(eventKassir ? getExternalProps(eventKassir) : {})}
							className='inline-flex items-center gap-4 text-xs uppercase tracking-[0.22em] text-white transition-colors hover:text-[#d4af37]'
						>
							Купить билет
							<span className='h-px w-10 bg-white transition-colors hover:bg-[#d4af37]' />
						</a>
						{eventMap && (
							<a
								href={eventMap}
								{...getExternalProps(eventMap)}
								className='inline-flex items-center gap-1 text-xs uppercase tracking-[0.22em] text-slate-400 transition-colors hover:text-white'
							>
								Локация
								<ArrowUpRight className='h-3.5 w-3.5' />
							</a>
						)}
					</div>
				</div>
			</div>

			<div className='pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 opacity-55 md:flex'>
				<span className='text-[9px] uppercase tracking-[0.26em] text-white'>
					Листай
				</span>
				<div className='h-10 w-px bg-gradient-to-b from-white to-transparent' />
			</div>
		</section>
	)
}
