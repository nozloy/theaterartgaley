'use server'

import prisma from '@/prisma/prisma_client'

export async function getEvents() {
	return await prisma.event.findMany({
		orderBy: { date: 'desc' },
	})
}

export async function getLastEvent() {
	return await prisma.event.findFirst({
		orderBy: { date: 'desc' },
	})
}

export async function createEvent(data: {
	title: string
	date: string
	address: string
	link1?: string
	link2?: string
}) {
	return await prisma.event.create({
		data: {
			title: data.title,
			date: new Date(data.date),
			address: data.address,
			link1: data.link1,
			link2: data.link2,
		},
	})
}
