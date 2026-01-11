import { Afisha } from '@/components/shared/afisha'
import { Countries } from '@/components/shared/countries'
import { Header } from '@/components/shared/header'
import { IntroBlock } from '@/components/shared/intro-block'
import { NextShow } from '@/components/shared/next_show'
import { Producer } from '@/components/shared/producer'
import { Socials } from '@/components/shared/socials'
import { Band } from '@/components/shared/band'
import { Lights } from '@/components/shared/lights'
import CookieConsent from '@/storage/CookieConsent'
import { Footer } from '@/components/shared/footer'
import { ButtonsBlock } from '@/components/shared/buttons_block'
import { EventData } from '@/lib/event'
import { getServerEvent } from '@/lib/server-event'
import TrapModal from '@/components/shared/trap_modal'

export const dynamic = 'force-dynamic'

export default async function Home() {
	const event: EventData = await getServerEvent()

	return (
		<div className='w-full'>
			<div className='w-full flex flex-col items-center justify-start p-4 gap-2 max-w-md mx-auto bg-background '>
				<Header />
				<Lights />
				<div className='fixed bottom-4 z-50 max-w-md p-2'>
					<CookieConsent />
				</div>
				<IntroBlock />
				<NextShow event={event} />
				<ButtonsBlock className='mt-2 mb-4' eventData={event} />
				<TrapModal />
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
