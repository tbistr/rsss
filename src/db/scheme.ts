import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const notes = sqliteTable("notes", {
	id: integer().primaryKey({ autoIncrement: true }),
	title: text().notNull(),
	content: text().notNull(),
	createdAt: integer()
		.notNull()
		.default(Math.floor(Date.now() / 1000)),
});
