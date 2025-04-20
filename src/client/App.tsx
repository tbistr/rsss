import "@mantine/core/styles.css";
import "mantine-datatable/styles.css";

import { MantineProvider } from "@mantine/core";
import { IconBrandMantine } from "@tabler/icons-react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./components/AppShell/AppShell";
import { NotFound } from "./pages/NotFound";
import { FeedSubscriptions } from "./pages/feeds/feeds/FeedSubscriptions";
import { Articles } from "./pages/feeds/index/Articles";

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
									to: "/",
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
					<Route path="/" element={<Articles />} />
					<Route path="/feeds" element={<FeedSubscriptions />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</MantineProvider>,
);
