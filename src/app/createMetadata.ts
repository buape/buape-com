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
	metadataBase:
		process.env.NODE_ENV === "production"
			? new URL("https://www.buape.com")
			: new URL("http://localhost:3000"),
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
