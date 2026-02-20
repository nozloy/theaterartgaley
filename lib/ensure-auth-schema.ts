import { db } from '@/lib/db'

const globalForAuthSchema = globalThis as typeof globalThis & {
	__theaterAuthSchemaInitPromise?: Promise<void>
}

function createSchemaIfNeeded() {
	return (async () => {
		await db.query(`
			CREATE TABLE IF NOT EXISTS "user" (
				id TEXT PRIMARY KEY,
				name TEXT NOT NULL,
				email TEXT NOT NULL UNIQUE,
				"emailVerified" BOOLEAN NOT NULL DEFAULT FALSE,
				image TEXT,
				role TEXT NOT NULL DEFAULT 'user',
				"createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
				"updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
			);
		`)

		await db.query(`
			CREATE TABLE IF NOT EXISTS session (
				id TEXT PRIMARY KEY,
				"expiresAt" TIMESTAMPTZ NOT NULL,
				token TEXT NOT NULL UNIQUE,
				"createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
				"updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
				"ipAddress" TEXT,
				"userAgent" TEXT,
				"userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE
			);
		`)
		await db.query(
			'CREATE INDEX IF NOT EXISTS session_user_id_idx ON session ("userId");',
		)

		await db.query(`
			CREATE TABLE IF NOT EXISTS account (
				id TEXT PRIMARY KEY,
				"accountId" TEXT NOT NULL,
				"providerId" TEXT NOT NULL,
				"userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
				"accessToken" TEXT,
				"refreshToken" TEXT,
				"idToken" TEXT,
				"accessTokenExpiresAt" TIMESTAMPTZ,
				"refreshTokenExpiresAt" TIMESTAMPTZ,
				scope TEXT,
				password TEXT,
				"createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
				"updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
				UNIQUE ("providerId", "accountId")
			);
		`)
		await db.query(
			'CREATE INDEX IF NOT EXISTS account_user_id_idx ON account ("userId");',
		)

		await db.query(`
			CREATE TABLE IF NOT EXISTS verification (
				id TEXT PRIMARY KEY,
				identifier TEXT NOT NULL,
				value TEXT NOT NULL,
				"expiresAt" TIMESTAMPTZ NOT NULL,
				"createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
				"updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
			);
		`)
		await db.query(
			'CREATE INDEX IF NOT EXISTS verification_identifier_idx ON verification (identifier);',
		)
	})()
}

export async function ensureAuthSchema() {
	const current = globalForAuthSchema.__theaterAuthSchemaInitPromise
	if (current) {
		return current
	}

	const initPromise = createSchemaIfNeeded().catch((error) => {
		globalForAuthSchema.__theaterAuthSchemaInitPromise = undefined
		throw error
	})

	globalForAuthSchema.__theaterAuthSchemaInitPromise = initPromise
	return initPromise
}
