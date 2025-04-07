import build from "@hono/vite-build/cloudflare-workers";
import devServer from "@hono/vite-dev-server";
import adapter from "@hono/vite-dev-server/cloudflare";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
	if (mode === "client") {
		return {
			plugins: [tsconfigPaths(), react()],
			server: {
				proxy: {
					"/api": {
						target: "http://localhost:3000",
						changeOrigin: true,
						secure: false,
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
		server: {
			port: 3000,
		},
	};
});
