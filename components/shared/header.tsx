import React from 'react'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import Image from 'next/image'

interface Props {
	className?: string
}

export const Header: React.FC<Props> = ({ className }) => {
	return (
		<div
			className={cn(
				'flex flex-row items-center justify-between rounded-xl shadow-lg  w-full py-2 px-6 bg-background select-none',
				className,
			)}
		>
			<div className='select-none flex flex-col items-center justify-center gap-0'>
				<Label className='flex flex-row gap-0 text-foreground text-4xl font-bold'>
					<p className='text-red-600'>ART</p>Galey
				</Label>
				<Label className='text-foreground/70 tracking-tight font-base text-[13.5px]'>
					Творческое объединение
				</Label>
			</div>
			<Image
				src='/images/masks.png'
				alt='ArtGaley'
				width={100}
				height={100}
				className='rounded-xl drop-shadow-[0_3px_3px_rgba(220,38,38,0.7)]  '
			/>
			{/* [0_3px_3px_rgba(220,38,38,1)] */}
		</div>
	)
}
