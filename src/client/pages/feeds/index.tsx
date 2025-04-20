import { api } from "@/client/api";
import { mutateFeeds, useFeeds } from "@/client/api/feeds";
import { CreateFeedForm } from "@/client/components/CreateFeedForm";
import { FeedTable, FeedTableSkeleton } from "@/client/components/FeedTable";
import type { AppType } from "@/server";
import type { Feed } from "@/server/feeds";
import { Button, Card, Flex, Modal, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { hc } from "hono/client";

const client = hc<AppType>("/api");

export const FeedSubscriptions = () => {
	const { data, isLoading, error } = useFeeds({});
	const [formOpened, { open: openForm, close: closeForm }] =
		useDisclosure(false);

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	const createFeed = async (title: string, url: string) => {
		const res = await api.feeds.$post({ form: { title, url } });
		if (!res.ok) {
			alert("Failed to create feed");
			return;
		}
		closeForm();
		mutateFeeds();
	};

	const onDelete = async (feed: Feed) => {
		const res = await api.feeds[":id"].$delete({
			param: { id: `${feed.id}` },
		});
		if (!res.ok) {
			alert("Failed to delete feed");
			return;
		}
		mutateFeeds();
	};

	return (
		<>
			<Modal opened={formOpened} onClose={closeForm} title="新規フィード登録">
				<CreateFeedForm onSubmit={createFeed} />
			</Modal>

			<Card>
				<Flex justify="space-between" align="center" mb="md">
					<Title order={3}>登録フィード一覧</Title>
					<Button onClick={openForm}>＋ 新規作成</Button>
				</Flex>
				{isLoading || !data ? (
					<FeedTableSkeleton />
				) : (
					<FeedTable feeds={data} onDelete={onDelete} />
				)}
			</Card>
		</>
	);
};
