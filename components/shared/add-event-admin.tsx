'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { ImagePlus, Loader2, RefreshCcw, Save } from 'lucide-react'
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
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import type { DashboardEvent } from '@/lib/events'

type EventFormState = {
	label: string
	startsAt: string
	address: string
	kassirUrl: string
	mapsUrl: string
	description: string
	image: string
}

type PanelStatus =
	| {
			type: 'success' | 'error'
			message: string
	  }
	| null

type S3ImageFile = {
	key: string
	url: string
	lastModified: string | null
	size: number | null
}

type DraftMode = 'edit' | 'repeat'
type SaveMode = 'create' | 'edit' | 'repeat'

const EMPTY_FORM: EventFormState = {
	label: '',
	startsAt: '',
	address: '',
	kassirUrl: '',
	mapsUrl: '',
	description: '',
	image: '',
}

const MOSCOW_OFFSET_MS = 3 * 60 * 60 * 1000

interface AddEventAdminProps {
	onSaved?: (event: DashboardEvent, mode: SaveMode) => void
	draftEvent?: DashboardEvent | null
	draftMode?: DraftMode | null
}

function toMoscowDateTimeLocalInput(startsAt: string) {
	const date = new Date(startsAt)
	if (Number.isNaN(date.getTime())) {
		return ''
	}
	const moscowDate = new Date(date.getTime() + MOSCOW_OFFSET_MS)
	return moscowDate.toISOString().slice(0, 16)
}

function formFromEvent(event: DashboardEvent): EventFormState {
	return {
		label: event.label,
		startsAt: toMoscowDateTimeLocalInput(event.startsAt),
		address: event.address,
		kassirUrl: event.kassirUrl,
		mapsUrl: event.mapsUrl,
		description: event.description,
		image: event.image,
	}
}

