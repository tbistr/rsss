import { Hono } from "hono";
import { logger } from "hono/logger";
import feeds from "src/server/feeds";

const app = new Hono();
app.use(logger());
const routes = app.route("/feeds", feeds);

export type AppType = typeof routes;
export default app;
