'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export default function CookieConsent() {
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		const accepted = localStorage.getItem('cookie-accepted')
		if (!accepted) setVisible(true)
	}, [])

	const acceptCookies = () => {
		localStorage.setItem('cookie-accepted', 'true')
		setVisible(false)
	}

	if (!visible) return null

	return (
		<div className='flex flex-col items-start gap-3 rounded-2xl border border-white/20 bg-black/70 p-4 shadow-[0_18px_60px_-28px_rgba(0,0,0,0.95)] backdrop-blur-2xl sm:flex-row sm:items-center sm:justify-between'>
			<p className='text-left text-sm leading-relaxed text-foreground sm:text-base'>
				Мы используем файлы cookie и сервисы метрики для улучшения работы сайта.
			</p>
			<Button size='sm' onClick={acceptCookies} className='shrink-0'>
				Понятно
			</Button>
		</div>
	)
}
