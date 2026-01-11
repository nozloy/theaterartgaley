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
import { EventData } from '@/lib/server-event'
import { getServerEvent } from '@/lib/server-event'

export const dynamic = 'force-dynamic'

export default async function Home() {
	const event: EventData = await getServerEvent()

	return (
		<div className='w-full'>
			<div className='w-full flex flex-col items-center justify-start p-2 gap-6 max-w-md mx-auto bg-background '>
				<Header />
				<Lights />
				<div className='fixed bottom-4 z-50 max-w-md p-2'>
					<CookieConsent />
				</div>
				<IntroBlock />
				<NextShow event={event} />
				<div className='flex flex-row gap-1 items-center justify-between w-full'>
					<div className='w-full flex flex-col gap-8 items-start justify-start'>
						<Afisha />
						<Band />
					</div>
					<div className='w-md mt-4 flex flex-col items-end justify-between gap-6'>
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
