import type { AppType } from "@/server";
import type { InferRequestType } from "hono";
import { hc } from "hono/client";
import Parser from "rss-parser";
import useSWR from "swr";

export const api = hc<AppType>("/api");

export const useFeeds = (arg: InferRequestType<typeof api.feeds.$get>) => {
	const fetcher = async () => {
		const res = await api.feeds.$get(arg);
		if (res.ok) {
			return res.json();
		}
		throw new Error(`Failed to fetch feeds: ${res.body}`);
	};

	return useSWR("articles", fetcher);
};

export const useCorsProxy = (url: string) => {
	const fetcher = async () => {
		const query = new URLSearchParams({ url });
		const res = await fetch(`/api/cors-proxy?${query}`);
		const parser = new Parser();
		const xml = await res.text();
		return await parser.parseString(xml);
	};

	return useSWR(`cors-proxy:${url}`, fetcher);
};
