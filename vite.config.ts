import build from "@hono/vite-build/cloudflare-workers";
import devServer from "@hono/vite-dev-server";
import adapter from "@hono/vite-dev-server/cloudflare";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
	if (mode === "client") {
		return {
			plugins: [tsconfigPaths()],
			build: {
				rollupOptions: {
					input: "src/client/client.tsx",
					output: {
						entryFileNames: "static/client.js",
					},
				},
			},
		};
	}
	return {
		plugins: [
			tsconfigPaths(),
			build({
				outputDir: "dist",
			}),
			devServer({
				adapter,
				entry: "src/index.tsx",
			}),
		],
		ssr: {
			external: ["react", "react-dom"],
		},
	};
});
