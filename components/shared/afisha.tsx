'use client'
import React from 'react'
import { cn } from '@/lib/utils'
import { Label } from '../ui/label'
import Image from 'next/image'

interface Props {
	className?: string
}

export const Afisha: React.FC<Props> = ({ className }) => {
	return (
		<div
			className={cn(
				'h-27.5 w-40 iphone:w-45 relative flex flex-col gap-0 items-center justify-end rounded-[30px] bg-background/25 backdrop-blur-xl shadow-md p-4 pb-2 mt-10 border border-border shadow-red-950 hover:shadow-red-600 hover:scale-105 duration-300 ease-in-out cursor-pointer active:shadow-red-600 active:scale-95',
				className,
			)}
			onClick={() => window.open('https://t.me/artgaleyto', '_blank')}
		>
			<Image
				src='/images/tickets_small.png'
				alt='ArtGaley'
				width={120}
				height={120}
				className='z-10 absolute -top-12'
			/>
			<Label className='text-foreground font-bold text-xl'>Отзывы</Label>
		</div>
	)
}
