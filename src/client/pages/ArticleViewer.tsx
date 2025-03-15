import { useState } from "react";
import Parser from "rss-parser";

export const ArticleViewer = () => {
	return <ShowRSSFeed />;
};

const ShowRSSFeed = () => {
	type Item = {
		title?: string;
		link?: string;
		pubDate?: string;
	};
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
			setRssItems(feed.items);
		} catch (error) {
			console.error("Failed to fetch RSS feed", error);
		}
	};

	return (
		<div>
			<button type="button" onClick={handle}>
				Do
			</button>
			<table border={1}>
				<thead>
					<tr>
						<th>Title</th>
						<th>Link</th>
						<th>Published</th>
					</tr>
				</thead>
				<tbody>
					{rssItems.map((item, index) => (
						<tr key={item.title + index.toString()}>
							<td>{item.title}</td>
							<td>
								<a href={item.link} target="_blank" rel="noopener noreferrer">
									Read More
								</a>
							</td>
							<td>{item.pubDate}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
