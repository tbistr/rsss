import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { z } from "zod";
import { notes } from "/db/scheme";

type Bindings = {
	DB: D1Database;
};

export interface Note {
	id: number;
	title: string;
	content: string;
	createdAt: number;
}

export const api = new Hono<{ Bindings: Bindings }>();
api.use(logger());

const routes = api
	// 全てのノートを取得
	.get("/notes", async (c) => {
		const db = drizzle(c.env.DB);
		return c.json(await db.select().from(notes).all());
	})
	// IDでノートを取得
	.get(
		"/notes/:id",
		zValidator(
			"param",
			z.object({
				id: z.coerce.number(),
			}),
		),
		async (c) => {
			const { id } = c.req.valid("param");
			const db = drizzle(c.env.DB);
			const found = await db.select().from(notes).where(eq(notes.id, id));
			if (found.length === 0) {
				return c.json({ error: "Not Found" }, 404);
			}
			return c.json(
				{
					id: found[0].id,
					title: found[0].title,
					content: found[0].content,
					createdAt: found[0].createdAt,
				},
				200,
			);
		},
	)
	// ノートを作成
	.post(
		"/notes",
		zValidator(
			"form",
			z.object({
				title: z.string(),
				content: z.string(),
			}),
		),
		async (c) => {
			const db = drizzle(c.env.DB);
			const params = c.req.valid("form");
			const res = await db.insert(notes).values(params).returning();
			return c.json(res[0]);
		},
	)
	// ノートを削除
	.delete(
		"/notes/:id",
		zValidator(
			"param",
			z.object({
				id: z.coerce.number(),
			}),
		),
		async (c) => {
			const db = drizzle(c.env.DB);
			const { id } = c.req.valid("param");
			await db.delete(notes).where(eq(notes.id, id));
			return c.text("OK");
		},
	)
	// エラーハンドリング
	.onError((err, c) => {
		console.error(err);
		return c.text("Internal Server Error", 500);
	});

export type AppType = typeof routes;
