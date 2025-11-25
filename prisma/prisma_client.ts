import { PrismaClient } from '../prisma/generated/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

const adapter = new PrismaBetterSqlite3({
	databasePath: './theaterartgaley.db',
})
// Initialize Prisma client without passing an empty object to satisfy
// the PrismaClientOptions type requirement
const prisma = new PrismaClient({ adapter })

export default prisma
