import { Pool } from 'pg'

const globalForDb = globalThis as typeof globalThis & {
	__theaterPgPool?: Pool
}

function createPool() {
	if (process.env.DATABASE_URL) {
		return new Pool({
			connectionString: process.env.DATABASE_URL,
		})
	}

	return new Pool({
		host: process.env.POSTGRESQL_HOST,
		port: Number(process.env.POSTGRESQL_PORT ?? 5432),
		user: process.env.POSTGRESQL_USER,
		password: process.env.POSTGRESQL_PASSWORD,
		database: process.env.POSTGRESQL_DBNAME,
	})
}

export const db = globalForDb.__theaterPgPool ?? createPool()

if (process.env.NODE_ENV !== 'production') {
	globalForDb.__theaterPgPool = db
}
