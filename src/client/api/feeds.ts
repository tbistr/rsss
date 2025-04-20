import type { InferRequestType } from "hono";
import useSWR, { mutate } from "swr";
import { api } from ".";

export const useFeeds = (arg: InferRequestType<typeof api.feeds.$get>) => {
	const fetcher = async () => {
		const res = await api.feeds.$get(arg);
		const feeds = await res.json();
		if ("error" in feeds) {
			throw new Error(`Failed to fetch feeds: ${feeds.error}`);
		}
		return feeds;
	};

	return useSWR("articles", fetcher);
};

export const mutateFeeds = async () => {
	mutate("articles");
};
