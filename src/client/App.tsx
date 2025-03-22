import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { IconBrandMantine } from "@tabler/icons-react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Layout } from "./components/AppShell";
import { ShowRSSFeeds } from "./pages/feeds/my/ArticleViewer";
import { FeedSubscriptions } from "./pages/feeds/subscriptions/FeedSubscriptions";
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
									to: "/feeds/subscriptions",
								},
							]}
						/>
					}
				>
					<Route index element={<ShowRSSFeeds />} />
					<Route path="my" element={<ShowRSSFeeds />} />
					<Route path="subscriptions" element={<FeedSubscriptions />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</MantineProvider>,
);
