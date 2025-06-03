import React from 'react'
import { cn } from '@/lib/utils'
import { Kazan } from './kazan'
import { Antalya } from './antalya'
import { Button } from '@/components/ui/button'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'

interface Props {
	className?: string
}

export const Countries: React.FC<Props> = ({ className }) => {
	const style =
		'h-[110px] w-[180px] relative flex flex-col gap-0 items-center justify-end rounded-[30px] bg-background shadow-sm p-4 pb-2 border border-border shadow-red-950 hover:shadow-red-600 hover:scale-105 duration-300 ease-in-out cursor-pointer active:shadow-red-600 active:scale-95'
	return (
		<div
			className={cn(
				'flex flex-row gap-6 items-center justify-between w-full select-none mt-8',
				className,
			)}
		>
			<Drawer>
				<DrawerTrigger asChild>
					<Antalya className={style} />
				</DrawerTrigger>
				<DrawerContent>
					<div className='mx-auto w-full max-w-sm'>
						<DrawerHeader>
							<DrawerTitle>Анталья</DrawerTitle>
							<DrawerDescription>Турция</DrawerDescription>
						</DrawerHeader>
						<div className='p-4 pb-10'>
							В Анталье мы выступаем с 2023 года. Здесь проходят иммерсивные и
							камерные спектакли в уникальных пространствах города, объединяя
							местных жителей и гостей региона. Анталья — древний город с
							богатым культурным наследием, жемчужина Турецкой Ривьеры и один из
							центров театральной жизни Средиземноморья. Наши постановки в
							Анталье проходят в атмосферных исторических и современных
							локациях, позволяя зрителям глубже погрузиться в искусство театра.
							ARTGaley активно участвует в развитии культурной среды Антальи,
							предлагая современный взгляд на классические и авторские
							спектакли. Мы стремимся сохранить и развивать театральные традиции
							города, прославленного своими античными амфитеатрами, фестивалями
							и творческими инициативами.
						</div>

						<DrawerFooter className='hidden md:block'>
							<DrawerClose asChild>
								<Button variant='outline' className='w-full'>
									Закрыть
								</Button>
							</DrawerClose>
						</DrawerFooter>
					</div>
				</DrawerContent>
			</Drawer>
			<Drawer>
				<DrawerTrigger asChild>
					<Kazan className={style} />
				</DrawerTrigger>
				<DrawerContent>
					<div className='mx-auto w-full max-w-sm'>
						<DrawerHeader>
							<DrawerTitle>Казань</DrawerTitle>
							<DrawerDescription>Россия</DrawerDescription>
						</DrawerHeader>
						<div className='p-4 pb-10'>
							В Казани театр ARTGaley открыл свой творческий сезон в 2022 году.
							Казань — динамично развивающийся мегаполис, сочетающий богатое
							историческое прошлое и новейшие достижения современности. Здесь
							театр ARTGaley становится частью живой культурной среды города,
							где традиции встречаются с инновациями. Наши спектакли в Казани
							проходят в современных арт-пространствах и театральных залах,
							собирая поклонников театра, студентов, молодежь и всех, кто ценит
							оригинальные постановки. ARTGaley в Казани — это свежий взгляд на
							драматургию, актуальные темы и уникальный творческий подход,
							соответствующий ритму и духу современного города. Посетите наши
							спектакли в Казани, чтобы почувствовать энергетику и культурное
							разнообразие одного из самых ярких городов России!
						</div>
						<DrawerFooter className='hidden md:block'>
							<DrawerClose asChild>
								<Button variant='outline' className='w-full'>
									Закрыть
								</Button>
							</DrawerClose>
						</DrawerFooter>
					</div>
				</DrawerContent>
			</Drawer>
		</div>
	)
}
