import { XMLParser } from "fast-xml-parser";

// All date-times in RSS conform to the Date and Time Specification of RFC 822, with the exception that the year may be expressed with two characters or four characters (four preferred).
// Ex. Sat, 07 Sep 2002 00:00:01 GMT

export interface RSS {
	version: "2.0";
	/** https://www.rssboard.org/rss-specification#aboutThisDocument */
	channel: Channel;
}

interface Channel {
	title: string;
	link: string;
	description: string;
	items: Item[];

	language?: string;
	copyright?: string;
	managingEditor?: string;
	webMaster?: string;
	pubDate?: string;
	lastBuildDate?: string;
	category?: Category;
	generator?: string;
	docs?: string;
	// biome-ignore lint/suspicious/noExplicitAny: cloud is not used in practice
	cloud?: any;
	ttl?: number; // (minutes)
	image?: Image;
	rating?: string;
	// biome-ignore lint/suspicious/noExplicitAny: textInput is not used in practice
	textInput?: any;
	skipHours?: number[];
	skipDays?: string[];
}

interface Item {
	/** All elements of an item are optional, however at least one of title or description must be present. */
	title?: string;
	link?: string;
	description?: string;
	author?: string;
	category?: string[];
	comments?: string;
	enclosure?: Enclosure;
	guid?: Guid;
	pubDate?: string;
	source?: Source;
}

interface Category {
	"#text": string;
	"@_domain"?: string;
}

interface Image {
	url: string;
	title: string;
	link: string;
	width?: number;
	height?: number;
	description?: string;
}

interface Enclosure {
	"@_url": string;
	"@_length": number;
	"@_type": string;
}

interface Source {
	"#text": string;
	"@_url": string;
}

interface Guid {
	"#text": string;
	"@_isPermaLink"?: boolean;
}

export class RSSParser {
	private parser: XMLParser;

	constructor() {
		this.parser = new XMLParser({ ignoreAttributes: false });
	}

	parse(xml: string): RSS {
		const result = this.parser.parse(xml);

		if (!result.rss || !result.rss.channel) {
			throw new Error("Invalid RSS XML format");
		}

		if (result.rss["@_version"] !== "2.0") {
			throw new Error("Unsupported RSS version");
		}

		const channel: Channel = result.rss.channel;
		channel.items = Array.isArray(result.rss.channel.item || [])
			? result.rss.channel.item || []
			: [result.rss.channel.item];

		return {
			version: "2.0",
			channel,
		};
	}
}
