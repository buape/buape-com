import type { Metadata } from "next"

export const createMetadata = ({
	title,
	description
}: {
	title?: string
	description?: string
}): Metadata => ({
	title: title ?? "Buape Studios",
	description:
		description ??
		"Buape Studios is a development studio committed to producing quality applications, as well as empowering and supporting the next generation of developers.",
	metadataBase: new URL("https://www.buape.com"),
	twitter: {
		card: "summary",
		title: title ?? "Buape Studios",
		description:
			description ??
			"Buape Studios is a development studio committed to producing quality applications, as well as empowering and supporting the next generation of developers.",
		images: [
			{
				url: "https://cdn.buape.com/buape_circle.png",
				width: 1200,
				height: 630,
				alt: "Buape Studios"
			}
		]
	},
	icons: {
		icon: "/favicon.ico",
		apple: "/apple-touch-icon.png"
	}
})
