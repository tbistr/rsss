import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { IconBrandMantine } from "@tabler/icons-react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Layout } from "./components/AppShell";
import { FeedManager } from "./pages/feeds/management/FeedManager";
import { ShowRSSFeeds } from "./pages/feeds/my/ArticleViewer";
import { NotFound } from "./pages/notFound/NotFound";

const root = createRoot(document.getElementById("root") ?? document.body);
root.render(
	<MantineProvider>
		<BrowserRouter>
			<Routes>
				<Route index element={<Navigate to="/feeds" replace />} />
				<Route
					path="/feeds"
					element={
						<Layout
							links={[
								{
									icon: IconBrandMantine,
									label: "View Feeds",
									to: "/feeds/my",
								},
								{
									icon: IconBrandMantine,
									label: "Manage Feeds",
									to: "/feeds/management",
								},
							]}
						/>
					}
				>
					<Route index element={<ShowRSSFeeds />} />
					<Route path="my" element={<ShowRSSFeeds />} />
					<Route path="management" element={<FeedManager />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</MantineProvider>,
);
