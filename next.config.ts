import type { NextConfig } from 'next'

const s3Endpoint = process.env.S3_ENDPOINT_URL ?? 'https://s3.twcstorage.ru'
const s3Url = new URL(s3Endpoint)

const nextConfig: NextConfig = {
	output: 'standalone',
	compress: true,
	poweredByHeader: false,
	images: {
		formats: ['image/avif', 'image/webp'],
		remotePatterns: [
			{
				protocol: s3Url.protocol.replace(':', '') as 'http' | 'https',
				hostname: s3Url.hostname,
				port: s3Url.port,
				pathname: '/**',
			},
		],
	},
}

export default nextConfig
