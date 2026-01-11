import React from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Label } from '../ui/label'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'

interface Props {
	className?: string
}

export const Producer: React.FC<Props> = ({ className }) => {
	return (
		<Sheet>
			<SheetTrigger>
				<div
					className={cn(
						'relative w-40 iphone:w-48  select-none flex flex-col gap-2 items-center justify-center border border-border shadow-sm shadow-red-950 hover:shadow-red-600 hover:scale-105 duration-300 ease-in-out cursor-pointer rounded-[20px] bg-background active:shadow-red-600 active:scale-95',
						className,
					)}
				>
					<Image
						src='/images/subject.png'
						alt='ArtGaley'
						width={200}
						height={200}
						className='z-10 rounded-3xl brightness-150 p-0'
					/>

					<Label className='z-20 absolute bottom-3 flex flex-row gap-1 text-foreground text-2xl font-bold'>
						<p className='text-red-600'>Артур</p>
						<p className='text-foreground'>Галеев</p>
					</Label>
				</div>
			</SheetTrigger>
			<SheetContent className='w-full overflow-y-auto max-h-dvh'>
				<SheetHeader>
					<SheetTitle>Биография</SheetTitle>
					<SheetDescription></SheetDescription>
					<div className='flex flex-col gap-4 rounded-3xl items-start justify-start text-base leading-relaxed'>
						<p>
							<b>Артур Галеев</b> — театральный продюсер, режиссёр и актёр,
							основатель творческого объединения <b>ARTGaley</b>. Создаю и
							реализую современные спектакли в <b>Анталье</b> и <b>Казани</b>,
							способствуя развитию культурной жизни этих городов.
						</p>
						<p className='text-center w-full'>
							<b>Актёрское портфолио:</b>
						</p>
						<ul className='list-disc pl-4'>
							<li>
								Фильм <b className='text-red-600'>Гая Ричи </b> «Министерство
								неджентельменских дел» — роль немецкого офицера;
							</li>
							<li>
								Сериал <b>«Ататюрк»</b> — роль турецкого офицера;
							</li>
							<li>
								Сериал <b>«Цвет граната»</b> — роль врача Леонида;
							</li>
							<li>Участие в рекламных и театральных проектах.</li>
						</ul>
						<p className='w-full text-center'>
							<b>Продюсерская деятельность:</b>
						</p>
						<ul className='list-disc pl-4'>
							<li>Спродюсировал и организовал спектакли в Анталии и Казани;</li>
							<li>
								Крупнейшие постановки: <b>«Чем зацепить миллионера?»</b>,{' '}
								<b>«Номер 13»</b>, <b>«Капкан»</b>;
							</li>
							<li>
								Активно развиваю театральное искусство на международной сцене.
							</li>
						</ul>
					</div>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	)
}
