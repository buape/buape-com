import type {
	DefaultNodeTypes,
	SerializedBlockNode
} from "@payloadcms/richtext-lexical"
import type { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react"

import { fileTreeConverter } from "./FileTreeConverter"
import { headingConverter } from "./HeadingConverter"
import { htmlConverter } from "./HtmlConverter"
import { linkConverter } from "./LinkConverter"
import { UploadJSXConverter } from "./UploadConverter"

type NodeTypes = DefaultNodeTypes | SerializedBlockNode

export const jsxConverter: JSXConvertersFunction<NodeTypes> = ({
	defaultConverters
}) => ({
	...defaultConverters,
	...UploadJSXConverter,
	...headingConverter,
	...linkConverter,
	...fileTreeConverter,
	...htmlConverter
})
