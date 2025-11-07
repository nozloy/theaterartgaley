import React from 'react'
import { cn } from '@/lib/utils'
import { Label } from '../ui/label'
import Image from 'next/image'
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
import { Button } from '../ui/button'

interface Props {
	className?: string
}

interface ShowData {
	date: string
	title: string
}

const shows: ShowData[] = [
	{ date: '23 июня', title: 'Ловушка для одинокого мужчины' },
	{ date: '28 июля', title: 'Ловушка для одинокого мужчины' },
	{ date: '28 августа', title: 'Ловушка для одинокого мужчины' },
	{ date: '3 октября', title: 'Ловушка для одинокого мужчины' },
	{ date: '30 октября', title: 'Ловушка для одинокого мужчины' },
	{ date: '20 ноября', title: 'Ловушка для одинокого мужчины' },
	{ date: 'декабрь', title: 'Ловушка для одинокого мужчины' },
]

const ShowItem: React.FC<ShowData> = ({ date, title }) => (
	<div className='w-full flex flex-row gap-2 items-center justify-start border border-border shadow-sm shadow-red-950 rounded-3xl p-3 bg-background'>
		<div className='text-[12px] px-2 py-1 rounded-xl bg-red-600 text-foreground font-bold'>
			{date}
		</div>
		<div className='text-md'>{title}</div>
	</div>
)

export const Afisha: React.FC<Props> = ({ className }) => {
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<div
					className={cn(
						'h-[110px] w-[160px] iphone:w-[180px] relative flex flex-col gap-0 items-center justify-end rounded-[30px] bg-background/25 backdrop-blur-xl shadow-md p-4 pb-2 mt-10 border border-border shadow-red-950 hover:shadow-red-600 hover:scale-105 duration-300 ease-in-out cursor-pointer active:shadow-red-600 active:scale-95',
						className,
					)}
				>
					<Image
						src='/images/tickets_small.png'
						alt='ArtGaley'
						width={120}
						height={120}
						className='z-10 absolute -top-12'
					/>
					<Label className='text-foreground font-bold text-xl'>Афиша</Label>
				</div>
			</DrawerTrigger>
			<DrawerContent className=''>
				<div className='mx-auto w-full max-w-sm'>
					<DrawerHeader>
						<DrawerTitle>Афиша</DrawerTitle>
						<DrawerDescription>Cпектаклей сезона</DrawerDescription>
					</DrawerHeader>
					<div className='w-full flex flex-col items-center justify-center gap-4 pb-20'>
						{shows.map((show, index) => (
							<ShowItem key={index} {...show} />
						))}
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
	)
}
