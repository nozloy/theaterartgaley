'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { EventData } from '@/lib/server-event'

interface EditEventProps {
	data: EventData
}
export function EditEvent({ data }: EditEventProps) {
	async function handleSubmit(formData: FormData) {
		const payload = {
			label: String(formData.get('label')),
			date: String(formData.get('date')),
			time: String(formData.get('time') ?? ''),
			address: String(formData.get('address')),
			kassirUrl: String(formData.get('kassirUrl') ?? ''),
			mapsUrl: String(formData.get('mapsUrl') ?? ''),
			description: String(formData.get('description') ?? ''),
			image: data.image,
			password: String(formData.get('password')),
		}

		try {
			const res = await fetch('/api/event', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			})

			if (!res.ok) {
				alert('Ошибка сохранения события')
				return
			}
			alert('Событие успешно сохранено!')
		} catch (e) {
			alert('Ошибка: ' + (e as Error).message)
		}
	}
	return (
		<form
			className='p-4'
			onSubmit={e => {
				e.preventDefault()
				handleSubmit(new FormData(e.currentTarget))
			}}
		>
			<div className='flex flex-col gap-6'>
				<div className='grid gap-2'>
					<Label htmlFor='label'>Название</Label>
					<Input
						id='label'
						name='label'
						type='text'
						placeholder='Название события'
						defaultValue={data.label}
						required
					/>
				</div>
				<div className='grid gap-2'>
					<Label htmlFor='date'>Дата</Label>
					<Input
						id='date'
						name='date'
						type='text'
						placeholder='Дата события'
						defaultValue={data.date}
						required
					/>
				</div>
				<div className='grid gap-2'>
					<Label htmlFor='time'>Время</Label>
					<Input
						id='time'
						name='time'
						type='time'
						placeholder='Время события'
						defaultValue={data.time}
						required
					/>
				</div>
				<div className='grid gap-2'>
					<Label htmlFor='address'>Адрес прописью</Label>
					<Input
						id='address'
						name='address'
						type='text'
						placeholder='Адрес события'
						defaultValue={data.address}
						required
					/>
				</div>
				<div className='grid gap-2'>
					<Label htmlFor='linkkassir'>Ссылка на Кассир.РУ</Label>
					<Input
						id='linkkassir'
						name='kassirUrl'
						type='text'
						placeholder='Ссылка на Кассир.РУ'
						defaultValue={data.kassirUrl}
						required
					/>
				</div>
				<div className='grid gap-2'>
					<Label htmlFor='linkMap'>Ссылка на Яндекс.Карты</Label>
					<Input
						id='linkMap'
						name='mapsUrl'
						type='text'
						placeholder='Ссылка на Кассир.РУ'
						defaultValue={data.mapsUrl}
						required
					/>
				</div>
				<div className='grid gap-2'>
					<Label htmlFor='description'>Описание</Label>
					<Textarea
						className='resize-y'
						id='description'
						name='description'
						placeholder='Описание события'
						defaultValue={data.description}
						required
					/>
				</div>
				<div className='grid gap-2'>
					<Label htmlFor='password'>Пароль</Label>
					<Input
						type='password'
						id='password'
						name='password'
						placeholder='Пароль'
						required
					/>
				</div>
			</div>
			<Button type='submit' className='mt-4 w-full'>
				Сохранить изменения
			</Button>
		</form>
	)
}
