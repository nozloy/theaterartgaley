import type { ComponentType } from 'react'

export type TimelineStatus = 'past' | 'current'

export type TimelineCard = {
	id: string
	status: TimelineStatus
	date: string
	city: string
	time: string
	title: string
	image: string
	address?: string
	startsAtTimestamp: number
	price?: string
	href?: string
	badge?: string
	highlight?: boolean
}

export type ContactLink = {
	label: string
	href: string
	icon: ComponentType<{ className?: string }>
}

export type CityStory = {
	id: string
	city: string
	image: string
	since: string
	description: string
	fullText: string
}

export type FounderProfile = {
	name: string
	bio: string
	actingPortfolio: string[]
	producingPortfolio: string[]
}
