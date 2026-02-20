import Link from 'next/link'
import { Menu, Ticket } from 'lucide-react'
import { SheetTrigger } from '@/components/ui/sheet'
import { getExternalProps } from '@/modules/home/utils'

type TopNavigationProps = {
	eventKassir?: string
}

export function TopNavigation({ eventKassir }: TopNavigationProps) {
	return (
		<>
			<Link
				href='/'
				className='fixed left-6 top-5 z-50 hidden [font-family:var(--font-cormorant)] text-2xl uppercase tracking-[0.18em] text-white lg:block'
			>
				АРТГалей
			</Link>

			<aside className='fixed right-0 top-0 z-50 hidden h-full w-20 flex-col items-center justify-between border-l border-white/10 bg-black/45 py-8 backdrop-blur-xl lg:flex'>
				<SheetTrigger asChild>
					<button
						type='button'
						className='p-2 text-white transition-colors duration-300 hover:text-[#d4af37]'
						aria-label='Открыть меню'
					>
						<Menu className='h-7 w-7' />
					</button>
				</SheetTrigger>
				<div className='my-8 flex h-full items-center'>
					<div className='relative h-full w-px bg-white/15'>
						<div className='absolute left-1/2 top-0 h-14 w-px -translate-x-1/2 bg-[#d4af37]' />
					</div>
				</div>
				<a
					href={eventKassir || '#calendar'}
					{...(eventKassir ? getExternalProps(eventKassir) : {})}
					className='group relative flex items-center justify-center'
				>
					<span className='pointer-events-none absolute right-full mr-5 whitespace-nowrap bg-[#d4af37] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
						Купить билет
					</span>
					<span className='flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af37]/40 text-[#d4af37] shadow-[0_0_24px_rgba(212,175,55,0.18)] transition-all duration-300 group-hover:bg-[#d4af37] group-hover:text-black'>
						<Ticket className='h-5 w-5' />
					</span>
				</a>
			</aside>

			<header className='fixed left-0 top-0 z-40 w-full border-b border-white/5 bg-black/70 backdrop-blur-md lg:hidden'>
				<div className='mx-auto flex h-20 w-full max-w-[1400px] items-center justify-between px-6'>
					<span className='[font-family:var(--font-cormorant)] text-2xl uppercase tracking-[0.18em] text-white'>
						АРТГалей
					</span>
					<SheetTrigger asChild>
						<button type='button' className='p-2 text-white' aria-label='Открыть меню'>
							<Menu className='h-6 w-6' />
						</button>
					</SheetTrigger>
				</div>
			</header>
		</>
	)
}
