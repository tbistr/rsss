import { Hono } from "hono";

export const api = new Hono();

api.get("/clock", (c) => {
	return c.json({
		time: new Date().toLocaleTimeString(),
	});
});

api.get("/hello", (c) => {
	return c.json({
		message: "Hello, World!",
	});
});
