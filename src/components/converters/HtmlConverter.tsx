import type { JSXConverters } from "@payloadcms/richtext-lexical/react"
import { HtmlBlock } from "./HtmlBlock"

export type SerializedHtmlNode = {
	type: "html"
	fields: {
		content: string
	}
	version: number
}

export const htmlConverter: JSXConverters<SerializedHtmlNode> = {
	html: ({ node }) => {
		return <HtmlBlock content={node.fields.content} />
	}
}
