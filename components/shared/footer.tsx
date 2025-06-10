import React from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface Props {
	className?: string
}

export const Footer: React.FC<Props> = ({ className }) => {
	return (
		<div
			className={cn(
				'w-full flex flex-col items-center justify-center rounded-[30px] backdrop-blur-sm my-5 p-4 bg-background/25',
				className,
			)}
		>
			<p className='text-foreground/80 text-center text-base font-bold'>
				2023-2025 ArtGalley (c)
			</p>
			<p className='text-foreground/50 text-center text-sm'>
				ИП Галеев Артур Радикович ИНН 027410843056
			</p>
			<Link
				href='/privacy'
				target='_blank'
				className='text-foreground/50 text-center underline text-sm'
			>
				Политика конфиденциальности
			</Link>
		</div>
	)
}
