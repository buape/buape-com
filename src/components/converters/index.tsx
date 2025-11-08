import type {
	DefaultNodeTypes,
	SerializedBlockNode
} from "@payloadcms/richtext-lexical"
import type { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react"

import { headingConverter } from "./HeadingConverter"

type NodeTypes = DefaultNodeTypes | SerializedBlockNode

export const jsxConverter: JSXConvertersFunction<NodeTypes> = ({
	defaultConverters
}) => ({
	...defaultConverters,
	...headingConverter
})
