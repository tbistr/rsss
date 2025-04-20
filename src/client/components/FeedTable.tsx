import type { Feed } from "@/server/feeds";
import { Button } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { DataTable } from "mantine-datatable";

export type FeedTableProps = {
	feeds: Feed[];
	onDelete: (feed: Feed) => void;
	onRowClick?: (feed: Feed) => void;
};

export const FeedTable = (props: FeedTableProps) => {
	return (
		<DataTable
			withTableBorder
			columns={[
				{ accessor: "title", title: "Title" },
				{ accessor: "url", title: "URL" },
				{ accessor: "createdAt", title: "Created At" },
				{
					accessor: "actions",
					title: "",
					textAlign: "right",
					render: (feed) => (
						<Button
							variant="subtle"
							color="red"
							onClick={() => props.onDelete(feed)}
							rightSection={<IconTrash size={16} />}
							size="xs"
						>
							Delete
						</Button>
					),
				},
			]}
			records={props.feeds}
		/>
	);
};
