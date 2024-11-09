import type { Metadata } from "next"
import { notFound } from "next/navigation"
import defaultMdxComponents from "fumadocs-ui/mdx"
import { blog } from "~/lib/source"
import { createMetadata } from "~/app/createMetadata"
import Image from "next/image"
import { HeroBackground } from "~/app/home/Hero"
import { Footer } from "~/app/home/Footer"
import { Dot } from "lucide-react"

export default async function Page(props: {
	params: Promise<{ slug: string }>
}) {
	const params = await props.params
	const page = blog.getPage([params.slug])
	if (!page) notFound()

	const staff = await fetch("https://internal.buape.com/staff", {
		cache: "force-cache",
		next: { revalidate: 3600 }
	}).then((res) => res.json())

	const author = staff.data.staff.find(
		(x: { id: string }) => x.id === page.data.authorId
	)

	return (
		<>
			<HeroBackground />
			<article className="m-10 items-center justify-center bg-neutral-950 p-5 text-white">
				<header className="flex flex-col gap-10 items-center m-5 pb-5 border-b border-neutral-300">
					<h1 className="text-3xl font-bold">{page.data.title}</h1>
					<div className="flex flex-row gap-2 items-center">
						<Image
							className="rounded-full"
							src={author.avatarUrl || "https://cdn.buape.com/buape_circle.png"}
							width={32}
							height={32}
							alt={`${author.username}'s Avatar`}
						/>
						<span className="text-lg font-bold">{author.username}</span>
						<Dot width={32} height={32} />
						<span className="text-lg font-bold">
							{new Date(
								page.data.date.valueOf() + page.data.date.getTimezoneOffset()
							).toLocaleDateString()}
						</span>
					</div>
				</header>
				<main>
					<div className="prose prose-lg max-w-none p-10">
						<div className="mt-10">
							<page.data.body
								components={{ ...defaultMdxComponents, hr: () => <p>---</p> }}
							/>
						</div>
					</div>
				</main>
			</article>
			<Footer />
		</>
	)
}

export async function generateMetadata(props: {
	params: Promise<{ slug: string }>
}): Promise<Metadata> {
	const params = await props.params
	const page = blog.getPage([params.slug])

	if (!page) notFound()

	const staff = await fetch("https://internal.buape.com/staff", {
		next: { revalidate: 3600 }
	}).then((res) => res.json())

	const author = staff.data.staff.find(
		(x: { id: string }) => x.id === page.data.authorId
	)

	return createMetadata({
		title: `Blog: ${page.data.title}`,
		description: `${page.data.description}\n\nWritten by ${author.username} on ${new Date(
			page.data.date.valueOf() + page.data.date.getTimezoneOffset()
		).toLocaleDateString()}`
	})
}

export function generateStaticParams(): { slug: string }[] {
	return blog.getPages().map((page) => ({
		slug: page.slugs.join("/")
	}))
}
