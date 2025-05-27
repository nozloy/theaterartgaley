import React from 'react'
import { cn } from '@/lib/utils'
import { Label } from '../ui/label'
import Image from 'next/image'

interface Props {
	className?: string
}

export const BuyTickets: React.FC<Props> = ({ className }) => {
	return (
		<div
			className={cn(
				'h-[110px] w-[180px] relative flex flex-col gap-0 items-center justify-end rounded-[30px] bg-background shadow-sm p-4 pb-2 mt-8 border border-border shadow-red-950 hover:shadow-red-600 hover:scale-105 duration-300 ease-in-out cursor-pointer active:shadow-red-600 active:scale-95',
				className,
			)}
		>
			<Image
				src='/images/tickets.png'
				alt='ArtGaley'
				width={150}
				height={150}
				className='z-10 absolute -top-12 scale-90'
			/>
			<Label className='text-foreground font-bold text-md'>Купить билеты</Label>
		</div>
	)
}
