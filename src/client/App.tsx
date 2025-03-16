import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { AppShell, Burger } from "@mantine/core";
import { Group, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBrandMantine } from "@tabler/icons-react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { ShowRSSFeeds } from "./pages/ArticleViewer";
import { FeedManager } from "./pages/FeedManager";
import { NotFound } from "./pages/NotFound";

function Layout() {
	const [opened, { toggle }] = useDisclosure();

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
			padding="md"
		>
			<AppShell.Header>
				<Group h="100%" px="md">
					<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
					<IconBrandMantine size={30} />
				</Group>
			</AppShell.Header>

			<AppShell.Navbar p="md">
				Navbar
				{Array(15)
					.fill(0)
					.map((_, index) => (
						<Skeleton key={index} h={28} mt="sm" animate={false} />
					))}
			</AppShell.Navbar>

			<AppShell.Main>
				<Outlet />
			</AppShell.Main>
		</AppShell>
	);
}

const root = createRoot(document.getElementById("root") ?? document.body);
root.render(
	<MantineProvider>
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route index element={<NotFound />} />
					<Route path="/articles" element={<ShowRSSFeeds />} />
					<Route path="/feeds" element={<FeedManager />} />
					<Route path="/*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</MantineProvider>,
);
