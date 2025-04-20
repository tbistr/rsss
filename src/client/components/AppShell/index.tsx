import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBrandMantine } from "@tabler/icons-react";
import { Outlet } from "react-router";
import { NavbarLink, type NavbarLinkProps } from "./NavbarLink";

export const Layout = ({ links }: { links: NavbarLinkProps[] }) => {
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
				{links.map((link, i) => (
					<NavbarLink key={link.label} {...link} />
				))}
			</AppShell.Navbar>

			<AppShell.Main
				style={{ height: "100%", display: "flex", flexDirection: "column" }}
			>
				<Outlet />
			</AppShell.Main>
		</AppShell>
	);
};
