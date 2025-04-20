import type { Feed } from "@/server/feeds";
import { Button, Skeleton } from "@mantine/core";
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
					title: "Delete",
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

export const FeedTableSkeleton = ({ rowCount = 5 }: { rowCount?: number }) => {
	return (
		<div style={{ width: "100%" }}>
			<FeedTableRowSkeleton border="gray-2" />

			{Array.from({ length: rowCount }).map((_, index) => (
				<FeedTableRowSkeleton
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					key={index}
					border={index === rowCount - 1 ? undefined : "gray-2"}
				/>
			))}
		</div>
	);
};

const FeedTableRowSkeleton = (props: { border?: "gray-2" | "gray-3" }) => {
	const border = props.border
		? `1px solid var(--mantine-color-${props.border})`
		: "none";
	return (
		<div
			style={{
				display: "flex",
				padding: "12px 0",
				borderBottom: border,
			}}
		>
			<Skeleton
				height={20}
				width="30%"
				radius="sm"
				style={{ margin: "0 8px" }}
			/>
			<Skeleton
				height={20}
				width="40%"
				radius="sm"
				style={{ margin: "0 8px" }}
			/>
			<Skeleton
				height={20}
				width="20%"
				radius="sm"
				style={{ margin: "0 8px" }}
			/>
		</div>
	);
};
