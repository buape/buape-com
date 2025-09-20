import type { Metadata } from "next"

export const createMetadata = ({
	title,
	description
}: {
	title?: string
	description?: string
}): Metadata => ({
	title: title ?? "Buape Studios",
	description,
	metadataBase: new URL("https://www.buape.com"),
	twitter: {
		card: "summary",
		title: title ?? "Buape Studios",
		description,
		images: [
			{
				url: "https://cdn.buape.com/buape_circle.png",
				width: 512,
				height: 512,
				alt: "Buape Studios"
			}
		]
	}
})
