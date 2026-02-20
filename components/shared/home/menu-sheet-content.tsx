import { ArrowUpRight } from 'lucide-react'
import {
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet'
import { getExternalProps } from '@/modules/home/utils'

type MenuSheetContentProps = {
	eventKassir?: string
}

export function MenuSheetContent({ eventKassir }: MenuSheetContentProps) {
	return (
		<SheetContent
			side='right'
			className='w-[92vw] border-white/10 bg-[#090909] text-slate-200 sm:max-w-md'
		>
			<SheetHeader>
				<SheetTitle className='[font-family:var(--font-cormorant)] text-3xl uppercase tracking-[0.16em] text-white'>
					АРТГалей
				</SheetTitle>
				<SheetDescription className='text-slate-400'>
					Иммерсивные спектакли в Анталье и Казани.
				</SheetDescription>
			</SheetHeader>

			<nav className='mt-8 grid gap-3'>
				<SheetClose asChild>
					<a
						href='#hero'
						className='rounded-lg border border-white/10 px-4 py-3 text-sm uppercase tracking-[0.14em] text-slate-200 transition-colors hover:border-[#d4af37] hover:text-[#d4af37]'
					>
						Главная
					</a>
				</SheetClose>
				<SheetClose asChild>
					<a
						href='#about'
						className='rounded-lg border border-white/10 px-4 py-3 text-sm uppercase tracking-[0.14em] text-slate-200 transition-colors hover:border-[#d4af37] hover:text-[#d4af37]'
					>
						Манифест
					</a>
				</SheetClose>
				<SheetClose asChild>
					<a
						href='#calendar'
						className='rounded-lg border border-white/10 px-4 py-3 text-sm uppercase tracking-[0.14em] text-slate-200 transition-colors hover:border-[#d4af37] hover:text-[#d4af37]'
					>
						Афиша
					</a>
				</SheetClose>
				<SheetClose asChild>
					<a
						href='#cities'
						className='rounded-lg border border-white/10 px-4 py-3 text-sm uppercase tracking-[0.14em] text-slate-200 transition-colors hover:border-[#d4af37] hover:text-[#d4af37]'
					>
						Города
					</a>
				</SheetClose>
				<SheetClose asChild>
					<a
						href='#faces'
						className='rounded-lg border border-white/10 px-4 py-3 text-sm uppercase tracking-[0.14em] text-slate-200 transition-colors hover:border-[#d4af37] hover:text-[#d4af37]'
					>
						Труппа
					</a>
				</SheetClose>
				<SheetClose asChild>
					<a
						href='#contact'
						className='rounded-lg border border-white/10 px-4 py-3 text-sm uppercase tracking-[0.14em] text-slate-200 transition-colors hover:border-[#d4af37] hover:text-[#d4af37]'
					>
						Контакты
					</a>
				</SheetClose>
			</nav>

			<div className='mt-6 grid gap-3'>
				{eventKassir ? (
					<SheetClose asChild>
						<a
							href={eventKassir}
							{...getExternalProps(eventKassir)}
							className='inline-flex items-center justify-center gap-2 rounded-lg bg-[#d4af37] px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-black transition-colors hover:bg-[#e6c459]'
						>
							Купить билет
							<ArrowUpRight className='h-4 w-4' />
						</a>
					</SheetClose>
				) : null}

				<SheetClose asChild>
					<a
						href='https://t.me/artgaley'
						{...getExternalProps('https://t.me/artgaley')}
						className='inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-3 text-sm uppercase tracking-[0.14em] text-slate-200 transition-colors hover:border-[#d4af37] hover:text-[#d4af37]'
					>
						Написать в Telegram
					</a>
				</SheetClose>
			</div>
		</SheetContent>
	)
}
