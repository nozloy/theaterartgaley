import React from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Label } from '@/components/ui/label'

interface Props {
	className?: string
}

export const Kazan: React.FC<Props> = ({ className, ...props }) => {
	return (
		<div className={cn('', className)} {...props}>
			<Image
				src='/images/kazan.png'
				alt='ArtGaley'
				width={150}
				height={150}
				className='z-10 absolute -top-6 rounded-3xl drop-shadow contrast-125 '
			/>

			<Label className='hidden md:block text-foreground font-bold text-md'>
				Россия - Казань
			</Label>
			<Label className='block md:hidden text-foreground font-bold text-lg'>
				Казань
			</Label>
		</div>
	)
}
