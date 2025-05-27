'use client'

import { BuyTickets } from '@/components/shared/buy-tickets'
import { Countries } from '@/components/shared/countries'
import { Header } from '@/components/shared/header'
import { IntroBlock } from '@/components/shared/intro-block'
import { Producer } from '@/components/shared/producer'
import { Cinema } from '@/components/shared/сinema'
import { ArrowRightCircle } from 'lucide-react'

export default function Home() {
	return (
		<div className='min-h-dvh w-full mb-24'>
			<div className='flex flex-col items-center justify-start p-4 gap-2 max-w-md mx-auto h-svh bg-background '>
				<Header />
				<IntroBlock />
				<Countries />
				<div className='flex flex-row gap-1 w-full items-center justify-between'>
					<Producer />
					<div className='h-full flex flex-col gap-4 items-start justify-start'>
						<BuyTickets />
						<Cinema />
						<div className='text-foreground font-bold text-md py-2 px-4 w-[180px] rounded-3xl items-center justify-between bg-background border border-border shadow-sm shadow-red-950 hover:shadow-red-600 hover:scale-105 duration-300 ease-in-out cursor-pointer active:shadow-red-600 active:scale-95 flex flex-row gap-1'>
							Состав труппы
							<ArrowRightCircle size={20} className='text-red-600' />
						</div>
					</div>
				</div>

				{/* Блок с кнопками
				<div className='flex w-full flex-col items-start justify-center gap-2 pt-4'>
					<Button className='w-full font-bold text-md p-2 '>
						Состав труппы
					</Button>
				</div> */}
			</div>
		</div>
	)
}
