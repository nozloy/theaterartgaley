import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { Telegram } from './icons/telegram'
import { MapPinned, Ticket } from 'lucide-react'
import { EventData } from '@/lib/event'

interface Props {
	className?: string
	event: EventData
}

export const ButtonsBlock: React.FC<Props> = ({ className, event }) => {
	return (
		<div className={cn('', className)}>
			<div className='flex flex-wrap gap-2 justify-center max-w-md  items-center'>
				<Button
					onClick={() => window.open('https://t.me/artgaleyto', '_blank')}
					variant={'secondary'}
					className='flex flex-row gap-1 items-center justify-center  w-[120px] h-[40px]  shadow-sm shadow-red-800   hover:shadow-red-600 hover:scale-105 duration-300 ease-in-out rounded-[30px]'
				>
					<Telegram size={20} className='fill-foreground' />
					<p>Отзывы</p>
				</Button>

				<Button
					onClick={() => window.open(event.mapsUrl, '_blank')}
					variant={'secondary'}
					className='flex flex-row gap-1 items-center justify-center  w-[120px] h-[40px]  shadow-sm shadow-red-800   hover:shadow-red-600 hover:scale-105 duration-300 ease-in-out rounded-[30px]'
				>
					<MapPinned />
					<p>Маршрут</p>
				</Button>
				<Button
					onClick={() => window.open(event.kassirUrl, '_blank')}
					variant={'default'}
					className='relative flex flex-row gap-1 items-center justify-center bg-foreground w-[120px] h-[40px] *:text-background shadow-md shadow-red-800  hover:bg-foreground hover:shadow-red-600 hover:scale-105 duration-300 ease-in-out rounded-[30px] border border-border'
				>
					<Ticket />
					<p>Билеты</p>
				</Button>
			</div>
		</div>
	)
}
