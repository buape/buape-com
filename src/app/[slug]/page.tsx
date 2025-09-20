import defaultMdxComponents from "fumadocs-ui/mdx"
import { Card, Cards } from "fumadocs-ui/components/card"
import { Callout } from "fumadocs-ui/components/callout"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { createMetadata } from "~/app/createMetadata"
import GridPattern from "~/components/ui/grid-pattern"
import { pages } from "~/lib/source"
import { cn } from "~/lib/utils"

export default async function Page(props: {
	params: Promise<{ slug: string }>
}) {
	const params = await props.params
	const page = pages.getPage([params.slug])
	if (!page) notFound()

	return (
		<>
			<GridPattern
				className={cn(
					"mask-[linear-gradient(to_bottom,white,transparent,transparent)] -z-50"
				)}
			/>
			<article className="m-10 items-center justify-center bg-neutral-950 p-5 text-white">
				<header className="flex flex-col gap-10 items-center m-5 pb-5 border-b border-neutral-300">
					<h1 className="text-3xl font-bold">{page.data.title}</h1>
					<span className="text-xl font-bold">{page.data.description}</span>
				</header>
				<main>
					<div className="prose prose-lg max-w-none p-10">
						<div className="mt-10">
							<page.data.body components={{ ...defaultMdxComponents, Card, Cards, Callout }} />
						</div>
					</div>
				</main>
			</article>
		</>
	)
}

export async function generateMetadata(props: {
	params: Promise<{ slug: string }>
}): Promise<Metadata> {
	const params = await props.params
	const page = pages.getPage([params.slug])

	if (!page) notFound()

	return createMetadata({
		title: `${page.data.title}`,
		description: page.data.description ?? " "
	})
}

export function generateStaticParams(): { slug: string }[] {
	return pages.getPages().map((page) => ({
		slug: page.slugs.join("/")
	}))
}
