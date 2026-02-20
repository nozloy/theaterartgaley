import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
	title: 'Событие',
	robots: {
		index: false,
		follow: false,
	},
}

export default function Event() {
	redirect('/dashboard')
}
