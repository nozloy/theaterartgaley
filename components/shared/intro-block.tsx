import React from 'react'
import { cn } from '@/lib/utils'

interface Props {
	className?: string
}

export const IntroBlock: React.FC<Props> = ({ className }) => {
	return (
		<div
			className={cn(
				'relative w-full text-foreground text-center text-xl p-2  rounded-xl  bg-background bg-opacity-20 backdrop-blur-xl',
				className,
			)}
		>
			<h1>
				Добро пожаловать в <strong>Art Galey</strong> — творческое объединение,
				создающее <strong>спектакли и постановки по всему миру</strong>.
			</h1>
		</div>
	)
}
