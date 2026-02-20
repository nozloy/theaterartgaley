import Image from 'next/image'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { getExternalProps } from '@/modules/home/utils'
import type { TimelineCard } from '@/modules/home/types'

type TimelineEventCardBodyProps = {
	card: TimelineCard
	highlighted: boolean
}

export function TimelineEventCardBody({
	card,
	highlighted,
}: TimelineEventCardBodyProps) {
	const isPast = card.status === 'past'
	const hasTicketLink = Boolean(card.href) && !isPast
	const ticketHref = hasTicketLink ? (card.href ?? '') : ''
	const metaBadge = isPast
		? 'Завершено'
		: hasTicketLink
			? 'Продажа открыта'
			: 'Скоро'
	const imageMetaLabel = `${card.city}${card.time ? ` • ${card.time}` : ''}`
	const imageTag = card.badge || metaBadge

	return (
		<div
			className={`flex h-full flex-col rounded-2xl border p-4 sm:p-5 ${
				highlighted
					? 'border-[#d4af37]/40 bg-[#141414] shadow-[0_18px_44px_-20px_rgba(0,0,0,0.85)]'
					: 'border-white/10 bg-[#111111] transition-colors duration-300 hover:border-[#d4af37]/35'
			}`}
		>
			<div
				className={`relative isolate mb-4 overflow-hidden rounded-xl border border-white/10 bg-black ${
					highlighted
						? 'aspect-[4/5] sm:aspect-[3/4]'
						: 'aspect-[3/4] sm:aspect-[5/6]'
				}`}
			>
				<Image
					src={card.image}
					alt={card.title}
					fill
					className={`pointer-events-none z-0 h-full w-full object-cover object-[50%_24%] transition-transform duration-700 ${
						highlighted
							? 'group-hover:scale-[1.02]'
							: 'grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0'
					}`}
				/>
				<div className='absolute inset-0 z-10 bg-gradient-to-t from-black/78 via-black/12 to-black/35' />
				<div className='absolute inset-x-3 bottom-3 z-20 flex items-center justify-between gap-2'>
					<span className='max-w-[58%] truncate whitespace-nowrap rounded-full border border-white/15 bg-black/60 px-2 py-1 text-[9px] uppercase tracking-[0.1em] text-[#d4af37] sm:max-w-none sm:px-2.5 sm:text-[10px] sm:tracking-[0.13em]'>
						{imageMetaLabel}
					</span>
					<span
						className={`shrink-0 whitespace-nowrap rounded-full px-2 py-1 text-[8px] uppercase tracking-[0.1em] sm:px-2.5 sm:text-[10px] sm:tracking-[0.13em] ${
							isPast
								? 'bg-slate-800/80 text-slate-300'
								: 'bg-black/65 text-white'
						}`}
					>
						{imageTag}
					</span>
				</div>
			</div>

			<h3
				className={`[font-family:var(--font-cormorant)] text-white [display:-webkit-box] overflow-hidden [-webkit-box-orient:vertical] ${
					highlighted
						? 'min-h-[5.5rem] text-3xl leading-tight [-webkit-line-clamp:3]'
						: 'min-h-[4.75rem] text-2xl leading-tight [-webkit-line-clamp:2]'
				}`}
			>
				{card.title}
			</h3>

			{card.address && (
				<p className='mt-3 flex items-start gap-1.5 text-xs text-slate-400'>
					<MapPin className='mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500' />
					<span className='[display:-webkit-box] overflow-hidden [-webkit-box-orient:vertical] [-webkit-line-clamp:1]'>
						{card.address}
					</span>
				</p>
			)}

			<div className='mt-auto border-t border-white/10 pt-4'>
				<div className='flex items-center justify-between gap-3'>
					<span className='[font-family:var(--font-cormorant)] text-lg italic text-white'>
						{card.price || (isPast ? 'Показ завершен' : 'Билеты онлайн')}
					</span>

					{isPast ? (
						<span className='rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-slate-500'>
							Завершено
						</span>
					) : hasTicketLink ? (
						<a
							href={ticketHref}
							{...getExternalProps(ticketHref)}
							aria-label={`Купить билет на ${card.title}`}
							className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] transition-colors ${
								highlighted
									? 'bg-[#d4af37] text-black hover:bg-[#e2c35b]'
									: 'border border-white/20 text-slate-200 hover:border-[#d4af37]/55 hover:text-[#d4af37]'
							}`}
						>
							Билет
							<ArrowUpRight className='h-3.5 w-3.5' />
						</a>
					) : (
						<span className='rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-slate-500'>
							Скоро
						</span>
					)}
				</div>
			</div>
		</div>
	)
}
