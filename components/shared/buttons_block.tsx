'use client'
import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { MapPinned, Ticket } from 'lucide-react'
import { EventData } from '@/lib/server-event'

interface Props {
	className?: string
	eventData: EventData
}

export const ButtonsBlock: React.FC<Props> = ({ className, eventData }) => {
	return (
		<div
			className={cn(
				'flex flex-col gap-2 justify-between w-full items-center',
				className,
			)}
		>
			<Button
				onClick={() => window.open(eventData.mapsUrl, '_blank')}
				variant={'default'}
				className='flex flex-row gap-1 items-center justify-center bg-foreground w-full   shadow-sm shadow-red-800   hover:shadow-red-600 hover:scale-105 duration-300 ease-in-out rounded-[30px]'
			>
				{' '}
				<MapPinned />
				<p>{eventData.address}</p>
			</Button>
			<Button
				onClick={() => window.open(eventData.kassirUrl, '_blank')}
				variant={'default'}
				className='relative flex flex-row gap-1 items-center justify-center bg-foreground w-full *:text-background shadow-md shadow-red-800  hover:bg-foreground hover:shadow-red-600 hover:scale-105 duration-300 ease-in-out rounded-[30px] border border-border'
			>
				{' '}
				<Ticket />
				<p>Билеты на Kassir.ru</p>
			</Button>
		</div>
	)
}
