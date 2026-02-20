'use client'

import { useEffect, useMemo, useState } from 'react'
import {
	CalendarDays,
	Clock3,
	Copy,
	Loader2,
	MapPin,
	Pencil,
	RefreshCcw,
	Search,
	Ticket,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import type { DashboardEvent } from '@/lib/events'

interface EventsListAdminProps {
	initialEvents: DashboardEvent[]
	onEdit?: (event: DashboardEvent) => void
	onRepeat?: (event: DashboardEvent) => void
}

function toMoscowDateTime(input: string) {
	const date = new Date(input)
	if (Number.isNaN(date.getTime())) {
		return '—'
	}
	return new Intl.DateTimeFormat('ru-RU', {
		dateStyle: 'medium',
		timeStyle: 'short',
		timeZone: 'Europe/Moscow',
	}).format(date)
}

export function EventsListAdmin({
	initialEvents,
	onEdit,
	onRepeat,
}: EventsListAdminProps) {
	const [events, setEvents] = useState(initialEvents)
	const [query, setQuery] = useState('')
	const [refreshing, setRefreshing] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const filtered = useMemo(() => {
		const normalized = query.trim().toLowerCase()
		if (!normalized) {
			return events
		}
		return events.filter((event) => {
			return (
				event.label.toLowerCase().includes(normalized) ||
				event.address.toLowerCase().includes(normalized)
			)
		})
	}, [events, query])

	const stats = useMemo(() => {
		const now = Date.now()
		const upcoming = events.filter(
			(event) => new Date(event.startsAt).getTime() >= now,
		).length
		const past = events.length - upcoming
		return { upcoming, past }
	}, [events])

	useEffect(() => {
		setEvents(initialEvents)
	}, [initialEvents])

	async function refreshEvents() {
		setRefreshing(true)
		setError(null)
		try {
			const res = await fetch('/api/admin/events', {
				method: 'GET',
				cache: 'no-store',
			})
			const json = (await res.json()) as { error?: string; events?: DashboardEvent[] }
			if (!res.ok || !json.events) {
				throw new Error(json.error || 'Не удалось загрузить список мероприятий')
			}
			setEvents(json.events)
		} catch (e) {
			setError(e instanceof Error ? e.message : 'Unknown error')
		} finally {
			setRefreshing(false)
		}
	}

	return (
		<Card className='border-white/10 bg-black/40 shadow-xl backdrop-blur'>
			<CardHeader className='space-y-3'>
				<div className='flex items-start justify-between gap-3'>
					<div>
						<CardTitle className='text-xl'>Весь список мероприятий</CardTitle>
						<CardDescription>
							Ближайшие будущие показы выводятся в начале списка.
						</CardDescription>
					</div>
					<Button
						type='button'
						variant='outline'
						size='sm'
						onClick={refreshEvents}
						disabled={refreshing}
					>
						{refreshing ? <Loader2 className='animate-spin' /> : <RefreshCcw />}
						Обновить
					</Button>
				</div>

				<div className='flex flex-wrap gap-2'>
					<Badge>Всего: {events.length}</Badge>
					<Badge variant='outline'>Будущие: {stats.upcoming}</Badge>
					<Badge variant='outline'>Прошедшие: {stats.past}</Badge>
				</div>
			</CardHeader>

			<CardContent className='space-y-4'>
				<div className='relative'>
					<Search className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground' />
					<Input
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder='Поиск по названию и адресу'
						className='pl-10'
					/>
				</div>

				{error && (
					<div className='rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200'>
						{error}
					</div>
				)}

				<div className='space-y-3'>
					{filtered.length === 0 ? (
						<div className='rounded-lg border border-white/10 p-4 text-sm text-muted-foreground'>
							Мероприятия не найдены.
						</div>
					) : (
						filtered.map((event) => {
							const isUpcoming = new Date(event.startsAt).getTime() >= Date.now()

							return (
								<div
									key={event.id}
									className='rounded-xl border border-white/10 bg-black/30 p-3 sm:p-4'
								>
									<div className='flex flex-wrap items-start justify-between gap-3'>
										<div className='space-y-1'>
											<div className='text-base font-semibold'>{event.label}</div>
											<div className='text-xs text-foreground/60'>
												ID: {event.id}
											</div>
										</div>
										<Badge variant={isUpcoming ? 'default' : 'outline'}>
											{isUpcoming ? 'Предстоящее' : 'Прошедшее'}
										</Badge>
									</div>

									<div className='mt-3 grid gap-2 text-sm text-foreground/80'>
										<div className='flex items-center gap-2'>
											<CalendarDays className='size-4' />
											{event.date}
										</div>
										<div className='flex items-center gap-2'>
											<Clock3 className='size-4' />
											{event.time} (МСК)
										</div>
										<div className='flex items-center gap-2'>
											<MapPin className='size-4' />
											{event.address}
										</div>
									</div>

									{event.description && (
										<div className='mt-3 line-clamp-3 text-sm text-foreground/70'>
											{event.description}
										</div>
									)}

									<div className='mt-3 flex flex-wrap items-center gap-2 text-xs text-foreground/60'>
										<span>Начало: {toMoscowDateTime(event.startsAt)}</span>
										{event.kassirUrl && (
											<a
												href={event.kassirUrl}
												target='_blank'
												rel='noreferrer'
												className='inline-flex items-center gap-1 rounded-full border border-white/15 px-2 py-1 hover:bg-white/10'
											>
												<Ticket className='size-3' />
												Кассир.РУ
											</a>
										)}
									</div>

									<div className='mt-4 flex flex-wrap gap-2'>
										<Button
											type='button'
											variant='outline'
											size='sm'
											onClick={() => onEdit?.(event)}
										>
											<Pencil className='size-4' />
											Редактировать
										</Button>
										<Button
											type='button'
											variant='outline'
											size='sm'
											onClick={() => onRepeat?.(event)}
										>
											<Copy className='size-4' />
											Повторить
										</Button>
									</div>
								</div>
							)
						})
					)}
				</div>
			</CardContent>
		</Card>
	)
}
