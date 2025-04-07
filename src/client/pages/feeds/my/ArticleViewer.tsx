import {
	AspectRatio,
	Card,
	Container,
	Image,
	SimpleGrid,
	Skeleton,
	Text,
} from "@mantine/core";
import type React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import Parser from "rss-parser";

import classes from "./articleCard.module.css";

type Item = {
	title?: string;
	link?: string;
	thumbnail?: string;
	pubDate?: string;
};

export const ShowRSSFeeds = () => {
	const [rssItems, setRssItems] = useState<Item[]>([]);

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
		<ArticlesSkeleton />
	) : (
		<ArticleCards articles={rssItems} />
	);
};

const ArticleCard: React.FC<{ article: Item }> = ({ article }) => (
	<Card
		key={article.title}
		p="md"
		radius="md"
		component="a"
		href="#"
		className={classes.card}
	>
		<AspectRatio ratio={1920 / 1080}>
			<Image src={article.thumbnail} />
		</AspectRatio>
		<Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md">
			{article.pubDate}
		</Text>
		<Text className={classes.title} mt={5}>
			{article.title}
		</Text>
	</Card>
);

const ArticleCards: React.FC<{ articles: Item[] }> = ({ articles }) => {
	const cards = articles.map((article) => (
		<ArticleCard key={article.title} article={article} />
	));

	return (
		<Container py="xl">
			<SimpleGrid cols={{ base: 1, sm: 2 }}>{cards}</SimpleGrid>
		</Container>
	);
};

const ArticlesSkeleton: React.FC<{ count?: number }> = ({ count = 12 }) => {
	return (
		<SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
			{Array.from({ length: count }).map((_, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey:
				<div key={index}>
					<Skeleton height={240} />
					<Skeleton height={12} mt={6} width="30%" radius="xl" />
					<Skeleton height={12} mt={6} radius="xl" />
				</div>
			))}
		</SimpleGrid>
	);
};
