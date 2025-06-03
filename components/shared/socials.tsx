import React from 'react'
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
import { cn } from '@/lib/utils'

interface Props {
	className?: string
}

export const Socials: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn('w-full mt-4', className)}>
			<Drawer>
				<DrawerTrigger asChild>
					<div className='w-full text-center text-foreground font-bold text-xl px-4 py-2 rounded-sm shadow-sm shadow-red-500 hover:shadow-red-600 hover:scale-105 duration-300 ease-in-out cursor-pointer active:shadow-red-600 active:scale-95'>
						Контакты
					</div>
				</DrawerTrigger>
				<DrawerContent>
					<div className='mx-auto w-full max-w-sm'>
						<DrawerHeader>
							<DrawerTitle>Контакты</DrawerTitle>
							<DrawerDescription>и социальные сети</DrawerDescription>
						</DrawerHeader>
						<div className='w-full flex flex-col items-center justify-center gap-2 p-4 *:w-full *:text-xl *:h-12'>
							<Button variant='secondary' className=''>
								Telegram
							</Button>
							<Button variant='outline' className=' '>
								VK
							</Button>
							<Button variant='outline' className=' '>
								Instagram
							</Button>
							<Button variant='outline' className=' '>
								YouTube
							</Button>
							<Button variant='outline' className=' '>
								WhatsApp
							</Button>
							<Button variant='destructive' className=' '>
								Позвонить
							</Button>
						</div>
						<div className='mb-10 mx-4 p-2 rounded-xl border border-border border-dashed text-center text-sm text-foreground'>
							Используя один из методов связи Вы соглашаетесь с нашей
							<p className='text-red-100 underline'>
								политикой конфиденциальности
							</p>
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
