'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { EventData } from '@/lib/server-event'
import { useState } from 'react'
import Image from 'next/image'

interface EditEventProps {
	data: EventData
}
export function EditEvent({ data }: EditEventProps) {
	const [imageUrl, setImageUrl] = useState(data.image)
	const [previewUrl, setPreviewUrl] = useState<string | null>(null)
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [submitting, setSubmitting] = useState(false)

	function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0]
		if (file) {
			setSelectedFile(file)
			setPreviewUrl(URL.createObjectURL(file))
		}
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setSubmitting(true)
		const formData = new FormData(e.currentTarget)

		// Append file if selected
		if (selectedFile) {
			formData.set('file', selectedFile)
		}
		// Ensure current image is kept if no new file
		formData.set('image', imageUrl)

		try {
			const res = await fetch('/api/event', {
				method: 'POST',
				body: formData, // Send FormData directly
			})

			if (!res.ok) {
				const json = await res.json()
				throw new Error(json.error || 'Ошибка сохранения события')
			}
			
			alert('Событие успешно сохранено!')
			// Ideally refresh or redirect here
		} catch (e) {
			const msg = e instanceof Error ? e.message : 'Unknown error'
			alert('Ошибка: ' + msg)
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<form className='p-4' onSubmit={handleSubmit}>
			<div className='flex flex-col gap-6'>
				<div className='grid gap-2'>
					<Label>Изображение</Label>
					<div className='flex items-center gap-4'>
						{(previewUrl || imageUrl) && (
							<div className='relative h-20 w-20 overflow-hidden rounded-md border'>
								<Image
									src={previewUrl || imageUrl}
									alt='Preview'
									fill
									className='object-cover'
								/>
							</div>
						)}
						<Input
							type='file'
							accept='image/*'
							onChange={handleFileChange}
							name="file" // Name it 'file' but we handle it manually too to be safe/explicit or just rely on form
						/>
					</div>
				</div>

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
			<Button type='submit' className='mt-4 w-full' disabled={submitting}>
				{submitting ? 'Сохранение...' : 'Сохранить изменения'}
			</Button>
		</form>
	)
}
