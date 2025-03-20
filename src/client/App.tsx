import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { IconBrandMantine } from "@tabler/icons-react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Layout } from "./components/AppShell";
import { ShowRSSFeeds } from "./pages/feeds/ArticleViewer";
import { FeedManager } from "./pages/manage/FeedManager";
import { NotFound } from "./pages/notFound/NotFound";

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
									label: "View Feeds",
									to: "/feeds",
								},
								{
									icon: IconBrandMantine,
									label: "Manage Feeds",
									to: "/manage",
								},
							]}
						/>
					}
				>
					<Route index element={<Navigate to="/feeds" replace />} />
					<Route path="/feeds" element={<ShowRSSFeeds />} />
					<Route path="/manage" element={<FeedManager />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</MantineProvider>,
);
