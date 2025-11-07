import React from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Label } from '../ui/label'

interface Props {
	className?: string
	changeModalTrap: () => void
}

export const NextShow: React.FC<Props> = ({ className, changeModalTrap }) => {
	return (
		<div
			onClick={() => changeModalTrap()}
			className={cn(
				'group w-full relative select-none flex flex-row gap-4 items-start justify-between bg-white/10 backdrop-blur-md rounded-3xl p-2 cursor-pointer',
				className,
			)}
		>
			<div className='relative w-[160px] iphone:w-[180px]  select-none flex flex-col gap-2 items-center justify-center  '>
				<Image
					src='/images/afisha.png'
					alt='poster'
					loading='eager'
					width={200}
					height={240}
					className='z-10 brightness-150 rounded-3xl object-cover drop-shadow-lg'
				/>
			</div>

			<div className='w-[180px] *:select-none flex flex-col pt-1 gap-2 iphone:gap-4 items-start justify-start text-foreground text-xl font-bold '>
				<div className='flex items-center justify-center w-[120px] text-lg px-2 py-1 mb-1 rounded-xl bg-red-600 text-foreground font-bold'>
					20 ноября
				</div>

				<Label className='select-none text-xl text-foreground group-hover:underline duration-300 ease-in-out'>
					Ловушка для одинокого мужчины
				</Label>
				<Label className='text-red-600 *:tracking-tight *:font-base *:text-base flex flex-col gap-1'>
					<p className='drop-shadow-lg'>Иммерсивный спектакль</p>
				</Label>
				<Label className='text-foreground/70 *:tracking-tight *:font-base *:text-[13.5px] flex flex-col gap-1'>
					<p>Питейный дом 100Dal</p>
					<p>ул.Пушкина, 23, Казань</p>
				</Label>
			</div>
		</div>
	)
}
