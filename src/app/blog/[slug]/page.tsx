export const dynamic = "force-dynamic"

// import { Dot } from "lucide-react"
import type { Metadata } from "next"
import { draftMode } from "next/headers"
import Image from "next/image"
import { notFound } from "next/navigation"
import { createMetadata } from "~/app/createMetadata"
import { RefreshRouteOnSave } from "~/components/RefreshOnSave"
import { RichText } from "~/components/RichText"
import GridPattern from "~/components/ui/grid-pattern"
import { payload } from "~/lib/payload"
import { getStaff } from "~/lib/staff"
import { cn } from "~/lib/utils"

export default async function Page(props: {
	params: Promise<{ slug: string }>
}) {
	const params = await props.params
	const { isEnabled: isDraftMode } = await draftMode()
	const page = (
		await payload.find({
			collection: "buape-com-posts",
			draft: isDraftMode,
			where: {
				slug: {
					equals: params.slug
				}
			}
		})
	).docs[0]

	if (!page) notFound()
	const staff = await getStaff()
	if (!staff) notFound()
	const authorId =
		typeof page.author === "string" ? page.author : page.author.id
	const author = staff.data.staff.find((x: { id: string }) => x.id === authorId)

	// const publishedDate = new Date(page.publishedAt ?? page.createdAt)

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
							{author?.username || authorId}
						</span>
						{/* <Dot width={32} height={32} />
						<span className="text-lg font-bold">
							{new Date(
								publishedDate.valueOf() + publishedDate.getTimezoneOffset()
							).toLocaleDateString()}
						</span> */}
					</div>
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
	const page = (
		await payload.find({
			collection: "buape-com-posts",
			where: {
				slug: {
					equals: params.slug
				}
			}
		})
	).docs[0]

	if (!page) notFound()

	const staff = await getStaff()
	const author = staff?.data.staff.find(
		(x: { id: string }) =>
			x.id === (typeof page.author === "string" ? page.author : page.author.id)
	)

	return createMetadata({
		title: `Blog: ${page.title}`,
		description: `${page.description}\n\nWritten by ${author?.username || (typeof page.author === "string" ? page.author : page.author.id)}`
		//  on ${new Date(
		// 	new Date(page.publishedAt ?? page.createdAt).valueOf() +
		// 		new Date(page.publishedAt ?? page.createdAt).getTimezoneOffset()
		// ).toLocaleDateString()}`
	})
}
