import React from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
interface Props {
	className?: string
}

export const Cinema: React.FC<Props> = ({ className }) => {
	return (
		<div
			tabIndex={0}
			className={cn(
				' h-[110px] w-[180px] relative flex flex-col gap-0 items-center justify-center rounded-[30px] bg-background shadow-sm px-4 border border-border shadow-red-950 hover:shadow-red-600 hover:scale-105 duration-300 ease-in-out cursor-pointer active:shadow-red-600 active:scale-95 ',
				className,
			)}
		>
			<Image
				src='/images/cinema.png'
				alt='ArtGaley'
				width={150}
				height={150}
				className='z-10  '
			/>
			{/* <Label className='text-foreground font-bold text-md'>Мы в кино</Label> */}
		</div>
	)
}
