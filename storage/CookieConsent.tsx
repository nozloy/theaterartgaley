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
		<div className='fixed bottom-4 z-50 max-w-md p-2'>
			<div className=' bg-black backdrop-blur-xl p-4 rounded-xl shadow-xl flex flex-row   items-center justify-between gap-2 '>
				<p className='text-sm text-foreground text-center'>
					Мы используем файлы cookie и сервисы метрики для улучшения работы
					сайта.
				</p>
				<Button size='lg' onClick={acceptCookies}>
					Понятно
				</Button>
			</div>
		</div>
	)
}
