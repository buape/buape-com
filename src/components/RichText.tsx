import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"
import { RichText as RichTextConverter } from "@payloadcms/richtext-lexical/react"
import { jsxConverter } from "~/components/converters"

type Props = {
	data: SerializedEditorState
} & React.HTMLAttributes<HTMLDivElement>

export function RichText(props: Props) {
	const { className, ...rest } = props

	return (
		<RichTextConverter
			{...rest}
			className={className}
			converters={jsxConverter}
		/>
	)
}
