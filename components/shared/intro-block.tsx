import React from 'react'
import { cn } from '@/lib/utils'

interface Props {
	className?: string
}

export const IntroBlock: React.FC<Props> = ({ className }) => {
	return (
		<div
			className={cn(
				'relative w-full text-foreground text-center text-xl p-2 border border-dashed border-border rounded-xl  bg-background',
				className,
			)}
		>
			<h1>
				Добро пожаловать в <strong>Art Galey</strong> — творческое объединение,
				создающее{' '}
				<strong>
					спектакли и постановки по всему миру и снимающееся в кино
				</strong>
				.
			</h1>
		</div>
	)
}
