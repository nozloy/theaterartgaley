'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'

export function SignInClient() {
	const [pending, setPending] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const callbackURL = useMemo(() => '/dashboard', [])

	async function handleSignIn() {
		setPending(true)
		setError(null)

		try {
			const result = await authClient.signIn.oauth2({
				providerId: 'yandex',
				callbackURL,
			})

			if (result.error) {
				setError(result.error.message || 'Не удалось выполнить вход')
				return
			}

			if (result.data?.url) {
				window.location.href = result.data.url
			}
		} catch (e) {
			setError(e instanceof Error ? e.message : 'Ошибка входа')
		} finally {
			setPending(false)
		}
	}

	return (
		<div className='min-h-screen w-full flex items-center justify-center px-4'>
			<div className='w-full max-w-md rounded-xl border border-white/20 bg-black/40 p-6 space-y-4'>
				<h1 className='text-2xl font-bold'>Вход в админку</h1>
				<p className='text-sm text-foreground/70'>
					Для доступа к панели управления войдите через Яндекс.
				</p>

				{error && (
					<div className='rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300'>
						{error}
					</div>
				)}

				<Button
					type='button'
					className='w-full'
					onClick={handleSignIn}
					disabled={pending}
				>
					{pending ? 'Переход к Яндекс...' : 'Войти через Яндекс'}
				</Button>
			</div>
		</div>
	)
}
