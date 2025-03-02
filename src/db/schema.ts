import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const feeds = sqliteTable("feeds", {
	id: integer().primaryKey({ autoIncrement: true }),
	title: text().notNull(),
	url: text().notNull(),
	createdAt: integer()
		.notNull()
		.default(Math.floor(Date.now() / 1000)),
});
