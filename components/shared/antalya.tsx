import React from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Label } from '@/components/ui/label'

interface Props {
	className?: string
}

export const Antalya: React.FC<Props> = ({ className, ...props }) => {
	return (
		<div className={cn('', className)} {...props}>
			<Image
				src='/images/gates.png'
				alt='ArtGaley'
				width={150}
				height={150}
				className='z-10 absolute -top-6 rounded-3xl drop-shadow contrast-125 '
			/>
			<Label className=' text-foreground font-bold text-lg'>Анталья</Label>
		</div>
	)
}
