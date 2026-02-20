import Image from 'next/image'
import { FounderProfileCard } from '@/components/shared/home/founder-profile-card'
import type { FounderProfile } from '@/modules/home/types'

type AboutSectionProps = {
	founder: FounderProfile
}

export function AboutSection({ founder }: AboutSectionProps) {
	return (
		<section id='about' className='bg-[#030303] py-24 lg:py-32'>
			<div className='mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:gap-24 lg:pl-16 lg:pr-28'>
				<div className='st-scale relative order-2 hidden lg:order-1 lg:block'>
					<div className='relative aspect-[4/5] overflow-hidden border border-white/10'>
						<Image
							src='/images/afisha.png'
							alt='Афиша спектакля АРТГалей'
							fill
							className='pointer-events-none h-full w-full object-cover grayscale transition duration-700 hover:grayscale-0'
						/>
					</div>
					<div className='absolute -bottom-8 -right-8 h-36 w-36 rounded-full bg-[#d4af37]/10 blur-3xl' />
				</div>

				<div className='order-1 lg:order-2'>
					<span className='st-reveal mb-7 block text-xs uppercase tracking-[0.38em] text-[#d4af37]'>
						Манифест
					</span>
					<h2 className='st-reveal [font-family:var(--font-cormorant)] text-4xl leading-tight text-white md:text-5xl lg:text-6xl'>
						Искусство, которое
						<br />
						<span className='italic font-light text-slate-400'>касается души</span>
					</h2>
					<div className='st-reveal mt-8 h-px w-20 bg-[#d4af37]' />
					<p className='st-reveal mt-8 text-lg font-light leading-relaxed text-slate-300'>
						В АРТГалей нет сцены и зрительного зала. Вы не наблюдатель, а
						соучастник. Мы создаем пространство, где стирается четвертая стена и
						чувства обостряются до предела.
					</p>
					<p className='st-reveal mt-5 text-lg font-light leading-relaxed text-slate-300'>
						Каждая постановка дышит вместе со зрителем: живой звук, тактильные
						детали, близкая дистанция и личный диалог между артистом и залом.
					</p>
				</div>
			</div>

			<div className='mx-auto mt-20 w-full max-w-[1400px] px-6 lg:pl-16 lg:pr-28'>
				<FounderProfileCard founder={founder} />
			</div>
		</section>
	)
}
