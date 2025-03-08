export interface RSSItem {
	title: string;
	link: string;
	pubDate?: string;
	description?: string;
}

export interface RSSChannel {
	title: string;
	link: string;
	description?: string;
	items: RSSItem[];
}

export interface RSSFeed {
	version: string;
	channel: RSSChannel;
}

export class RSSParser {
	parse(xml: string): RSSFeed {
		const parser = new DOMParser();
		const doc = parser.parseFromString(xml, "application/xml");

		if (doc.querySelector("parsererror")) {
			throw new Error("Invalid XML format");
		}

		const rssElement = doc.querySelector("rss");
		if (!rssElement) {
			throw new Error("Invalid RSS feed");
		}

		const version = rssElement.getAttribute("version");
		if (!version || version !== "2.0") {
			throw new Error("Unsupported RSS version");
		}

		const channelElement = rssElement.querySelector("channel");
		if (!channelElement) {
			throw new Error("Missing <channel> element in RSS feed");
		}

		return {
			version: rssElement.getAttribute("version") || "2.0",
			channel: {
				title: this.getText(channelElement, "title"),
				link: this.getText(channelElement, "link"),
				description: this.getText(channelElement, "description"),
				items: Array.from(channelElement.querySelectorAll("item")).map(
					(item) => ({
						title: this.getText(item, "title"),
						link: this.getText(item, "link"),
						pubDate: this.getText(item, "pubDate"),
						description: this.getText(item, "description"),
					}),
				),
			},
		};
	}

	private getText(element: Element, tagName: string): string {
		const tag = element.querySelector(tagName);
		return tag?.textContent?.trim() || "";
	}
}
