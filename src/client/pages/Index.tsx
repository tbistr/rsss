import { useCorsProxy } from "@/client/api";
import {
	ArticleCards,
	ArticleCardsSkelton,
} from "@/client/components/ArticleCard";

export const Articles = () => {
	const { data, isLoading, error } = useCorsProxy("https://zenn.dev/feed");

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (isLoading || !data) {
		return <ArticleCardsSkelton count={12} />;
	}

	const items = data.items.map((item) => ({
		title: item.title,
		link: item.link,
		thumbnail: item.enclosure?.url,
		pubDate: item.pubDate,
	}));

	return <ArticleCards articles={items} />;
};
