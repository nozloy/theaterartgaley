import React from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { Calendar } from 'lucide-react'
interface Props {
	className?: string
}

export const Cinema: React.FC<Props> = ({ className }) => {
	return (
		<Sheet>
			<SheetTrigger>
				<div
					tabIndex={0}
					className={cn(
						'relative w-[160px] iphone:w-[180px]  select-none flex flex-col gap-2 items-center justify-center border border-border shadow-sm shadow-red-950 hover:shadow-red-600 hover:scale-105 duration-300 ease-in-out cursor-pointer rounded-[20px] bg-background active:shadow-red-600 active:scale-95',
						className,
					)}
				>
					<Image
						src='/images/image-good4.png'
						alt='ArtGaley'
						width={200}
						height={200}
						className='z-10 rounded-3xl  p-0'
					/>
					{/* <div className='z-30 absolute top-2 flex flex-row items-center justify-center gap-1'>
						<Label className='text-foreground font-bold text-md'>Наши </Label>

						<Label className='text-red-600 font-bold text-md'>достижения</Label>
					</div> */}
				</div>
			</SheetTrigger>
			<SheetContent className='w-full overflow-y-auto max-h-dvh'>
				<SheetHeader>
					<SheetTitle>Роли в фильмах</SheetTitle>
					<SheetDescription></SheetDescription>
					<div className=' flex flex-col gap-4 rounded-3xl items-start justify-start '>
						<div className='flex flex-row gap-1 items-center justify-start'>
							<Calendar size={16} />
							<p className='font-bold'>2024</p>
						</div>
						<div>
							Цвет граната (врач) — Художественный фильм, эпизод, режиссёр{' '}
							<p className='text-red-600'>Егор Баринов</p>
						</div>

						<p>
							Ледяные тени (начальник станции) — Художественный фильм, главная
							роль
						</p>

						<div>
							Капкан (офицер полиции) — 1й народный театр Анталии, режиссёр{' '}
							<p className='text-red-600'>Артур Галеев</p>
						</div>

						<div className='flex flex-row gap-1 items-center justify-start'>
							<Calendar size={16} />
							<p className='font-bold'>2023</p>
						</div>
						<div className='shadow-red-950 shadow-sm rounded-3xl p-2'>
							Министерство неджентельменских дел (офицер) — Эпизод, режиссёр{' '}
							<p className='text-red-600'>Гай Ричи</p>
						</div>

						<div>
							Ататюрк (офицер) — Художественный фильм, эпизод, режиссёр{' '}
							<p className='text-red-600'>Мехмет Ада Озтекин</p>
						</div>
						<div>
							Номер 13 (ревнивый муж Ронни) — 1й народный театр Анталии,
							режиссёр
							<p className='text-red-600'>Александр Галимов</p>
						</div>

						<div>
							Чем зацепить миллионера? (владелец паба) — 1й народный театр
							Анталии, режиссёр{' '}
							<p className='text-red-600'>Александр Галимов</p>
						</div>

						<p>Агентство недвижимости (Марк Антоний)</p>

						<div className='flex flex-row gap-1 items-center justify-start'>
							<Calendar size={16} />
							<p className='font-bold'>2022</p>
						</div>
						<p>МТС (отдыхающий)</p>

						<div className='flex flex-row gap-1 items-center justify-start'>
							<Calendar size={16} />
							<p className='font-bold'>2021</p>
						</div>
						<p>Барбершоп (отец)</p>
					</div>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	)
}
