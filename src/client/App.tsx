import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { IconBrandMantine } from "@tabler/icons-react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./components/AppShell";
import { ShowRSSFeeds } from "./pages/ArticleViewer";
import { FeedManager } from "./pages/FeedManager";
import { NotFound } from "./pages/NotFound";

const root = createRoot(document.getElementById("root") ?? document.body);
root.render(
	<MantineProvider>
		<BrowserRouter>
			<Routes>
				<Route
					element={
						<Layout
							links={[
								{
									icon: IconBrandMantine,
									label: "New Articles",
									to: "/articles",
								},
								{
									icon: IconBrandMantine,
									label: "Manage Feeds",
									to: "/feeds",
								},
							]}
						/>
					}
				>
					<Route index element={<NotFound />} />
					<Route path="/articles" element={<ShowRSSFeeds />} />
					<Route path="/feeds" element={<FeedManager />} />
					<Route path="/*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</MantineProvider>,
);
