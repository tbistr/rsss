import feeds from "@/server/feeds";
import { Hono } from "hono";
import { logger } from "hono/logger";

const app = new Hono();
app.use(logger());
const routes = app.route("/feeds", feeds).get("/cors-proxy", async (c) => {
	const { url } = c.req.query();
	const response = await fetch(url);
	const text = await response.text();
	return c.text(text);
});

export type AppType = typeof routes;
export default app;
