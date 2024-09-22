import { PRIVATE_POSTGRES_URL } from '$env/static/private';
import type { Logger } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schemas';
import { logger } from './utils';

class QueryLogger implements Logger {
	logQuery(query: string, params: unknown[]): void {
		// if (query.includes('password')) return;
		logger.debug(query, params);
	}
}

// const client = dev ? postgres(DATABASE_URL) : postgres(DATABASE_URL, { ssl: 'require' });
const client = postgres(PRIVATE_POSTGRES_URL);
export const db = drizzle(client, {
	schema,
	logger: new QueryLogger()
});
