import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { DashboardAdmin } from '@/components/shared/dashboard-admin'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import type { DashboardUser } from '@/lib/admin-users'
import { listEventsForAdmin } from '@/lib/events'

export const dynamic = 'force-dynamic'

type DbUserRow = {
	id: string
	name: string
	email: string
	role: string
	createdAt: string
	updatedAt: string
}

export default async function DashboardPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	})

	if (!session) {
		redirect('/sign-in')
	}

	const role = (session.user as { role?: string }).role
	if (role !== 'admin') {
		redirect('/')
	}

	const usersResult = await db.query<DbUserRow>(
		`SELECT id, name, email, role, "createdAt", "updatedAt"
		 FROM "user"
		 ORDER BY
		 	CASE WHEN role = 'admin' THEN 0 ELSE 1 END,
			"createdAt" DESC`,
	)
	const users: DashboardUser[] = usersResult.rows
	const events = await listEventsForAdmin()

	return (
		<main className='min-h-screen bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.16),_transparent_45%),radial-gradient(circle_at_85%_10%,_rgba(34,197,94,0.12),_transparent_35%),linear-gradient(180deg,_#09090b_0%,_#111827_100%)]'>
			<div className='mx-auto w-full max-w-6xl px-3 py-4 sm:px-6 sm:py-8'>
				<DashboardAdmin
					userName={session.user.name}
					userEmail={session.user.email}
					currentUserId={session.user.id}
					users={users}
					events={events}
				/>
			</div>
		</main>
	)
}
