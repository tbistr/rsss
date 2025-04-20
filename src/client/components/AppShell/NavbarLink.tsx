import { Link } from "react-router";
import classes from "./NavbarLink.module.css";

import { Box, ThemeIcon } from "@mantine/core";

export interface NavbarLinkProps {
	// biome-ignore lint/suspicious/noExplicitAny:
	icon: React.FC<any>;
	label: string;
	to: string;
}

export const NavbarLink = ({ icon: Icon, to, label }: NavbarLinkProps) => {
	return (
		<Link to={to}>
			<Box
				style={{ display: "flex", alignItems: "center" }}
				className={classes.control}
			>
				<ThemeIcon variant="light" size={30}>
					<Icon size={18} />
				</ThemeIcon>
				<Box ml="md">{label}</Box>
			</Box>
		</Link>
	);
};
