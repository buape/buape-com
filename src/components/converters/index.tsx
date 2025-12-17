import type {
	DefaultNodeTypes,
	SerializedBlockNode
} from "@payloadcms/richtext-lexical"
import type { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react"

import { fileTreeConverter } from "./FileTreeConverter"
import { headingConverter } from "./HeadingConverter"
import { linkConverter } from "./LinkConverter"

type NodeTypes = DefaultNodeTypes | SerializedBlockNode

export const jsxConverter: JSXConvertersFunction<NodeTypes> = ({
	defaultConverters
}) => ({
	...defaultConverters,
	...headingConverter,
	...linkConverter,
	...fileTreeConverter
})
