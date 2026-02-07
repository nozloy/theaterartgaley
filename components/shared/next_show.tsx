'use client'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Label } from '../ui/label'
import { EventData } from '@/lib/server-event'
import { ButtonsBlock } from './buttons_block'
import { useState } from 'react'

interface Props {
	className?: string
	event: EventData
}

export function NextShow({ className, event }: Props) {
	const [show, setShow] = useState(false)
	return (
		<div
			onClick={() => setShow(!show)}
			className={cn(
				'group w-full relative select-none flex flex-col gap-2 items-start justify-between bg-white/10 backdrop-blur-md rounded-3xl p-2 cursor-pointer',
				className,
			)}
		>
			<div className='relative w-full h-full flex items-center justify-center'>
				{event && (
					<Image
						src={event.image}
						alt='poster'
						loading='eager'
						width={500}
						height={500}
						className='z-10 rounded-3xl object-cover drop-shadow-lg select-none pointer-events-none'
					/>
				)}

				<div
					className={cn(
						'absolute top-0 left-0 w-full h-full bg-black/70 rounded-3xl z-30 flex items-center justify-center p-4 duration-700 ease-in-out ',
						show ? 'opacity-100 select-none' : 'opacity-0',
					)}
				>
					<Label className='text-foreground text-start text-lg'>
						{event?.description}
					</Label>
				</div>

				<div className='z-20 absolute top-1 right-3'>
					<div className='flex items-center justify-end w-30 text-xl p-1 text-foreground/70 font-bold text-shadow-sm text-shadow-black'>
						{event?.date}
					</div>
				</div>
				<div className='z-20 absolute top-1 left-3'>
					<div className='flex items-center justify-start w-30 text-xl p-1 text-foreground/70 font-bold text-shadow-sm text-shadow-black'>
						{event?.time}
					</div>
				</div>
			</div>
			<div className='w-full h-full flex flex-col pt-1 items-center justify-center gap-1 text-foreground text-xl font-bold'>
				<Label className='text-xl text-center'>{event?.label}</Label>
				<Label className='text-orange-600 text-base text-center'>
					Иммерсивный спектакль
				</Label>
				<Label className='mt-auto pb-2 text-foreground/70 text-[13.5px] leading-snug text-left'></Label>
			</div>
			<ButtonsBlock className='mt-2 mb-1' eventData={event} />
		</div>
	)
}
