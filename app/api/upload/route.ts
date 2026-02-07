import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { existsSync } from 'fs'

export async function POST(request: Request) {
	try {
		const formData = await request.formData()
		const file = formData.get('file') as File

		if (!file) {
			console.error('Upload error: No file uploaded')
			return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
		}

		console.log('--- Upload Debug Info ---')
		console.log(`UID: ${process.getuid?.()}, GID: ${process.getgid?.()}`)
		console.log(`CWD: ${process.cwd()}`)
		
		const dataDir = path.join(process.cwd(), 'data')
		console.log(`Target Dir: ${dataDir}`)

		try {
			// Check directory status
			if (existsSync(dataDir)) {
				const stats = await import('fs/promises').then(fs => fs.stat(dataDir))
				console.log(`Dir Stats - Mode: ${stats.mode.toString(8)}, UID: ${stats.uid}, GID: ${stats.gid}`)
			} else {
				console.log('Dir does not exist, attempting creation')
				await mkdir(dataDir, { recursive: true })
			}
			
			// Try writing a test file needed? No, actual write will test it.
		} catch (err) {
			console.error('Pre-write check error:', err)
		}

		const buffer = Buffer.from(await file.arrayBuffer())
		const filename = `${uuidv4()}${path.extname(file.name)}`
		const filePath = path.join(dataDir, filename)

		await writeFile(filePath, buffer)
		console.log(`File saved successfully to ${filePath}`)
		return NextResponse.json({ url: `/api/images/${filename}` })
	} catch (error) {
		console.error('Error in POST /api/upload:', error)
		return NextResponse.json(
			{
				error:
					'Error saving file: ' +
					(error instanceof Error ? error.message : String(error)),
			},
			{ status: 500 },
		)
	}
}
