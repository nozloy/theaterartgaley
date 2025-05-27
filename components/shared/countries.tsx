import React from 'react'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import Image from 'next/image'

interface Props {
	className?: string
}

export const Countries: React.FC<Props> = ({ className }) => {
	return (
		<div
			className={cn(
				'flex flex-row gap-6 items-center justify-between w-full select-none mt-8',
				className,
			)}
		>
			<div className=' h-[110px] w-[180px] relative flex flex-col gap-0 items-center justify-end rounded-[30px] bg-background shadow-sm p-4 pb-2 border border-border shadow-red-950 hover:shadow-red-600 hover:scale-105 duration-300 ease-in-out cursor-pointer active:shadow-red-600 active:scale-95'>
				<Image
					src='/images/gates.png'
					alt='ArtGaley'
					width={150}
					height={150}
					className='z-10 absolute -top-6 rounded-3xl drop-shadow contrast-125 '
				/>
				<Label className='text-foreground font-bold text-md'>
					Турция - Анталья
				</Label>
			</div>

			<div className='h-[110px] w-[180px] relative flex flex-col gap-0 items-center justify-end rounded-[30px] bg-background shadow-sm p-4 pb-2 border border-border shadow-red-950 hover:shadow-red-600 hover:scale-105 duration-300 ease-in-out cursor-pointer active:shadow-red-600 active:scale-95'>
				<Image
					src='/images/kazan.png'
					alt='ArtGaley'
					width={150}
					height={150}
					className='z-10 absolute -top-6 rounded-3xl drop-shadow contrast-125 '
				/>
				<Label className='text-foreground font-bold text-md'>
					Россия - Казань
				</Label>
			</div>
		</div>
	)
}
