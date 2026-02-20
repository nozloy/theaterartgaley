'use client'

import { useMemo, useState } from 'react'
import { LogOut } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { AddEventAdmin } from '@/components/shared/add-event-admin'
import { EventsListAdmin } from '@/components/shared/events-list-admin'
import { UsersAdmin } from '@/components/shared/users-admin'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { DashboardUser } from '@/lib/admin-users'
import type { DashboardEvent } from '@/lib/events'

interface DashboardAdminProps {
	userName?: string
	userEmail?: string
	currentUserId: string
	users: DashboardUser[]
	events: DashboardEvent[]
}

type AdminTab = 'create' | 'all' | 'users'
type DraftMode = 'edit' | 'repeat'
type SaveMode = 'create' | 'edit' | 'repeat'

type EventDraft = {
	mode: DraftMode
	event: DashboardEvent
}

function toInitials(name?: string, email?: string) {
	if (name?.trim()) {
		return name
			.trim()
			.split(' ')
			.slice(0, 2)
			.map((part) => part[0]?.toUpperCase())
			.join('')
	}
	return email?.slice(0, 2).toUpperCase() || 'AD'
}

export function DashboardAdmin({
	userName,
	userEmail,
	currentUserId,
	users,
	events,
}: DashboardAdminProps) {
	const initials = useMemo(() => toInitials(userName, userEmail), [userName, userEmail])
	const [activeTab, setActiveTab] = useState<AdminTab>('create')
	const [eventsState, setEventsState] = useState(events)
	const [eventDraft, setEventDraft] = useState<EventDraft | null>(null)

	async function handleSignOut() {
		await authClient.signOut()
		window.location.href = '/sign-in'
	}

	function handleSaved(event: DashboardEvent, mode: SaveMode) {
		setEventsState((prev) => {
			if (mode === 'edit') {
				return prev.map((item) => (item.id === event.id ? event : item))
			}
			return [event, ...prev]
		})

		if (mode !== 'edit') {
			setEventDraft(null)
		}
	}

	return (
		<div className='space-y-4'>
			<div className='rounded-xl border border-white/10 bg-black/40 p-4 shadow-xl backdrop-blur'>
				<div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
					<div className='flex min-w-0 items-center gap-3'>
						<Avatar className='h-11 w-11 border border-white/20'>
							<AvatarFallback>{initials}</AvatarFallback>
						</Avatar>
						<div className='min-w-0 space-y-1'>
							<div className='text-xl font-semibold sm:text-2xl'>
								Панель администратора
							</div>
							<div className='min-w-0 text-sm text-foreground/70'>
								<div className='truncate'>{userName ?? 'Администратор'}</div>
								{userEmail ? (
									<div className='break-all text-xs text-foreground/60 sm:text-sm'>
										{userEmail}
									</div>
								) : null}
							</div>
						</div>
					</div>
					<Button
						type='button'
						variant='outline'
						onClick={handleSignOut}
						className='w-full sm:w-auto'
					>
						<LogOut />
						Выйти
					</Button>
				</div>
			</div>

			<Tabs
				value={activeTab}
				onValueChange={(value) => setActiveTab(value as AdminTab)}
				className='w-full'
			>
				<TabsList className='sticky top-2 z-20 grid h-auto w-full grid-cols-3 rounded-xl border border-white/10 bg-black/60 p-1 backdrop-blur'>
					<TabsTrigger
						value='create'
						aria-label='Добавить мероприятие'
						className='h-11 w-full min-w-0 whitespace-normal px-1 text-center text-xs leading-tight sm:h-10 sm:whitespace-nowrap sm:px-3 sm:text-sm'
					>
						<span className='sm:hidden'>Добавить</span>
						<span className='hidden sm:inline'>Добавить мероприятие</span>
					</TabsTrigger>
					<TabsTrigger
						value='all'
						aria-label='Весь список мероприятий'
						className='h-11 w-full min-w-0 whitespace-normal px-1 text-center text-xs leading-tight sm:h-10 sm:whitespace-nowrap sm:px-3 sm:text-sm'
					>
						<span className='sm:hidden'>Список</span>
						<span className='hidden sm:inline'>Весь список</span>
					</TabsTrigger>
					<TabsTrigger
						value='users'
						className='h-11 w-full min-w-0 whitespace-normal px-1 text-center text-xs leading-tight sm:h-10 sm:whitespace-nowrap sm:px-3 sm:text-sm'
					>
						Пользователи
					</TabsTrigger>
				</TabsList>

				<TabsContent value='create' className='mt-4'>
					<AddEventAdmin
						draftEvent={eventDraft?.event ?? null}
						draftMode={eventDraft?.mode ?? null}
						onSaved={handleSaved}
					/>
				</TabsContent>

				<TabsContent value='all' className='mt-4'>
					<EventsListAdmin
						initialEvents={eventsState}
						onEdit={(event) => {
							setEventDraft({ mode: 'edit', event: { ...event } })
							setActiveTab('create')
						}}
						onRepeat={(event) => {
							setEventDraft({ mode: 'repeat', event: { ...event } })
							setActiveTab('create')
						}}
					/>
				</TabsContent>

				<TabsContent value='users' className='mt-4'>
					<UsersAdmin initialUsers={users} currentUserId={currentUserId} />
				</TabsContent>
			</Tabs>
		</div>
	)
}
