"use client"

import { cn } from "~/lib/utils"

type HtmlBlockProps = {
	content: string
	className?: string
}

export function HtmlBlock(props: HtmlBlockProps) {
	const { content, className } = props
	return (
		<div
			className={cn("cms-html-block", className)}
			// biome-ignore lint/security/noDangerouslySetInnerHtml: <a>
			dangerouslySetInnerHTML={{ __html: content }}
		/>
	)
}
