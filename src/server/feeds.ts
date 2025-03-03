import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { feeds } from "src/db/schema";
import { z } from "zod";

export interface Feed {
	id: number;
	title: string;
	url: string;
}

const app = new Hono<{ Bindings: { DB: D1Database } }>()
	// すべてのフィードを取得
	.get("/", async (c) => {
		const db = drizzle(c.env.DB);
		const found = await db.select().from(feeds).all();
		console.log(found);
		if (found.length === 0) {
			return c.json({ error: "Not Found" }, 404);
		}
		return c.json<Feed[]>(await db.select().from(feeds).all(), 200);
	})
	// idを指定して特定のフィードを取得
	.get(
		"/:id",
		zValidator(
			"param",
			z.object({
				id: z.coerce.number(),
			}),
		),
		async (c) => {
			const { id } = c.req.valid("param");
			const db = drizzle(c.env.DB);
			const found = await db.select().from(feeds).where(eq(feeds.id, id));
			if (found.length === 0) {
				return c.json({ error: "Not Found" }, 404);
			}
			return c.json<Feed>({ ...found[0] }, 200);
		},
	)
	// フィードを登録する
	.post(
		"/",
		zValidator(
			"form",
			z.object({
				title: z.string(),
				url: z.string(),
			}),
		),
		async (c) => {
			const db = drizzle(c.env.DB);
			const params = c.req.valid("form");
			const res = await db.insert(feeds).values(params).returning();
			return c.json<Feed>(res[0], 200);
		},
	)
	// idを指定して特定のフィードを削除する
	.delete(
		"/:id",
		zValidator(
			"param",
			z.object({
				id: z.coerce.number(),
			}),
		),
		async (c) => {
			const db = drizzle(c.env.DB);
			const { id } = c.req.valid("param");
			await db.delete(feeds).where(eq(feeds.id, id));
			return c.text("OK");
		},
	)
	.onError((err, c) => {
		console.error(err);
		return c.text("Internal Server Error", 500);
	});

export default app;
