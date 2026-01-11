'use client'

import { Afisha } from '@/components/shared/afisha'
import { Countries } from '@/components/shared/countries'
import { Header } from '@/components/shared/header'
import { IntroBlock } from '@/components/shared/intro-block'
import { NextShow } from '@/components/shared/next_show'
import { Producer } from '@/components/shared/producer'
import { TrapForLonelyMan } from '@/components/shared/shows/trap_for_ lonely_man'
import { Socials } from '@/components/shared/socials'
import { Band } from '@/components/shared/band'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { Lights } from '@/components/shared/lights'
import CookieConsent from '@/storage/CookieConsent'
import { Footer } from '@/components/shared/footer'
import { ButtonsBlock } from '@/components/shared/buttons_block'
import { EventData } from '@/lib/event'

const defaultEvent: EventData = {
	label: 'Ловушка для одинокого мужчины',
	date: '9 января',
	time: '18:00',
	address: 'Бар 100dal, Пушкина, 23',
	image: '/images/afisha.png',
	kassirUrl:
		'https://kassir.ru/theatre/event/lovushka-dlya-odinokogo-muzhchiny-1698781',
	mapsUrl: 'https://yandex.ru/maps/-/CLTpUIkp',
}
export default function Home() {
	const [modal_trap, setModalTrap] = useState(false)
	const changeModalTrap = () => {
		setModalTrap(!modal_trap)
	}
	const [event, setEvent] = useState<EventData>(defaultEvent)
	useEffect(() => {
		fetch('/api/event')
			.then(res => res.json())
			.then(event => setEvent(event))
	}, [])
	return (
		<div className='w-full'>
			<div className='w-full flex flex-col items-center justify-start p-4 gap-2 max-w-md mx-auto bg-background '>
				<Header />
				<Lights />
				<div className='fixed bottom-4 z-50 max-w-md p-2'>
					<CookieConsent />
				</div>
				<IntroBlock />
				<NextShow changeModalTrap={changeModalTrap} event={event} />
				<ButtonsBlock className='mt-2 mb-4' event={event} />
				<div
					className={cn(
						'transition-all duration-700 ease-in-out overflow-hidden',
						modal_trap
							? 'max-h-[1000px] opacity-100 my-4'
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
						<Band />
					</div>
					<div className='w-full mt-4 flex flex-col items-end justify-between gap-6'>
						<Producer />
						<Socials />
					</div>
				</div>

				<Countries />
				<Footer />
			</div>
		</div>
	)
}
