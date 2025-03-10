import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, test } from "vitest";
import { RSSParser } from "./rss";

describe("RSS2.0 Parser", () => {
	test("With no items", () => {
		const parser = new RSSParser();
		const xml = `
			<rss version="2.0">
				<channel>
					<title>Sample Feed</title>
					<link>https://example.com</link>
					<description>Sample RSS feed</description>
				</channel>
			</rss>
		`;
		const feed = parser.parse(xml);
		expect(feed).toEqual({
			version: "2.0",
			channel: {
				title: "Sample Feed",
				link: "https://example.com",
				description: "Sample RSS feed",
				items: [],
			},
		});
	});

	const ASSET_BASE = resolve(__dirname, "./tests/assets/rss/input");

	test("RSS2.0 sample file", () => {
		const parser = new RSSParser();
		const xmlPath = resolve(ASSET_BASE, "rss2sample.rss");
		const xmlData = readFileSync(xmlPath, "utf-8");
		parser.parse(xmlData);
	});

	test("Zenn.dev RSS feed", () => {
		const parser = new RSSParser();
		const xmlPath = resolve(ASSET_BASE, "zenn.rss");
		const xmlData = readFileSync(xmlPath, "utf-8");
		parser.parse(xmlData);
	});

	test("Reddit RSS feed", () => {
		const parser = new RSSParser();
		const xmlPath = resolve(ASSET_BASE, "reddit.rss");
		const xmlData = readFileSync(xmlPath, "utf-8");
		parser.parse(xmlData);
	});
});
