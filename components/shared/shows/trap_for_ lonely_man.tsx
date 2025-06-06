import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Telegram } from '../icons/telegram'
import { MapPinned, Ticket } from 'lucide-react'

interface Props {
	className?: string
}

export const TrapForLonelyMan: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn('flex flex-col gap-4 pb-4', className)}>
			<p>
				Детективная история от создателей &quot;НОМЕР 13&quot; Спектакль
				«Ловушка для одинокого мужчины» - это интриги, деньги, оружие, магия
				Вуду и любовь. Бар. Темпераментный мужчина в расцвете сил, у него
				пропала жена. Он в надежде ее вернуть, он ищет пути решения своей
				проблемы, он нанял детектива. И о чудо, его любимая возвращается ...но!
			</p>
			<Separator />
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
					onClick={() => window.open('https://yandex.ru/maps/-/CHGtmHPk')}
					variant={'secondary'}
					className='flex flex-row gap-1 items-center justify-center  w-[120px] h-[40px]  shadow-sm shadow-red-800   hover:shadow-red-600 hover:scale-105 duration-300 ease-in-out rounded-[30px]'
				>
					<MapPinned />
					<p>Маршрут</p>
				</Button>
				<Button
					onClick={() =>
						window.open(
							'https://kzn.kassir.ru/teatr/lovushka-dlya-odinokogo-mujchinyi-immersivnyiy-spektakl#2973845',
							'_blank',
						)
					}
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
