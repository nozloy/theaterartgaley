'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { TrapForLonelyMan } from './shows/trap_for_lonely_man'

export default function TrapModal() {
	const [modalOpen, setModalOpen] = useState(false)

	return (
		<div className='w-full flex flex-col items-center'>
			<button
				className='mb-2 px-4 py-2 bg-red-600 text-white rounded-lg'
				onClick={() => setModalOpen(!modalOpen)}
			>
				{modalOpen ? 'Скрыть подробности' : 'Показать подробности'}
			</button>

			<div
				className={cn(
					'transition-all duration-500 ease-in-out overflow-hidden w-full',
					modalOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0',
				)}
			>
				<TrapForLonelyMan />
			</div>
		</div>
	)
}
