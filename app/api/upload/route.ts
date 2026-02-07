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

		console.log(
			`Processing upload: ${file.name}, size: ${file.size}, type: ${file.type}`,
		)

		const buffer = Buffer.from(await file.arrayBuffer())
		const filename = `${uuidv4()}${path.extname(file.name)}`
		const dataDir = path.join(process.cwd(), 'data')
		const filePath = path.join(dataDir, filename)

		if (!existsSync(dataDir)) {
			console.log(`Creating data directory at ${dataDir}`)
			await mkdir(dataDir, { recursive: true })
		}

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
