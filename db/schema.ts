import { sqliteTable, text, blob } from 'drizzle-orm/sqlite-core';

export const ips = sqliteTable('ips', {
	id: text('id').notNull().primaryKey(),
	ipAddress: text('ipAddress').notNull(),
	calls: blob('calls', { mode: 'json' })
		.$type<{ id: string; timeStamp: number }[]>()
		.notNull(),
});
