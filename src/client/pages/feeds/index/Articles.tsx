import {
	type ArticleCardItem,
	ArticleCards,
	ArticleCardsSkelton,
} from "@/client/components/ArticleCard/ArticleCard";
import { useCallback, useEffect, useMemo, useState } from "react";
import Parser from "rss-parser";

export const Articles = () => {
	const [rssItems, setRssItems] = useState<ArticleCardItem[]>([]);

	const parser = useMemo(() => new Parser(), []);

	const fetch_rss = useCallback(async () => {
		setRssItems([]);
		try {
			const query = new URLSearchParams({ url: "https://zenn.dev/feed" });
			const res = await fetch(`/api/cors-proxy?${query}`);
			const xml = await res.text();
			const feed = await parser.parseString(xml);
			const items = feed.items.map((item) => ({
				title: item.title,
				link: item.link,
				thumbnail: item.enclosure?.url,
				pubDate: item.pubDate,
			}));

			setRssItems(items);
		} catch (error) {
			console.error("Failed to fetch RSS feed", error);
		}
	}, [parser]);

	useEffect(() => {
		fetch_rss();
	}, [fetch_rss]);

	return rssItems.length === 0 ? (
		<ArticleCardsSkelton count={12} />
	) : (
		<ArticleCards articles={rssItems} />
	);
};
