import api from "@/server";
import { Hono } from "hono";
import { logger } from "hono/logger";

const app = new Hono<{ Bindings: { ASSETS: Fetcher } }>();
app.use(logger());

app.route("/api", api);

if (import.meta.env.PROD) {
	// 本番ではASSETSへのリクエストをプロキシする
	// 全てのリクエストにおいて、ASSETSから探してサーブする
	// （なかったら勝手に404になる）
	app.get("/*", (c) => {
		return c.env.ASSETS.fetch(c.req.url);
	});
}

export default app;
