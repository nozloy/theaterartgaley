import React from 'react'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

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
		</div>
	)
}
