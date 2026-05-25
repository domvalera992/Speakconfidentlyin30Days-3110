import { useEffect } from "react";
import siteConfig from "../../../website.config.json";

export function Metadata() {
	useEffect(() => {
		// Set document title
		document.title = siteConfig.name;

		// Helper to set or create meta tags
		const setMetaTag = (selector: string, attribute: string, value: string) => {
			let meta = document.querySelector(selector) as HTMLMetaElement | null;
			if (!meta) {
				meta = document.createElement("meta");
				if (selector.includes("property=")) {
					const propertyMatch = selector.match(/property="([^"]+)"/);
					if (propertyMatch) meta.setAttribute("property", propertyMatch[1]);
				} else if (selector.includes("name=")) {
					const nameMatch = selector.match(/name="([^"]+)"/);
					if (nameMatch) meta.setAttribute("name", nameMatch[1]);
				}
				document.head.appendChild(meta);
			}
			meta.setAttribute(attribute, value);
		};

		// Description
		setMetaTag('meta[name="description"]', "content", siteConfig.description);

		// Open Graph
		setMetaTag('meta[property="og:title"]', "content", siteConfig.name);
		setMetaTag('meta[property="og:description"]', "content", siteConfig.description);
		setMetaTag('meta[property="og:image"]', "content", siteConfig.ogImage);
		setMetaTag('meta[property="og:url"]', "content", siteConfig.url);
		setMetaTag('meta[property="og:type"]', "content", "website");

		// Twitter
		setMetaTag('meta[name="twitter:card"]', "content", siteConfig.twitter.card);
		setMetaTag('meta[name="twitter:site"]', "content", siteConfig.twitter.site);
		setMetaTag('meta[name="twitter:title"]', "content", siteConfig.name);
		setMetaTag('meta[name="twitter:description"]', "content", siteConfig.description);
		setMetaTag('meta[name="twitter:image"]', "content", siteConfig.ogImage);

		// Theme color
		setMetaTag('meta[name="theme-color"]', "content", siteConfig.themeColor);
	}, []);

	return null;
}
