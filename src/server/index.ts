import { Hono } from "hono";
import feeds from "src/server/feeds";

const app = new Hono();
const routs = app.route("/feeds", feeds);

export type AppType = typeof routs;
export default app;
