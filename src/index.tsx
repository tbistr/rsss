import api from "@/server";
import { Hono } from "hono";
import { logger } from "hono/logger";

const app = new Hono();

app.route("/api", api);
app.use(logger());

export default app;
