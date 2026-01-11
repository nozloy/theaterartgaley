'use client'
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
import { Label } from '../ui/label'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
	className?: string
}

export const Socials: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn('', className)}>
			<Drawer>
				<DrawerTrigger asChild>
					<div
						className={cn(
							'h-27.5 w-40 iphone:w-45 relative flex flex-col gap-0 items-center justify-end rounded-[30px] bg-background/25 backdrop-blur-xl shadow-md  pb-2 mt-4 border border-border shadow-red-950 hover:shadow-red-600 hover:scale-105 duration-300 ease-in-out cursor-pointer active:shadow-red-600 active:scale-95',
							className,
						)}
					>
						<Image
							src='/images/contacts.png'
							alt='ArtGaley'
							width={120}
							height={120}
							className='z-10 absolute -top-4'
						/>
						<Label className='text-foreground font-bold text-xl'>
							Контакты
						</Label>
					</div>
				</DrawerTrigger>
				<DrawerContent>
					<div className='mx-auto  max-w-sm'>
						<DrawerHeader>
							<DrawerTitle>Контакты</DrawerTitle>
							<DrawerDescription>и социальные сети</DrawerDescription>
						</DrawerHeader>
						<div className='w-full flex flex-col items-center justify-center gap-2 p-4 *:w-full *:text-xl *:h-12'>
							<Button
								variant='secondary'
								onClick={() => window.open('https://t.me/artgaley', '_blank')}
							>
								Написать в Telegram
							</Button>
							<Button
								variant='outline'
								onClick={() => window.open('https://vk.com/artgaley', '_blank')}
							>
								Группа в VK
							</Button>
							{/* <Button variant='outline' className=' '>
								Instagram
							</Button> */}
							<Button
								variant='outline'
								onClick={() =>
									window.open('https://wa.me/79656071642', '_blank')
								}
							>
								WhatsApp
							</Button>
							<Button
								variant='destructive'
								onClick={() => window.open('tel:+79656071642', '_blank')}
							>
								Позвонить
							</Button>
						</div>
						<div className='mb-10 mx-4 p-2 rounded-xl border border-border border-dashed text-center text-sm text-foreground'>
							Используя один из методов связи Вы соглашаетесь с нашей
							<Link
								href='/privacy'
								target='_blank'
								className='text-red-600 underline pl-1 drop-shadow-sm'
							>
								политикой конфиденциальности
							</Link>
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
