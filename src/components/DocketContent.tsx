import type { ComponentProps } from "react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { FileTree } from "~/components/converters/FileTree"
import { HtmlBlock } from "~/components/converters/HtmlBlock"
import type { DocketEntry } from "~/components/DocketEntry"

export function DocketContent({ entry }: { entry: DocketEntry }) {
	return (
		<div className="payload-richtext">
			<Markdown
				remarkPlugins={[remarkGfm]}
				components={{
					h2: ({ children }) => (
						<h2
							id={String(children)
								.toLowerCase()
								.replace(/\s+/g, "-")
								.replace(/[^a-z0-9-]/g, "")}
						>
							{children}
						</h2>
					),
					a: ({ children, href, title }) => (
						<a
							href={href}
							title={title}
							target={/^https?:/.test(href ?? "") ? "_blank" : "_self"}
							rel="noopener noreferrer"
							className="link"
						>
							{children}
						</a>
					),
					ul: ({ children, className }) => (
						<ul
							className={["list-bullet", className].filter(Boolean).join(" ")}
						>
							{children}
						</ul>
					),
					img: ({ src, alt }) => <img src={src} alt={alt} />,
					p: ({ children, node }) => {
						const image = node?.children[0]
						if (
							node?.children.length === 1 &&
							image?.type === "element" &&
							image.tagName === "img"
						) {
							return (
								<figure>
									<picture>{children}</picture>
									<figcaption>
										{String(image.properties.title ?? "")}
									</figcaption>
								</figure>
							)
						}
						return <p>{children}</p>
					},
					pre: ({ children, node }) => {
						const code = node?.children[0]
						if (code?.type !== "element" || code.tagName !== "code")
							return <pre>{children}</pre>
						const language = String(code.properties.className ?? "").replace(
							/^language-/,
							""
						)
						const value = code.children
							.map((child) => (child.type === "text" ? child.value : ""))
							.join("")
							.replace(/\n$/, "")
						if (language === "html") return <HtmlBlock content={value} />
						if (language === "embed")
							return (
								<iframe
									src={value.trim()}
									title="Embedded content"
									className="w-full aspect-video border rounded"
									allowFullScreen
								/>
							)
						if (language === "filetree") {
							try {
								const parsed = JSON.parse(value)
								const fields = (
									Array.isArray(parsed) ? { data: parsed } : parsed
								) as ComponentProps<typeof FileTree>
								if (!fields || !Array.isArray(fields.data))
									throw new Error("Invalid tree")
								const pending: unknown[] = [...fields.data]
								while (pending.length) {
									const item = pending.pop()
									if (
										!item ||
										typeof item !== "object" ||
										!("id" in item) ||
										typeof item.id !== "string" ||
										!("name" in item) ||
										typeof item.name !== "string" ||
										!("type" in item) ||
										!["file", "folder"].includes(String(item.type))
									)
										throw new Error("Invalid tree item")
									if ("children" in item) {
										if (!Array.isArray(item.children))
											throw new Error("Invalid children")
										pending.push(...item.children)
									}
								}
								if (
									fields.defaultExpandedIds !== undefined &&
									(!Array.isArray(fields.defaultExpandedIds) ||
										!fields.defaultExpandedIds.every(
											(id) => typeof id === "string"
										))
								)
									throw new Error("Invalid expanded IDs")
								if (
									fields.selectedId !== undefined &&
									typeof fields.selectedId !== "string"
								)
									throw new Error("Invalid selected ID")
								return (
									<FileTree
										data={fields.data}
										defaultExpandedIds={fields.defaultExpandedIds}
										selectedId={fields.selectedId}
									/>
								)
							} catch {
								return <pre>{children}</pre>
							}
						}
						return <pre>{children}</pre>
					}
				}}
			>
				{entry.body}
			</Markdown>
		</div>
	)
}
