import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { Telegram } from './icons/telegram'
import { MapPinned, Ticket } from 'lucide-react'

interface Props {
	className?: string
}

export const ButtonsBlock: React.FC<Props> = ({ className }) => {
	const link = process.env.NEXT_PUBLIC_KASSIR_URL || '#'
	const map_link =
		process.env.NEXT_PUBLIC_MAPS_URL || 'https://yandex.ru/maps/-/CLWjQ4iX'
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
					onClick={() => window.open(map_link, '_blank')}
					variant={'secondary'}
					className='flex flex-row gap-1 items-center justify-center  w-[120px] h-[40px]  shadow-sm shadow-red-800   hover:shadow-red-600 hover:scale-105 duration-300 ease-in-out rounded-[30px]'
				>
					<MapPinned />
					<p>Маршрут</p>
				</Button>
				<Button
					onClick={() => window.open(link, '_blank')}
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
