import { Hono } from "hono";

export const api = new Hono();

const routes = api
	.get("/clock", (c) => {
		return c.json({
			time: new Date().toISOString(),
		});
	})
	.get("/hello", (c) => {
		return c.json({
			message: "Hello, World!",
		});
	});

export type AppType = typeof routes;
