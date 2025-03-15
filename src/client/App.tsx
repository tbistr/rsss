import "@mantine/core/styles.css";

import {} from "@mantine/core";
import { MantineProvider } from "@mantine/core";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { ArticleViewer } from "./pages/ArticleViewer";
import { FeedManager } from "./pages/FeedManager";
import { NotFound } from "./pages/NotFound";

const root = createRoot(document.getElementById("root") ?? document.body);
root.render(
	<MantineProvider>
		<BrowserRouter>
			<Routes>
				<Route index element={<NotFound />} />
				<Route path="/articles" element={<ArticleViewer />} />
				<Route path="/feeds" element={<FeedManager />} />
				<Route path="/*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	</MantineProvider>,
);
