import { AspectRatio, Card, Container, Image, Text } from "@mantine/core";
import { SimpleGrid, Skeleton } from "@mantine/core";

export interface ArticleCardItem {
	title?: string;
	link?: string;
	thumbnail?: string;
	pubDate?: string;
}

import classes from "./articleCard.module.css";
export const ArticleCard = ({ article }: { article: ArticleCardItem }) => (
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

export const ArticleCards: React.FC<{ articles: ArticleCardItem[] }> = ({
	articles,
}) => {
	const cards = articles.map((article) => (
		<ArticleCard key={article.title} article={article} />
	));

	return (
		<Container py="xl">
			<SimpleGrid cols={{ base: 1, sm: 2 }}>{cards}</SimpleGrid>
		</Container>
	);
};

export const ArticleCardsSkelton = ({ count }: { count: number }) => {
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
