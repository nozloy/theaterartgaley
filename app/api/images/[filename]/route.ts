import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ filename: string }> },
) {
	const filename = (await params).filename
	const filePath = path.join(process.cwd(), 'data', filename)

	if (!existsSync(filePath)) {
		return new NextResponse('File not found', { status: 404 })
	}

	try {
		const fileBuffer = await readFile(filePath)
		const ext = path.extname(filename).toLowerCase()
		let contentType = 'application/octet-stream'

		switch (ext) {
			case '.jpg':
			case '.jpeg':
				contentType = 'image/jpeg'
				break
			case '.png':
				contentType = 'image/png'
				break
			case '.gif':
				contentType = 'image/gif'
				break
			case '.webp':
				contentType = 'image/webp'
				break
			case '.svg':
				contentType = 'image/svg+xml'
				break
		}

		return new NextResponse(fileBuffer, {
			headers: {
				'Content-Type': contentType,
				'Cache-Control': 'public, max-age=31536000, immutable',
			},
		})
	} catch (error) {
		console.error('Error serving file:', error)
		return new NextResponse('Error serving file', { status: 500 })
	}
}
