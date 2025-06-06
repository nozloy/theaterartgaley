import React from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Label } from '../ui/label'
import { CircleArrowRight } from 'lucide-react'

interface Props {
	className?: string
	changeModalTrap: () => void
}

export const NextShow: React.FC<Props> = ({ className, changeModalTrap }) => {
	return (
		<div
			onClick={() => changeModalTrap()}
			className={cn(
				'group w-full relative pt-6 select-none flex flex-row gap-4 items-start justify-between bg-background cursor-pointer',
				className,
			)}
		>
			<div className='min-h-[270px] w-[160px] iphone:w-[180px] border border-border shadow-sm shadow-red-950 group-hover:shadow-red-600 rounded-3xl ease-in-out group-active:shadow-red-600 '>
				<Image
					src='/images/afisha.png'
					alt='poster'
					loading='eager'
					width={200}
					height={240}
					className='z-10 brightness-150 rounded-3xl '
				/>
			</div>

			<div className='w-[180px] *:select-none flex flex-col pt-4 gap-4 items-start justify-start text-foreground text-xl font-bold '>
				<div className='flex items-center justify-center w-[100px] text-lg px-2 py-1 rounded-xl bg-red-600 text-foreground font-bold'>
					23 июня
				</div>
				<Label className='select-none text-2xl text-foreground group-hover:underline duration-300 ease-in-out'>
					Ловушка для одинокого мужчины
				</Label>
				<Label className='text-foreground/70 *:tracking-tight *:font-base *:text-[13.5px] flex flex-col gap-1'>
					<p>Сбор гостей: 19:30</p>
					<p>Питейный дом 100Dal</p>
				</Label>
				<CircleArrowRight size={24} />
			</div>
		</div>
	)
}
