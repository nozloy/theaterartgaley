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
			<div className='relative w-[160px] iphone:w-[180px]  select-none flex flex-col gap-2 items-center justify-center border border-border shadow-sm shadow-red-950 hover:shadow-red-600 hover:scale-105 duration-300 ease-in-out cursor-pointer rounded-[20px] bg-background active:shadow-red-600 active:scale-95'>
				<Image
					src='/images/afisha.png'
					alt='poster'
					loading='eager'
					width={200}
					height={240}
					className='z-10 brightness-150 rounded-3xl object-contain'
				/>
			</div>

			<div className='w-[180px] *:select-none flex flex-col pt-1 gap-2 iphone:gap-4 items-start justify-start text-foreground text-xl font-bold '>
				<div className='flex items-center justify-center w-[100px] text-lg px-2 py-1 mb-1 rounded-xl bg-red-600 text-foreground font-bold'>
					23 июня
				</div>
				<Label className='text-red-600 *:tracking-tight *:font-base *:text-[13.5px] flex flex-col gap-1'>
					<p>Иммерсивный спектакль</p>
				</Label>

				<Label className='select-none text-xl text-foreground group-hover:underline duration-300 ease-in-out'>
					Ловушка для одинокого мужчины
				</Label>
				<div className='flex flex-col gap-1'>
					<Image
						src='/1.svg'
						alt='Adress1'
						width={140}
						height={20}
						className='  '
					/>
					<Image
						src='/2.svg'
						alt='Adress1'
						width={140}
						height={20}
						className='  '
					/>
				</div>
				{/* <Label className='text-foreground/70 *:tracking-tight *:font-base *:text-[13.5px] flex flex-col gap-1'>
					<p>Сбор гостей: 19:30</p>
					<p>Питейный дом 100Dal</p>
				</Label> */}
				<CircleArrowRight size={24} />
			</div>
		</div>
	)
}
