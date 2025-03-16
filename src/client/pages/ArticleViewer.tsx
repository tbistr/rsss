import {
	AspectRatio,
	Button,
	Card,
	Container,
	Image,
	SimpleGrid,
	Text,
} from "@mantine/core";
import type React from "react";
import { useState } from "react";
import Parser from "rss-parser";
import classes from "./test.module.css";

type Item = {
	title?: string;
	link?: string;
	thumbnail?: string;
	pubDate?: string;
};

const ArticleCards: React.FC<{ articles: Item[] }> = ({ articles }) => {
	const cards = articles.map((article) => (
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
	));

	return (
		<Container py="xl">
			<SimpleGrid cols={{ base: 1, sm: 2 }}>{cards}</SimpleGrid>
		</Container>
	);
};

export const ShowRSSFeeds = () => {
	const [rssItems, setRssItems] = useState<Item[]>([]);

	const parser = new Parser();

	const handle = async () => {
		try {
			const query = new URLSearchParams({
				url: "https://zenn.dev/feed",
			});
			const res = await fetch(`/cors-proxy?${query}`);
			const xml = await res.text();
			const feed = await parser.parseString(xml);
			const items = feed.items.map((item) => {
				return {
					title: item.title,
					link: item.link,
					thumbnail: item.enclosure?.url,
					pubDate: item.pubDate,
				};
			});
			setRssItems(items);
		} catch (error) {
			console.error("Failed to fetch RSS feed", error);
		}
	};

	return (
		<>
			<div>
				<Button onClick={handle}>Do</Button>
			</div>
			<div>
				{rssItems.length > 0 ? (
					<ArticleCards articles={rssItems} />
				) : (
					<Text size="xl">No articles</Text>
				)}
			</div>
		</>
	);
};
