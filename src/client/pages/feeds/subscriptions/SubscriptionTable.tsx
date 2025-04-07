import type { Feed } from "@/server/feeds";
import { Button, Card } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { DataTable } from "mantine-datatable";

export const SubscriptionTable = (props: { feeds: Feed[] }) => {
	return (
		<Card>
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
								onClick={() => {
									console.log("Delete feed with:", feed);
								}}
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
		</Card>
	);
};
