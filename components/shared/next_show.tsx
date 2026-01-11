'use client'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Label } from '../ui/label'
import { EventData } from '@/lib/event'

interface Props {
	className?: string
	event: EventData
}

export function NextShow({ className, event }: Props) {
	return (
		<div
			className={cn(
				'group w-full relative select-none flex flex-row gap-2 items-start justify-between bg-white/10 backdrop-blur-md rounded-3xl p-2 cursor-pointer',
				className,
			)}
		>
			<div className='relative w-[180px] h-full flex items-center justify-center'>
				{event && (
					<Image
						src={event.image}
						alt='poster'
						loading='eager'
						width={200}
						height={240}
						className='z-10 brightness-150 rounded-3xl object-cover drop-shadow-lg'
					/>
				)}
			</div>

			<div className='w-[200px] h-full flex flex-col pt-1 gap-2 text-foreground text-xl font-bold'>
				<div className='flex items-center justify-center w-[130px] text-lg px-2 py-1 mb-1 rounded-xl bg-red-600 text-foreground font-bold'>
					{event?.date}
				</div>

				<Label className='text-[20px] group-hover:underline'>
					{event?.label}
				</Label>

				<Label className='text-red-600 text-[16px]'>
					Иммерсивный спектакль
				</Label>

				<Label className='mt-auto pb-2 text-foreground/70 text-[13.5px] leading-snug text-left'>
					{event?.address}
				</Label>
			</div>
		</div>
	)
}
