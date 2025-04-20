import { Center, Loader } from "@mantine/core";

export const FullscreenLoader = () => {
	return (
		<Center style={{ flex: 1 }}>
			<Loader size="xl" />
		</Center>
	);
};
