import React from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface Props {
	className?: string
}

export const Producer: React.FC<Props> = ({ className }) => {
	return (
		<div
			className={cn(
				' w-[180px] relative select-none flex flex-col gap-2 items-center justify-center border border-border shadow-sm shadow-red-950 hover:shadow-red-600 hover:scale-105 duration-300 ease-in-out cursor-pointer rounded-[30px] p-2  bg-background  active:shadow-red-600 active:scale-95',
				className,
			)}
		>
			<Image
				src='/images/image-good4.png'
				alt='ArtGaley'
				width={200}
				height={200}
				className='z-10 rounded-3xl brightness-150'
			/>

			{/* <Label className='flex flex-row gap-1 text-foreground text-2xl font-bold'>
				<p className='text-red-600'>Артур</p>
				<p className='text-foreground'>Галеев</p>
			</Label> */}
		</div>
	)
}
