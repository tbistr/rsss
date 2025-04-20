import { FullscreenLoader } from "@/client/components/Loading";
import { useFeeds } from "@/client/hooks/api";
import type { AppType } from "@/server";
import type { Feed } from "@/server/feeds";
import { Button, TextInput } from "@mantine/core";
import { hc } from "hono/client";
import { useState } from "react";
import {} from "react-router";
import { SubscriptionTable } from "./SubscriptionTable";

const client = hc<AppType>("/api");

export const FeedSubscriptions = () => {
	const { data, isLoading, error } = useFeeds({});
	if (error) {
		return <div>Error: {error.message}</div>;
	}
	if (isLoading || !data) {
		return <FullscreenLoader />;
	}

	return <SubscriptionTable feeds={data} />;
};

const CreateFeed = () => {
	const [title, setTitle] = useState("");
	const [url, setUrl] = useState("");
	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				(
					await client.feeds.$post({
						form: {
							title: title,
							url: url,
						},
					})
				).url;
			}}
		>
			<TextInput
				label="Title"
				type="text"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<TextInput
				label="Feed URL"
				type="text"
				value={url}
				onChange={(e) => setUrl(e.target.value)}
			/>
			<Button type="submit">Create</Button>
		</form>
	);
};

const ShowFeeds = () => {
	const [Feed, setFeed] = useState<Feed[]>([]);
	const onClick = async () => {
		const res = await client.feeds.$get();
		if (!res.ok) {
			setFeed([]);
			return;
		}
		setFeed(await res.json());
	};
	return (
		<>
			<Button type="button" onClick={onClick}>
				Show Feed IDs
			</Button>
			<ul>
				{Feed.map((n) => (
					<li key={n.id}>{JSON.stringify(n)}</li>
				))}
			</ul>
		</>
	);
};

const ShowFeed = () => {
	const [id, setId] = useState("");
	const [Feed, setFeed] = useState<Feed | undefined>(undefined);
	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				const res = await client.feeds[":id"].$get({
					param: { id },
				});
				if (!res.ok) {
					setFeed(undefined);
					return;
				}
				setFeed(await res.json());
			}}
		>
			<TextInput
				label="ID"
				type="number"
				value={id}
				onChange={(e) => setId(e.target.value)}
			/>
			<Button type="submit">Show</Button>
			{Feed && <pre>{JSON.stringify(Feed, null, 2)}</pre>}
		</form>
	);
};

const DeleteFeed = () => {
	const [id, setId] = useState("");
	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				await client.feeds[":id"].$delete({
					param: { id },
				});
			}}
		>
			<TextInput
				label="ID"
				type="number"
				value={id}
				onChange={(e) => setId(e.target.value)}
			/>
			<Button type="submit">Delete</Button>
		</form>
	);
};
