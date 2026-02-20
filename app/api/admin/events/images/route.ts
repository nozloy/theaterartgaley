import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { listImagesFromS3 } from '@/lib/s3'

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

		const files = await listImagesFromS3('events')
		return NextResponse.json({ files })
	} catch (error) {
		console.error('Failed to list event images from S3', error)
		return NextResponse.json(
			{ error: (error as Error).message },
			{ status: 500 },
		)
	}
}
