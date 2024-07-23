import * as dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

dotenv.config();
const { PRIVATE_POSTGRES_URL } = process.env;
if (!PRIVATE_POSTGRES_URL) {
	throw new Error('No url');
}
export default defineConfig({
	dialect: 'postgresql',
	schema: './src/lib/server/schemas/*',
	out: './drizzle',
	// driver: 'pg',
	dbCredentials: {
		// connectionString: PRIVATE_POSTGRES_URL // + '?sslmode=require'
		url: PRIVATE_POSTGRES_URL // + '?sslmode=require'
	}
});
