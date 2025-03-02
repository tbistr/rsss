import { Hono } from "hono";

export interface Feed {
	id: number;
	title: string;
	url: string;
}

const app = new Hono<{ Bindings: { DB: D1Database } }>()
	.get("/", async (c) => {
		return c.json<Feed[]>(
			[
				{ id: 1, title: "Hello, World!", url: "/api/feeds/1" },
				{ id: 2, title: "Hello, World!", url: "/api/feeds/2" },
			],
			200,
		);
	})
	.get("/:id", async (c) => {
		return c.json<Feed>(
			{ id: 1, title: "Hello, World!", url: "/api/feeds/1" },
			200,
		);
	})
	.post("/", async (c) => {
		return c.json<Feed>(
			{ id: 1, title: "Hello, World!", url: "/api/feeds/1" },
			200,
		);
	})
	.delete("/:id", async (c) => {
		return c.text("OK");
	})
	.onError((err, c) => {
		console.error(err);
		return c.text("Internal Server Error", 500);
	});

export default app;
