import { betterAuth } from 'better-auth'
import { nextCookies } from 'better-auth/next-js'
import { genericOAuth } from 'better-auth/plugins/generic-oauth'
import type { OAuth2Tokens } from 'better-auth/oauth2'
import { db } from './db'

type YandexUserInfoResponse = {
	id?: string | number
	login?: string
	default_email?: string
	emails?: string[]
	real_name?: string
	display_name?: string
	default_avatar_id?: string
}

const yandexClientId = process.env.YANDEX_CLIENT_ID
const yandexClientSecret = process.env.YANDEX_CLIENT_SECRET
const adminEmails = new Set(
	(process.env.ADMIN_EMAILS ?? '')
		.split(',')
		.map((email) => email.trim().toLowerCase())
		.filter(Boolean),
)

if (!yandexClientId || !yandexClientSecret) {
	throw new Error('YANDEX_CLIENT_ID and YANDEX_CLIENT_SECRET are required')
}

async function getYandexUserInfo(tokens: OAuth2Tokens) {
	const response = await fetch('https://login.yandex.ru/info?format=json', {
		method: 'GET',
		headers: {
			Authorization: `OAuth ${tokens.accessToken}`,
		},
	})

	if (!response.ok) {
		return null
	}

	const profile = (await response.json()) as YandexUserInfoResponse
	const email = profile.default_email ?? profile.emails?.[0]
	const id = profile.id ? String(profile.id) : ''

	if (!id || !email) {
		return null
	}

	const image = profile.default_avatar_id
		? `https://avatars.yandex.net/get-yapic/${profile.default_avatar_id}/islands-200`
		: undefined

	return {
		id,
		email: email.toLowerCase(),
		name:
			profile.real_name ??
			profile.display_name ??
			profile.login ??
			email.toLowerCase(),
		image,
		emailVerified: Boolean(profile.default_email),
	}
}

export const auth = betterAuth({
	baseURL: process.env.BASE_URL,
	secret: process.env.BETTER_AUTH_SECRET ?? process.env.AUTH_SECRET,
	database: db,
	trustedOrigins: process.env.BASE_URL ? [process.env.BASE_URL] : undefined,
	databaseHooks: {
		user: {
			create: {
				before: async (user) => {
					const email = String(user.email ?? '').toLowerCase()
					return {
						data: {
							...user,
							role: adminEmails.has(email) ? 'admin' : 'user',
						},
					}
				},
			},
		},
	},
	user: {
		additionalFields: {
			role: {
				type: 'string',
				required: true,
				defaultValue: 'user',
				input: false,
			},
		},
	},
	plugins: [
		nextCookies(),
		genericOAuth({
			config: [
				{
					providerId: 'yandex',
					clientId: yandexClientId,
					clientSecret: yandexClientSecret,
					authorizationUrl: 'https://oauth.yandex.ru/authorize',
					tokenUrl: 'https://oauth.yandex.ru/token',
					userInfoUrl: 'https://login.yandex.ru/info?format=json',
					authentication: 'post',
					getUserInfo: getYandexUserInfo,
				},
			],
		}),
	],
})
