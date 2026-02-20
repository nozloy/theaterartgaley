'use client'

import { useMemo, useState } from 'react'
import { Loader2, RefreshCcw, Search, Shield, ShieldOff, Users } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
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
import { Separator } from '@/components/ui/separator'
import type { DashboardUser } from '@/lib/admin-users'
import { cn } from '@/lib/utils'

type PanelStatus =
	| {
			type: 'success' | 'error'
			message: string
	  }
	| null

interface UsersAdminProps {
	initialUsers: DashboardUser[]
	currentUserId: string
}

function toInitials(name: string, email: string) {
	if (name.trim()) {
		return name
			.trim()
			.split(' ')
			.slice(0, 2)
			.map((part) => part[0]?.toUpperCase())
			.join('')
	}
	return email.slice(0, 2).toUpperCase()
}

function formatDate(input: string) {
	const date = new Date(input)
	if (Number.isNaN(date.getTime())) {
		return ''
	}
	return new Intl.DateTimeFormat('ru-RU', {
		dateStyle: 'medium',
		timeStyle: 'short',
	}).format(date)
}

export function UsersAdmin({ initialUsers, currentUserId }: UsersAdminProps) {
	const [users, setUsers] = useState(initialUsers)
	const [query, setQuery] = useState('')
	const [status, setStatus] = useState<PanelStatus>(null)
	const [savingUserId, setSavingUserId] = useState<string | null>(null)
	const [refreshing, setRefreshing] = useState(false)

	const adminsCount = useMemo(
		() => users.filter((user) => user.role === 'admin').length,
		[users],
	)

	const filteredUsers = useMemo(() => {
		const normalized = query.trim().toLowerCase()
		if (!normalized) {
			return users
		}
		return users.filter((user) => {
			return (
				user.name.toLowerCase().includes(normalized) ||
				user.email.toLowerCase().includes(normalized)
			)
		})
	}, [query, users])

	async function refreshUsers() {
		setRefreshing(true)
		setStatus(null)
		try {
			const res = await fetch('/api/admin/users', {
				method: 'GET',
				cache: 'no-store',
			})
			const json = (await res.json()) as {
				error?: string
				users?: DashboardUser[]
			}

			if (!res.ok || !json.users) {
				throw new Error(json.error || 'Не удалось загрузить пользователей')
			}

			setUsers(json.users)
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Unknown error'
			setStatus({
				type: 'error',
				message,
			})
		} finally {
			setRefreshing(false)
		}
	}

	async function updateUserRole(userId: string, nextRole: 'admin' | 'user') {
		setSavingUserId(userId)
		setStatus(null)
		try {
			const res = await fetch('/api/admin/users', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userId,
					role: nextRole,
				}),
			})
			const json = (await res.json()) as {
				error?: string
				user?: DashboardUser
			}
			if (!res.ok || !json.user) {
				throw new Error(json.error || 'Не удалось обновить роль пользователя')
			}

			setUsers((prev) =>
				prev.map((user) => (user.id === json.user?.id ? json.user : user)),
			)
			setStatus({
				type: 'success',
				message:
					nextRole === 'admin'
						? 'Пользователь назначен администратором.'
						: 'Роль администратора снята.',
			})
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Unknown error'
			setStatus({
				type: 'error',
				message,
			})
		} finally {
			setSavingUserId(null)
		}
	}

	return (
		<Card className='border-white/10 bg-black/40 shadow-xl backdrop-blur'>
			<CardHeader className='space-y-3'>
				<div className='flex items-start justify-between gap-3'>
					<div>
						<CardTitle className='text-xl'>Пользователи</CardTitle>
						<CardDescription>
							Назначайте и снимайте права администратора.
						</CardDescription>
					</div>
					<Button
						type='button'
						variant='outline'
						size='sm'
						onClick={refreshUsers}
						disabled={refreshing}
					>
						{refreshing ? <Loader2 className='animate-spin' /> : <RefreshCcw />}
						Обновить
					</Button>
				</div>

				<div className='flex flex-wrap gap-2'>
					<Badge className='gap-1'>
						<Users />
						Всего: {users.length}
					</Badge>
					<Badge variant='outline' className='gap-1'>
						<Shield />
						Администраторов: {adminsCount}
					</Badge>
				</div>
			</CardHeader>

			<CardContent className='space-y-4'>
				<div className='relative'>
					<Search className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground' />
					<Input
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder='Поиск по имени или email'
						className='pl-10'
					/>
				</div>

				{status && (
					<div
						className={cn(
							'rounded-lg border p-3 text-sm',
							status.type === 'success'
								? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
								: 'border-red-500/30 bg-red-500/10 text-red-200',
						)}
					>
						{status.message}
					</div>
				)}

				<div className='space-y-3'>
					{filteredUsers.length === 0 ? (
						<div className='rounded-lg border border-white/10 p-4 text-sm text-muted-foreground'>
							Пользователи не найдены.
						</div>
					) : (
						filteredUsers.map((user) => {
							const isCurrentUser = user.id === currentUserId
							const isAdmin = user.role === 'admin'
							const isSaving = savingUserId === user.id

							return (
								<div
									key={user.id}
									className='rounded-xl border border-white/10 bg-black/30 p-3 sm:p-4'
								>
									<div className='flex items-start justify-between gap-3'>
										<div className='flex min-w-0 items-start gap-3'>
											<Avatar className='h-10 w-10 border border-white/20'>
												<AvatarFallback>{toInitials(user.name, user.email)}</AvatarFallback>
											</Avatar>
											<div className='min-w-0'>
												<div className='truncate text-sm font-semibold sm:text-base'>
													{user.name || 'Без имени'}
												</div>
												<div className='truncate text-sm text-foreground/70'>{user.email}</div>
											</div>
										</div>
										<div className='flex shrink-0 flex-wrap gap-2'>
											<Badge variant={isAdmin ? 'default' : 'outline'}>
												{isAdmin ? 'admin' : 'user'}
											</Badge>
											{isCurrentUser && <Badge variant='secondary'>Вы</Badge>}
										</div>
									</div>

									<Separator className='my-3' />

									<div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
										<div className='text-xs text-foreground/60'>
											Создан: {formatDate(user.createdAt) || '—'}
										</div>
										{isAdmin ? (
											<Button
												type='button'
												variant='outline'
												size='sm'
												className='w-full sm:w-auto'
												disabled={isSaving || isCurrentUser}
												onClick={() => updateUserRole(user.id, 'user')}
											>
												{isSaving ? (
													<Loader2 className='animate-spin' />
												) : (
													<ShieldOff />
												)}
												Снять роль администратора
											</Button>
										) : (
											<Button
												type='button'
												size='sm'
												className='w-full sm:w-auto'
												disabled={isSaving}
												onClick={() => updateUserRole(user.id, 'admin')}
											>
												{isSaving ? <Loader2 className='animate-spin' /> : <Shield />}
												Назначить администратором
											</Button>
										)}
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
