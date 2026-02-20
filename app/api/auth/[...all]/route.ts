import { toNextJsHandler } from 'better-auth/next-js'
import { auth } from '@/lib/auth'
import { ensureAuthSchema } from '@/lib/ensure-auth-schema'

const handlers = toNextJsHandler(auth)

export async function GET(
	...args: Parameters<typeof handlers.GET>
): ReturnType<typeof handlers.GET> {
	await ensureAuthSchema()
	return handlers.GET(...args)
}

export async function POST(
	...args: Parameters<typeof handlers.POST>
): ReturnType<typeof handlers.POST> {
	await ensureAuthSchema()
	return handlers.POST(...args)
}
