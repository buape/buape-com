import type { Metadata } from "next"
import { draftMode } from "next/headers"
import { notFound } from "next/navigation"
import { createMetadata } from "~/app/createMetadata"
import { RefreshRouteOnSave } from "~/components/RefreshOnSave"
import { RichText } from "~/components/RichText"
import GridPattern from "~/components/ui/grid-pattern"
import { payload } from "~/lib/payload"
import { cn } from "~/lib/utils"

export default async function Page(props: {
	params: Promise<{ slug: string }>
}) {
	const params = await props.params
	const { isEnabled: isDraftMode } = await draftMode()
	const page = (
		await payload.find({
			collection: "buape-com-pages",
			draft: isDraftMode,
			where: !isDraftMode
				? {
						and: [
							{
								_status: {
									equals: "published"
								}
							},
							{
								slug: {
									equals: params.slug
								}
							}
						]
					}
				: {
						slug: {
							equals: params.slug
						}
					}
		})
	).docs[0]

	if (!page) notFound()

	return (
		<>
			<RefreshRouteOnSave />
			<GridPattern
				className={cn(
					"mask-[linear-gradient(to_bottom,white,transparent,transparent)]"
				)}
			/>
			<article className="relative flex size-full flex-col w-screen max-w-(--breakpoint-lg) min-h-dvh items-center justify-center container">
				<header className="flex flex-col gap-10 items-center m-5 pb-5 mt-32 text-center">
					<h1 className="text-3xl font-bold">{page.title}</h1>
					<h2 className="text-xl font-bold">{page.description}</h2>
				</header>
				<main className="w-screen bg-[#101013] py-20">
					<div className="max-w-full flex flex-col gap-4 text-left px-12 md:px-24 lg:px-48 prose prose-lg text-white">
						<RichText data={page.content} />
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
	const { isEnabled: isDraftMode } = await draftMode()
	const page = (
		await payload.find({
			collection: "buape-com-pages",
			draft: isDraftMode,
			where: !isDraftMode
				? {
						and: [
							{
								_status: {
									equals: "published"
								}
							},
							{
								slug: {
									equals: params.slug
								}
							}
						]
					}
				: {
						slug: {
							equals: params.slug
						}
					}
		})
	).docs[0]

	if (!page) notFound()

	return createMetadata({
		title: `${page.title}`,
		description: page.description ?? " "
	})
}
