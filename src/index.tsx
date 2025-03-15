import { Hono } from "hono";
import { logger } from "hono/logger";
import { renderToString } from "react-dom/server";
import api from "src/server";

const app = new Hono();

app.route("/api", api);
app.use(logger());

app
	.get("/cors-proxy", async (c) => {
		const { url } = c.req.query();
		console.log(url);
		const response = await fetch(url);
		const text = await response.text();
		return c.text(text);
	})
	.get("*", (c) => {
		return c.html(
			renderToString(
				<html lang="en">
					<head>
						<meta charSet="utf-8" />
						<meta
							content="width=device-width, initial-scale=1"
							name="viewport"
						/>
						{import.meta.env.PROD ? (
							<script type="module" src="/static/client.js" />
						) : (
							<script type="module" src="/src/client/client.tsx" />
						)}
					</head>
					<body>
						<div id="root" />
					</body>
				</html>,
			),
		);
	});

export default app;
