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
					"mask-[linear-gradient(to_bottom,white,transparent,transparent)]"
				)}
			/>
			<article className="relative flex size-full flex-col w-screen max-w-(--breakpoint-lg) min-h-dvh items-center justify-center container">
				<header className="flex flex-col gap-10 items-center m-5 pb-5 mt-32 text-center">
					<h1 className="text-3xl font-bold">{page.data.title}</h1>
					<h2 className="text-xl font-bold">{page.data.description}</h2>
				</header>
				<main className="w-screen bg-[#101013] py-20">
					<div className="max-w-full flex flex-col gap-4 text-left px-12 md:px-24 lg:px-48 prose prose-lg text-white">
						<page.data.body
							components={{
								...defaultMdxComponents,
								hr: () => <p>---</p>,
								Card,
								Cards,
								Callout
							}}
						/>
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
