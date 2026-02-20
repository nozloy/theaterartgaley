import type { Metadata } from 'next'
import { SignInClient } from '@/components/shared/sign-in-client'

export const metadata: Metadata = {
	title: 'Вход в админ-панель',
	description: 'Страница авторизации администраторов театра АРТГалей.',
	robots: {
		index: false,
		follow: false,
	},
}

export default function SignInPage() {
	return <SignInClient />
}
