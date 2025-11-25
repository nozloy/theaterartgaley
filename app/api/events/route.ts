// app/api/events/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/prisma/prisma_client'

export const runtime = 'nodejs' // важно для SQLite, чтобы не было edge

// Получить все события (последнее будет на главную, остальные — в афишу)
export async function GET() {
	const events = await prisma.event.findMany({
		orderBy: { date: 'desc' },
	})

	return NextResponse.json(events)
}

// Создать новое событие
export async function POST(req: Request) {
	try {
		const body = await req.json()
		const { title, date, address, link1, link2 } = body

		if (!title || !date || !address) {
			return NextResponse.json(
				{ error: 'title, date, address обязательны' },
				{ status: 400 },
			)
		}

		const event = await prisma.event.create({
			data: {
				title,
				date: new Date(date),
				address,
				link1,
				link2,
			},
		})

		return NextResponse.json(event, { status: 201 })
	} catch (e) {
		console.error(e)
		return NextResponse.json({ error: 'Internal error' }, { status: 500 })
	}
}