export function AddEventAdmin({ onSaved, draftEvent, draftMode }: AddEventAdminProps) {
	const [form, setForm] = useState<EventFormState>(EMPTY_FORM)
	const [editingEventId, setEditingEventId] = useState<string | null>(null)
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [previewUrl, setPreviewUrl] = useState<string | null>(null)
	const [submitting, setSubmitting] = useState(false)
	const [status, setStatus] = useState<PanelStatus>(null)
	const [library, setLibrary] = useState<S3ImageFile[]>([])
	const [loadingLibrary, setLoadingLibrary] = useState(false)
	const [libraryLoaded, setLibraryLoaded] = useState(false)

	const previewImage = previewUrl || form.image
	const isEditing = Boolean(editingEventId)
	const isRepeatDraft = draftMode === 'repeat' && !isEditing

	const panelTitle = isEditing
		? 'Редактировать мероприятие'
		: isRepeatDraft
			? 'Повтор мероприятия'
			: 'Добавить мероприятие'

	const submitLabel = submitting
		? isEditing
			? 'Сохраняем изменения...'
			: 'Сохраняем...'
		: isEditing
			? 'Сохранить изменения'
			: isRepeatDraft
				? 'Создать копию'
				: 'Добавить мероприятие'

	const libraryTitle = useMemo(() => {
		if (loadingLibrary) {
			return 'Загрузка изображений...'
		}
		if (libraryLoaded) {
			return `Доступно файлов: ${library.length}`
		}
		return 'Нажмите «Обновить библиотеку», чтобы загрузить изображения'
	}, [library.length, libraryLoaded, loadingLibrary])

	useEffect(() => {
		return () => {
			if (previewUrl) {
				URL.revokeObjectURL(previewUrl)
			}
		}
	}, [previewUrl])

	useEffect(() => {
		if (!draftEvent || !draftMode) {
			return
		}

		setForm(formFromEvent(draftEvent))
		setEditingEventId(draftMode === 'edit' ? draftEvent.id : null)
		setSelectedFile(null)
		setPreviewUrl((current) => {
			if (current) {
				URL.revokeObjectURL(current)
			}
			return null
		})
		setStatus(null)
	}, [draftEvent, draftMode])

	function updateField<K extends keyof EventFormState>(key: K, value: string) {
		setForm((prev) => ({ ...prev, [key]: value }))
		if (status) {
			setStatus(null)
		}
	}

	function resetForm() {
		setForm(EMPTY_FORM)
		setEditingEventId(null)
		setSelectedFile(null)
		if (previewUrl) {
			URL.revokeObjectURL(previewUrl)
		}
		setPreviewUrl(null)
		setStatus(null)
	}

	function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0]
		if (!file) {
			return
		}

		if (previewUrl) {
			URL.revokeObjectURL(previewUrl)
		}
		setSelectedFile(file)
		setPreviewUrl(URL.createObjectURL(file))
		setStatus(null)
	}

	function selectLibraryImage(url: string) {
		if (previewUrl) {
			URL.revokeObjectURL(previewUrl)
		}
		setPreviewUrl(null)
		setSelectedFile(null)
		updateField('image', url)
	}

	async function loadLibrary() {
		setLoadingLibrary(true)
		try {
			const res = await fetch('/api/admin/events/images', {
				method: 'GET',
				cache: 'no-store',
			})
			const json = (await res.json()) as { error?: string; files?: S3ImageFile[] }
			if (!res.ok || !json.files) {
				throw new Error(json.error || 'Не удалось загрузить список изображений')
			}
			setLibrary(json.files)
			setLibraryLoaded(true)
		} catch (error) {
			setStatus({
				type: 'error',
				message:
					error instanceof Error ? error.message : 'Ошибка загрузки библиотеки',
			})
		} finally {
			setLoadingLibrary(false)
		}
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setSubmitting(true)
		setStatus(null)

		if (!selectedFile && !form.image.trim()) {
			setStatus({
				type: 'error',
				message: 'Загрузите файл или выберите изображение из S3.',
			})
			setSubmitting(false)
			return
		}

		const formData = new FormData()
		if (selectedFile) {
			formData.set('file', selectedFile)
		}
		if (editingEventId) {
			formData.set('id', editingEventId)
		}
		formData.set('label', form.label.trim())
		formData.set('startsAt', form.startsAt.trim())
		formData.set('address', form.address.trim())
		formData.set('kassirUrl', form.kassirUrl.trim())
		formData.set('mapsUrl', form.mapsUrl.trim())
		formData.set('description', form.description.trim())
		formData.set('image', form.image.trim())

		try {
			const submitMode: SaveMode = editingEventId
				? 'edit'
				: draftMode === 'repeat'
					? 'repeat'
					: 'create'

			const res = await fetch('/api/admin/events', {
				method: editingEventId ? 'PATCH' : 'POST',
				body: formData,
			})
			const json = (await res.json()) as {
				error?: string
				event?: DashboardEvent
			}
			if (!res.ok || !json.event) {
				throw new Error(json.error || 'Не удалось сохранить мероприятие')
			}

			onSaved?.(json.event, submitMode)

			if (submitMode === 'edit') {
				setForm(formFromEvent(json.event))
				setEditingEventId(json.event.id)
				setSelectedFile(null)
				if (previewUrl) {
					URL.revokeObjectURL(previewUrl)
				}
				setPreviewUrl(null)
				setStatus({
					type: 'success',
					message: 'Изменения сохранены.',
				})
			} else {
				resetForm()
				setStatus({
					type: 'success',
					message:
						submitMode === 'repeat'
							? 'Копия мероприятия создана.'
							: 'Мероприятие добавлено.',
				})
			}
		} catch (error) {
			setStatus({
				type: 'error',
				message: error instanceof Error ? error.message : 'Unknown error',
			})
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<div className='grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]'>
			<form onSubmit={handleSubmit}>
				<Card className='border-white/10 bg-black/40 shadow-xl backdrop-blur'>
					<CardHeader className='space-y-3'>
						<CardTitle className='text-xl'>{panelTitle}</CardTitle>
						<CardDescription>
							Дата и время указываются в часовом поясе Москвы (UTC+3).
						</CardDescription>
						<div className='flex flex-wrap items-center gap-2'>
							{isEditing && <Badge variant='secondary'>Режим редактирования</Badge>}
							{isRepeatDraft && <Badge variant='secondary'>Режим повтора</Badge>}
							{(isEditing || isRepeatDraft) && (
								<Button type='button' size='sm' variant='outline' onClick={resetForm}>
									Очистить форму
								</Button>
							)}
						</div>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='grid gap-4 sm:grid-cols-2'>
							<div className='grid gap-2 sm:col-span-2'>
								<Label htmlFor='label'>Название</Label>
								<Input
									id='label'
									value={form.label}
									onChange={(e) => updateField('label', e.target.value)}
									placeholder='Иммерсивный спектакль'
									required
								/>
							</div>

							<div className='grid gap-2'>
								<Label htmlFor='startsAt'>Дата и время (МСК)</Label>
								<Input
									id='startsAt'
									type='datetime-local'
									value={form.startsAt}
									onChange={(e) => updateField('startsAt', e.target.value)}
									required
								/>
							</div>

							<div className='grid gap-2'>
								<Label htmlFor='address'>Адрес</Label>
								<Input
									id='address'
									value={form.address}
									onChange={(e) => updateField('address', e.target.value)}
									placeholder='Москва, ...'
									required
								/>
							</div>

							<div className='grid gap-2 sm:col-span-2'>
								<Label htmlFor='description'>Описание</Label>
								<Textarea
									id='description'
									className='min-h-28 resize-y'
									value={form.description}
									onChange={(e) => updateField('description', e.target.value)}
								/>
							</div>

							<div className='grid gap-2'>
								<Label htmlFor='kassirUrl'>Ссылка на Кассир.РУ</Label>
								<Input
									id='kassirUrl'
									type='url'
									value={form.kassirUrl}
									onChange={(e) => updateField('kassirUrl', e.target.value)}
								/>
							</div>

							<div className='grid gap-2'>
								<Label htmlFor='mapsUrl'>Ссылка на карту</Label>
								<Input
									id='mapsUrl'
									type='url'
									value={form.mapsUrl}
									onChange={(e) => updateField('mapsUrl', e.target.value)}
								/>
							</div>
						</div>

						<div className='grid gap-2'>
							<Label htmlFor='file'>Загрузить новое изображение</Label>
							<Input
								id='file'
								name='file'
								type='file'
								accept='image/*'
								onChange={handleFileChange}
							/>
						</div>

						<div className='grid gap-2'>
							<Label htmlFor='image'>Или URL изображения (S3/внешний)</Label>
							<Input
								id='image'
								type='url'
								placeholder='https://...'
								value={form.image}
								onChange={(e) => updateField('image', e.target.value)}
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

						<div className='flex items-center justify-end'>
							<Button
								type='submit'
								disabled={submitting}
								className='w-full sm:w-auto sm:min-w-56'
							>
								<Save />
								{submitLabel}
							</Button>
						</div>
					</CardContent>
				</Card>
			</form>

			<div className='space-y-4 lg:sticky lg:top-4 lg:self-start'>
				<Card className='overflow-hidden border-white/10 bg-black/40 shadow-xl backdrop-blur'>
					<CardHeader className='space-y-2'>
						<div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
							<CardTitle className='min-w-0 text-base'>Изображения из S3/events</CardTitle>
							<Button
								type='button'
								variant='outline'
								size='sm'
								onClick={loadLibrary}
								disabled={loadingLibrary}
								className='w-full justify-center sm:w-auto'
							>
								{loadingLibrary ? <Loader2 className='animate-spin' /> : <RefreshCcw />}
								Обновить
							</Button>
						</div>
						<CardDescription>{libraryTitle}</CardDescription>
					</CardHeader>
					<CardContent className='space-y-2'>
						<div className='max-h-[320px] space-y-2 overflow-x-hidden overflow-y-auto pr-1'>
							{library.map((file, index) => {
								const selected = form.image === file.url && !selectedFile
								return (
									<button
										key={file.key}
										type='button'
										onClick={() => selectLibraryImage(file.url)}
										className={cn(
											'w-full overflow-hidden rounded-lg border p-2 text-left transition-colors',
											selected
												? 'border-emerald-400/50 bg-emerald-500/10'
												: 'border-white/10 bg-black/30 hover:bg-black/50',
										)}
									>
										<div className='flex min-w-0 gap-2'>
											<div className='relative h-16 w-12 shrink-0 overflow-hidden rounded border border-white/10 bg-black/40'>
												<Image
													src={file.url}
													alt={file.key}
													fill
													className='pointer-events-none object-cover'
												/>
											</div>
												<div className='min-w-0'>
													<div className='text-xs font-medium text-foreground/80'>
														Изображение {index + 1}
													</div>
													<div className='text-[11px] text-foreground/60'>
														{file.lastModified ?? 'Дата неизвестна'}
													</div>
												</div>
											</div>
										</button>
								)
							})}

							{libraryLoaded && library.length === 0 && (
								<div className='rounded-lg border border-white/10 p-3 text-sm text-foreground/60'>
									В папке `events` пока нет изображений.
								</div>
							)}
						</div>
					</CardContent>
				</Card>

				<Card className='border-white/10 bg-black/40 shadow-xl backdrop-blur'>
					<CardHeader className='space-y-2'>
						<CardTitle className='text-base'>Предпросмотр</CardTitle>
						<CardDescription>
							{previewImage ? 'Изображение выбрано' : 'Нет изображения'}
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-3'>
						<div className='relative overflow-hidden rounded-xl border border-white/15 bg-black/40'>
							<div className='relative aspect-[3/4]'>
								{previewImage ? (
									<Image
										src={previewImage}
										alt='Афиша'
										fill
										className='pointer-events-none object-cover'
									/>
								) : (
									<div className='flex h-full items-center justify-center text-sm text-muted-foreground'>
										<ImagePlus className='mr-2' />
										Добавьте изображение
									</div>
								)}
							</div>
						</div>
						<div className='space-y-2'>
							<Badge variant='outline'>{form.label || 'Без названия'}</Badge>
							<Badge variant='outline'>{form.startsAt || 'Дата не выбрана'}</Badge>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
