import type { SerializedLinkNode } from "@payloadcms/richtext-lexical"
import type { JSXConverters } from "@payloadcms/richtext-lexical/react"

export const linkConverter: JSXConverters<SerializedLinkNode> = {
	link: ({ node, nodesToJSX }) => {
		return (
			<a
				href={node.fields.url}
				target={node.fields.newTab ? "_blank" : "_self"}
				className="link"
			>
				{nodesToJSX({ nodes: node.children })}
			</a>
		)
	}
}
