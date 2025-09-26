export const dynamic = "force-dynamic"

import defaultMdxComponents from "fumadocs-ui/mdx"
import { Dot } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { createMetadata } from "~/app/createMetadata"
import GridPattern from "~/components/ui/grid-pattern"
import { blog } from "~/lib/source"
import { getStaff } from "~/lib/staff"
import { cn } from "~/lib/utils"

export default async function Page(props: {
	params: Promise<{ slug: string }>
}) {
	const params = await props.params
	const page = blog.getPage([params.slug])
	if (!page) notFound()

	const staff = await getStaff()
	if (!staff) notFound()
	const author = staff.data.staff.find(
		(x: { id: string }) => x.id === page.data.authorId
	)

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
					<div className="flex flex-row gap-2 items-center">
						<Image
							className="rounded-full"
							src={
								author?.avatarUrl || "https://cdn.buape.com/buape_circle.png"
							}
							width={32}
							height={32}
							alt={`${author?.username}'s Avatar`}
							unoptimized={author?.avatarUrl?.endsWith(".gif")}
						/>
						<span className="text-lg font-bold">
							{author?.username || page.data.authorId}
						</span>
						<Dot width={32} height={32} />
						<span className="text-lg font-bold">
							{new Date(
								page.data.date.valueOf() + page.data.date.getTimezoneOffset()
							).toLocaleDateString()}
						</span>
					</div>
				</header>
				<main className="w-screen bg-[#101013] py-20">
					<div className="max-w-full flex flex-col gap-4 text-left px-12 md:px-24 lg:px-48 prose prose-lg text-white">
						<page.data.body
							components={{ ...defaultMdxComponents, hr: () => <p>---</p> }}
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
	const page = blog.getPage([params.slug])

	if (!page) notFound()

	const staff = await getStaff()
	const author = staff?.data.staff.find(
		(x: { id: string }) => x.id === page.data.authorId
	)

	return createMetadata({
		title: `Blog: ${page.data.title}`,
		description: `${page.data.description}\n\nWritten by ${author?.username || page.data.authorId} on ${new Date(
			page.data.date.valueOf() + page.data.date.getTimezoneOffset()
		).toLocaleDateString()}`
	})
}

export function generateStaticParams(): { slug: string }[] {
	return []
}
