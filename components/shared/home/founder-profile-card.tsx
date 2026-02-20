import Image from 'next/image'
import { MousePointerClick } from 'lucide-react'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { FounderProfile } from '@/modules/home/types'

type FounderProfileCardProps = {
	founder: FounderProfile
}

export function FounderProfileCard({ founder }: FounderProfileCardProps) {
	return (
		<article className='st-reveal rounded-3xl border border-white/10 bg-gradient-to-br from-[#111111] via-[#0d0d0d] to-[#090909] p-5 md:p-7 lg:p-8'>
			<div className='grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-8'>
				<Drawer>
					<DrawerTrigger asChild>
						<button
							type='button'
							className='overflow-hidden rounded-2xl border border-white/10 bg-black/45 text-left lg:hidden'
							aria-label={`Открыть информацию: ${founder.name}`}
						>
							<div className='relative aspect-[3/4]'>
								<Image
									src='/images/subject.png'
									alt={founder.name}
									fill
									className='pointer-events-none object-cover object-top'
								/>
								<div className='absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent' />
								<div className='pointer-events-none absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-slate-300 shadow-[0_8px_20px_-12px_rgba(0,0,0,0.9)]'>
									<MousePointerClick className='h-5 w-5' />
								</div>
							</div>
							<div className='flex items-center justify-center border-t border-white/10 px-4 py-3 text-[11px] tracking-[0.12em] text-slate-200'>
								<span>{founder.name}</span>
							</div>
						</button>
					</DrawerTrigger>
					<DrawerContent className='border-white/10 bg-[#090909] text-slate-200'>
						<div className='mx-auto w-full max-w-2xl'>
							<DrawerHeader className='border-b border-white/10 text-left'>
								<DrawerDescription className='text-[11px] uppercase tracking-[0.18em] text-[#d4af37]'>
									Основатель АРТГалей
								</DrawerDescription>
								<DrawerTitle className='[font-family:var(--font-cormorant)] text-4xl text-white'>
									{founder.name}
								</DrawerTitle>
							</DrawerHeader>
							<ScrollArea className='h-[72vh]'>
								<div className='space-y-5 p-5'>
									<p className='text-sm leading-relaxed text-slate-300 sm:text-base'>
										{founder.bio}
									</p>
									<section className='rounded-2xl border border-white/10 bg-black/25 p-5'>
										<p className='mb-3 text-xs uppercase tracking-[0.16em] text-slate-400'>
											Актёрское портфолио
										</p>
										<ul className='list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-300 marker:text-[#d4af37]'>
											{founder.actingPortfolio.map((item) => (
												<li key={item}>{item}</li>
											))}
										</ul>
									</section>
									<section className='rounded-2xl border border-white/10 bg-black/25 p-5'>
										<p className='mb-3 text-xs uppercase tracking-[0.16em] text-slate-400'>
											Продюсерская деятельность
										</p>
										<ul className='list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-300 marker:text-[#d4af37]'>
											{founder.producingPortfolio.map((item) => (
												<li key={item}>{item}</li>
											))}
										</ul>
									</section>
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

				<figure className='hidden overflow-hidden rounded-2xl border border-white/10 bg-black/45 lg:block'>
					<div className='relative aspect-[3/4]'>
						<Image
							src='/images/subject.png'
							alt={founder.name}
							fill
							className='pointer-events-none object-cover object-top'
						/>
						<div className='absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent' />
					</div>
				</figure>

				<div className='hidden space-y-5 lg:block'>
					<header className='rounded-2xl border border-white/10 bg-black/25 p-5 md:p-6'>
						<p className='text-xs uppercase tracking-[0.18em] text-[#d4af37]'>
							Основатель
						</p>
						<h3 className='mt-2 [font-family:var(--font-cormorant)] text-3xl text-white md:text-4xl'>
							{founder.name}
						</h3>
						<p className='mt-4 text-base leading-relaxed text-slate-300'>
							{founder.bio}
						</p>
					</header>

					<div className='grid gap-4 xl:grid-cols-2'>
						<section className='rounded-2xl border border-white/10 bg-black/25 p-5'>
							<p className='mb-3 text-xs uppercase tracking-[0.16em] text-slate-400'>
								Актёрское портфолио
							</p>
							<ul className='list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-300 marker:text-[#d4af37]'>
								{founder.actingPortfolio.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
						</section>

						<section className='rounded-2xl border border-white/10 bg-black/25 p-5'>
							<p className='mb-3 text-xs uppercase tracking-[0.16em] text-slate-400'>
								Продюсерская деятельность
							</p>
							<ul className='list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-300 marker:text-[#d4af37]'>
								{founder.producingPortfolio.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
						</section>
					</div>
				</div>
			</div>
		</article>
	)
}
