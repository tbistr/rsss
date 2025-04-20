import type { AppType } from "@/server";
import { hc } from "hono/client";
import Parser from "rss-parser";
import useSWR from "swr";

export const api = hc<AppType>("/api");

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
