'use client'

import { Afisha } from '@/components/shared/afisha'
import { Countries } from '@/components/shared/countries'
import { Header } from '@/components/shared/header'
import { IntroBlock } from '@/components/shared/intro-block'
import { NextShow } from '@/components/shared/next_show'
import { Producer } from '@/components/shared/producer'
import { TrapForLonelyMan } from '@/components/shared/shows/trap_for_ lonely_man'
import { Socials } from '@/components/shared/socials'
import { Cinema } from '@/components/shared/сinema'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export default function Home() {
	const [modal_trap, setModalTrap] = useState(false)
	const changeModalTrap = () => {
		setModalTrap(!modal_trap)
	}
	return (
		<div className='relative min-h-dvh w-full mb-24'>
			<div className='w-full flex flex-col items-center justify-start p-4 gap-2 max-w-md mx-auto bg-background '>
				<Header />
				<IntroBlock />
				<NextShow changeModalTrap={changeModalTrap} />
				<div
					className={cn(
						'transition-all duration-700 ease-in-out overflow-hidden',
						modal_trap
							? 'max-h-[1000px] opacity-100 mt-4'
							: 'max-h-0 opacity-0 mt-0',
					)}
				>
					<div
						className={cn(
							'transition-opacity duration-700',
							modal_trap ? 'opacity-100' : 'opacity-0',
						)}
					>
						<TrapForLonelyMan />
					</div>
				</div>

				<div className='flex flex-row gap-4 items-center justify-between w-full'>
					<div className='w-full flex flex-col gap-8 items-start justify-start'>
						<Afisha />
						<Cinema />
					</div>
					<div className='w-full mt-4 flex flex-col items-end justify-between gap-6'>
						<Producer />
						<Socials />
					</div>
				</div>

				<Countries />
			</div>
		</div>
	)
}
