import type { JSXConverters } from "@payloadcms/richtext-lexical/react"
import { FileTree, type FileTreeNode } from "./FileTree"

export type SerializedFileTreeNode = {
	type: "filetree"
	fields: {
		data: FileTreeNode[]
		defaultExpandedIds?: string[]
		selectedId?: string
	}
	version: number
}

export const fileTreeConverter: JSXConverters<SerializedFileTreeNode> = {
	filetree: ({ node }) => {
		return (
			<FileTree
				data={node.fields.data}
				defaultExpandedIds={node.fields.defaultExpandedIds}
				selectedId={node.fields.selectedId}
			/>
		)
	}
}
