import { Dot } from "lucide-react"
import { type LoaderFunctionArgs, useLoaderData } from "react-router"
import { RefreshRouteOnSave } from "~/components/RefreshOnSave"
import { RichText } from "~/components/RichText"
import GridPattern from "~/components/ui/grid-pattern"
import { getPost, getStaff } from "~/lib/api"
import { cn, formatPublishedDate } from "~/lib/utils"

export async function blogPostLoader({ params }: LoaderFunctionArgs) {
	if (!params.slug) throw new Response("Not found", { status: 404 })
	const [page, staff] = await Promise.all([getPost(params.slug), getStaff()])
	return { page, staff }
}

export default function BlogPost() {
	const { page, staff } = useLoaderData() as Awaited<
		ReturnType<typeof blogPostLoader>
	>
	const authorId =
		typeof page.author === "string" ? page.author : page.author.id
	const author = staff.data.staff.find((x) => x.id === authorId)
	const publishedDate = new Date(page.publishedAt ?? page.createdAt)

	return (
		<>
			<RefreshRouteOnSave />
			<GridPattern
				className={cn(
					"mask-[linear-gradient(to_bottom,white,transparent,transparent)]"
				)}
			/>
			<article className="relative flex size-full flex-col w-screen max-w-(--breakpoint-lg) min-h-dvh items-center justify-center container">
				<header className="flex flex-col gap-6 items-center m-5 pb-5 mt-24 text-center">
					<h1 className="text-3xl font-bold mb-0">{page.title}</h1>
					<h2 className="text-xl font-bold mt-0">{page.description}</h2>
					<div className="flex flex-row gap-2 items-center mt-8">
						<img
							className="rounded-full"
							src={
								author?.avatarUrl || "https://cdn.buape.com/buape_circle.png"
							}
							width={32}
							height={32}
							alt={`${author?.username || authorId}'s Avatar`}
						/>
						<span className="text-lg font-bold">
							{author?.username || authorId}
						</span>
						<Dot width={32} height={32} />
						<span className="text-lg font-bold">
							{formatPublishedDate(publishedDate)}
						</span>
					</div>
				</header>
				<main className="w-screen bg-[#101013] py-20">
					<div className="max-w-full flex flex-col text-left px-12 md:px-24 lg:px-48 prose prose-lg text-white">
						<RichText data={page.content} />
					</div>
				</main>
			</article>
		</>
	)
}
