import Link from 'next/link'
import { MessageCircle, Phone } from 'lucide-react'
import { Telegram } from '@/components/shared/icons/telegram'
import { getExternalProps } from '@/modules/home/utils'
import type { ContactLink } from '@/modules/home/types'

const contactLinks: ContactLink[] = [
	{
		label: 'Telegram',
		href: 'https://t.me/artgaley',
		icon: Telegram,
	},
	{
		label: 'Отзывы',
		href: 'https://t.me/artgaleyto',
		icon: MessageCircle,
	},
	{
		label: 'Позвонить',
		href: 'tel:+79656071642',
		icon: Phone,
	},
]

export function FooterSection() {
	return (
		<footer id='contact' className='border-t border-white/5 bg-black py-24'>
			<div className='mx-auto w-full max-w-[1400px] px-6 lg:pl-16 lg:pr-28'>
				<div className='grid grid-cols-1 gap-14 md:grid-cols-2'>
					<div>
						<span className='st-reveal mb-8 block [font-family:var(--font-cormorant)] text-3xl uppercase tracking-[0.18em] text-white'>
							АРТГалей
						</span>
						<div className='st-reveal flex max-w-sm flex-col gap-5'>
							<a
								href='mailto:info@theaterartgaley.fun'
								className='text-2xl font-light text-slate-400 transition-all hover:pl-2 hover:text-white'
							>
								info@theaterartgaley.fun
							</a>
							<a
								href='tel:+79656071642'
								className='text-2xl font-light text-slate-400 transition-all hover:pl-2 hover:text-white'
							>
								+7 (965) 607-16-42
							</a>
						</div>
						<div className='st-reveal mt-10 flex gap-4'>
							{contactLinks.map((contact) => (
								<a
									key={contact.label}
									href={contact.href}
									{...getExternalProps(contact.href)}
									className='flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-all hover:border-[#d4af37] hover:text-[#d4af37]'
									aria-label={contact.label}
								>
									<contact.icon className='h-4 w-4' />
								</a>
							))}
						</div>
					</div>

					<div className='flex flex-col justify-between'>
						<div className='mb-12 grid grid-cols-2 gap-8'>
							<div className='st-reveal flex flex-col gap-4'>
								<a
									href='#about'
									className='text-[10px] uppercase tracking-[0.18em] text-slate-500 transition-colors hover:text-[#d4af37]'
								>
									О театре
								</a>
								<a
									href='#calendar'
									className='text-[10px] uppercase tracking-[0.18em] text-slate-500 transition-colors hover:text-[#d4af37]'
								>
									Афиша
								</a>
								<a
									href='#cities'
									className='text-[10px] uppercase tracking-[0.18em] text-slate-500 transition-colors hover:text-[#d4af37]'
								>
									Города
								</a>
							</div>
							<div className='st-reveal flex flex-col gap-4'>
								<a
									href='https://vk.com/artgaley'
									{...getExternalProps('https://vk.com/artgaley')}
									className='text-[10px] uppercase tracking-[0.18em] text-slate-500 transition-colors hover:text-[#d4af37]'
								>
									Сообщество VK
								</a>
								<Link
									href='/privacy'
									className='text-[10px] uppercase tracking-[0.18em] text-slate-500 transition-colors hover:text-[#d4af37]'
								>
									Политика
								</Link>
							</div>
						</div>
					</div>
				</div>

				<div className='mt-14 border-t border-white/10 pt-6 text-xs leading-relaxed text-slate-500'>
					<p>ИП Галеев Артур Радикович</p>
					<p>ИНН 027410843056</p>
					<p>© 2023-{new Date().getFullYear()} АРТГалей. Все права защищены.</p>
					<p className='mt-1'>Сайт использует cookie и Яндекс.Метрику.</p>
				</div>
			</div>
		</footer>
	)
}
