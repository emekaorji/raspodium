import type { Config } from 'drizzle-kit';

if (!process.env.DATABASE_URL) {
	throw new Error('Make sure you have DATABASE_URL set in your .env');
}

const drizzleConfig = {
	schema: './db/schema.ts',
	driver: 'turso',
	dbCredentials: {
		url: process.env.DATABASE_URL,
		authToken: process.env.DATABASE_AUTH_TOKEN,
	},
	verbose: true,
	strict: true,
} satisfies Config;

export default drizzleConfig;
