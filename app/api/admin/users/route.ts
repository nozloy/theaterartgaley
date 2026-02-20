import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

type UserRow = {
	id: string
	name: string
	email: string
	role: string
	createdAt: string
	updatedAt: string
}

async function getAdminSession(request: Request) {
	const session = await auth.api.getSession({
		headers: request.headers,
	})

	if (!session) {
		return { error: 'Unauthorized', status: 401 as const }
	}

	const role = (session.user as { role?: string }).role
	if (role !== 'admin') {
		return { error: 'Forbidden', status: 403 as const }
	}

	return { session }
}

export async function GET(request: Request) {
	try {
		const access = await getAdminSession(request)
		if ('error' in access) {
			return NextResponse.json({ error: access.error }, { status: access.status })
		}

		const result = await db.query<UserRow>(
			`SELECT id, name, email, role, "createdAt", "updatedAt"
			 FROM "user"
			 ORDER BY
			 	CASE WHEN role = 'admin' THEN 0 ELSE 1 END,
				"createdAt" DESC`,
		)

		return NextResponse.json({ users: result.rows })
	} catch (error) {
		console.error('Failed to load users', error)
		return NextResponse.json(
			{ error: (error as Error).message },
			{ status: 500 },
		)
	}
}

export async function PATCH(request: Request) {
	try {
		const access = await getAdminSession(request)
		if ('error' in access) {
			return NextResponse.json({ error: access.error }, { status: access.status })
		}

		const sessionUser = access.session.user as { id?: string }
		const currentUserId = String(sessionUser.id ?? '')
		if (!currentUserId) {
			return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
		}

		const body = (await request.json()) as { userId?: string; role?: string }
		const userId = String(body.userId ?? '').trim()
		const role = String(body.role ?? '').trim()

		if (!userId || !['admin', 'user'].includes(role)) {
			return NextResponse.json(
				{ error: 'Invalid payload. Expected userId and role(admin|user)' },
				{ status: 400 },
			)
		}

		const existing = await db.query<{ id: string; role: string }>(
			`SELECT id, role FROM "user" WHERE id = $1 LIMIT 1`,
			[userId],
		)
		const target = existing.rows[0]
		if (!target) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 })
		}

		if (userId === currentUserId && role !== 'admin') {
			return NextResponse.json(
				{ error: 'You cannot remove admin role from your own account' },
				{ status: 400 },
			)
		}

		if (target.role === 'admin' && role === 'user') {
			const adminsCount = await db.query<{ count: string }>(
				`SELECT COUNT(*)::text AS count FROM "user" WHERE role = 'admin'`,
			)
			const totalAdmins = Number(adminsCount.rows[0]?.count ?? '0')
			if (totalAdmins <= 1) {
				return NextResponse.json(
					{ error: 'At least one admin must remain in the system' },
					{ status: 400 },
				)
			}
		}

		const updated = await db.query<UserRow>(
			`UPDATE "user"
			 SET role = $1, "updatedAt" = NOW()
			 WHERE id = $2
			 RETURNING id, name, email, role, "createdAt", "updatedAt"`,
			[role, userId],
		)

		return NextResponse.json({ ok: true, user: updated.rows[0] })
	} catch (error) {
		console.error('Failed to update user role', error)
		return NextResponse.json(
			{ error: (error as Error).message },
			{ status: 500 },
		)
	}
}
