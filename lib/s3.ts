import { randomUUID } from 'crypto'
import path from 'path'
import { ListObjectsV2Command, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

const endpoint = process.env.S3_ENDPOINT_URL
const region = process.env.S3_REGION_NAME
const bucket = process.env.S3_BUCKET_NAME
const accessKeyId = process.env.S3_ACCESS_KEY
const secretAccessKey = process.env.S3_SECRET_KEY

if (!endpoint || !region || !bucket || !accessKeyId || !secretAccessKey) {
	throw new Error(
		'S3 config is incomplete. Required: S3_ENDPOINT_URL, S3_REGION_NAME, S3_BUCKET_NAME, S3_ACCESS_KEY, S3_SECRET_KEY',
	)
}

const safeEndpoint = endpoint
const safeRegion = region
const safeBucket = bucket
const safeAccessKeyId = accessKeyId
const safeSecretAccessKey = secretAccessKey

const globalForS3 = globalThis as typeof globalThis & {
	__theaterS3Client?: S3Client
}

const s3Client =
	globalForS3.__theaterS3Client ??
	new S3Client({
		region: safeRegion,
		endpoint: safeEndpoint,
		credentials: {
			accessKeyId: safeAccessKeyId,
			secretAccessKey: safeSecretAccessKey,
		},
		forcePathStyle: true,
	})

if (process.env.NODE_ENV !== 'production') {
	globalForS3.__theaterS3Client = s3Client
}

function getPublicBaseUrl() {
	const explicitPublicUrl = process.env.S3_PUBLIC_URL?.replace(/\/+$/, '')
	if (explicitPublicUrl) {
		return explicitPublicUrl
	}
	return `${safeEndpoint.replace(/\/+$/, '')}/${safeBucket}`
}

export async function uploadImageToS3(file: File, keyPrefix = 'events') {
	const extension = path.extname(file.name) || '.bin'
	const key = `${keyPrefix}/${randomUUID()}${extension}`
	const body = Buffer.from(await file.arrayBuffer())

	await s3Client.send(
		new PutObjectCommand({
			Bucket: safeBucket,
			Key: key,
			Body: body,
			ContentType: file.type || 'application/octet-stream',
		}),
	)

	return `${getPublicBaseUrl()}/${key}`
}

export type S3ImageFile = {
	key: string
	url: string
	lastModified: string | null
	size: number | null
}

export async function listImagesFromS3(prefix = 'events', limit = 200) {
	const normalizedPrefix = prefix.replace(/^\/+|\/+$/g, '')
	let continuationToken: string | undefined
	const files: S3ImageFile[] = []

	do {
		const res = await s3Client.send(
			new ListObjectsV2Command({
				Bucket: safeBucket,
				Prefix: `${normalizedPrefix}/`,
				MaxKeys: 1000,
				ContinuationToken: continuationToken,
			}),
		)

		for (const item of res.Contents ?? []) {
			if (!item.Key) {
				continue
			}

			files.push({
				key: item.Key,
				url: `${getPublicBaseUrl()}/${item.Key}`,
				lastModified: item.LastModified ? item.LastModified.toISOString() : null,
				size: typeof item.Size === 'number' ? item.Size : null,
			})
		}

		continuationToken = res.IsTruncated ? res.NextContinuationToken : undefined
	} while (continuationToken)

	return files
		.sort((a, b) => {
			const aTime = a.lastModified ? new Date(a.lastModified).getTime() : 0
			const bTime = b.lastModified ? new Date(b.lastModified).getTime() : 0
			return bTime - aTime
		})
		.slice(0, limit)
}
