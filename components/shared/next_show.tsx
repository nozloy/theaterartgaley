import React from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Label } from '../ui/label'

interface Props {
	className?: string
	changeModalTrap: () => void
}

export const NextShow: React.FC<Props> = ({ className, changeModalTrap }) => {
	const label = process.env.NEXT_PUBLIC_LABEL || ''
	const date = process.env.NEXT_PUBLIC_DATE || ''
	const adress = process.env.NEXT_PUBLIC_ADRESS || ''
	// const time = process.env.NEXT_PUBLIC_TIME || ''

	const image = process.env.NEXT_PUBLIC_IMAGE_URL || '/images/afisha.png'
	return (
		<div
			onClick={() => changeModalTrap()}
			className={cn(
				'group w-full h-[280px] relative select-none flex flex-row gap-2 items-start justify-between bg-white/10 backdrop-blur-md rounded-3xl p-2 cursor-pointer',
				className,
			)}
		>
			<div className='relative w-[160px] iphone:w-[180px] h-full select-none flex flex-col gap-2 items-center justify-center  '>
				<Image
					src={image}
					alt='poster'
					loading='eager'
					width={200}
					height={240}
					className='z-10 brightness-150 rounded-3xl object-cover drop-shadow-lg'
				/>
			</div>

			<div className='w-[200px] h-full *:select-none flex flex-col pt-1 gap-2 iphone:gap-4 items-start justify-start text-foreground text-xl font-bold '>
				<div className='flex items-center justify-center w-[120px] text-lg px-2 py-1 mb-1 rounded-xl bg-red-600 text-foreground font-bold'>
					{date}
				</div>

				<Label className='select-none text-[20px] text-foreground group-hover:underline duration-300 ease-in-out'>
					{label}
				</Label>
				<Label className='text-red-600 *:tracking-tight *:font-base *:text-[16px]  line'>
					<p className='drop-shadow-lg leading-none  '>Иммерсивный спектакль</p>
				</Label>
				{/* <Label className='mt-auto text-foreground *:tracking-tight *:font-base *:text-[18px] leading-snug line'>
					<p>Начало в {time}</p>
				</Label> */}
				<Label className='mt-auto pb-2 text-foreground/70 *:tracking-tight *:font-base *:text-[13.5px] leading-snug line text-left'>
					<p>{adress}</p>
				</Label>
			</div>
		</div>
	)
}
