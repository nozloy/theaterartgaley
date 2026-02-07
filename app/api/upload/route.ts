import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
	const formData = await request.formData()
	const file = formData.get('file') as File

	if (!file) {
		return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
	}

	const buffer = Buffer.from(await file.arrayBuffer())
	const filename = `${uuidv4()}${path.extname(file.name)}`
	const filePath = path.join(process.cwd(), 'data', filename)

	try {
		await writeFile(filePath, buffer)
		return NextResponse.json({ url: `/api/images/${filename}` })
	} catch (error) {
		console.error('Error saving file:', error)
		return NextResponse.json({ error: 'Error saving file' }, { status: 500 })
	}
}
