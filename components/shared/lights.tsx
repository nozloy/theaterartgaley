import React from 'react'
import { cn } from '@/lib/utils'

interface Props {
	className?: string
}

export const Lights: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn('', className)}>
			<div className='pointer-events-none fixed inset-0 z-0'>
				<div className='absolute top-1/4 left-1/4 w-40 h-40 bg-red-600 rounded-full blur-2xl opacity-60 animate-pulse-slow' />
				<div className='absolute top-2/3 left-2/3 w-32 h-32 bg-orange-500 rounded-full blur-3xl opacity-40 animate-pulse-slow2' />
			</div>
		</div>
	)
}
