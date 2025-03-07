import { Hono } from "hono";
import { renderToString } from "react-dom/server";
import api from "src/server";

const app = new Hono();

app.route("/api", api);

app.get("*", (c) => {
	return c.html(
		renderToString(
			<html lang="en">
				<head>
					<meta charSet="utf-8" />
					<meta content="width=device-width, initial-scale=1" name="viewport" />
					{/* <link
						rel="stylesheet"
						href="https://cdn.simplecss.org/simple.min.css"
					/> */}
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
