import { Dot } from "lucide-react"
import { type LoaderFunctionArgs, useLoaderData } from "react-router"
import { DocketContent } from "~/components/DocketContent"
import GridPattern from "~/components/ui/grid-pattern"
import { docket } from "~/lib/docket"
import { cn, formatPublishedDate } from "~/lib/utils"

export async function docketLoader({ params }: LoaderFunctionArgs) {
	const category = params.entrySlug ? "blog" : "pages"
	const entrySlug = params.entrySlug ?? params.slug
	if (!category || !entrySlug) throw new Response("Not found", { status: 404 })
	const { data, error } = await docket.GET("/api/content/{slug}/{entrySlug}", {
		path: { slug: category, entrySlug }
	})
	if (error || !data || !("title" in data))
		throw new Response("Not found", { status: 404 })
	return { entry: data, category }
}

export default function DocketPage() {
	const { entry, category } = useLoaderData() as Awaited<
		ReturnType<typeof docketLoader>
	>
	const isBlog = category === "blog"

	return (
		<>
			<GridPattern
				className={cn(
					"mask-[linear-gradient(to_bottom,white,transparent,transparent)]"
				)}
			/>
			<article className="relative flex size-full flex-col w-screen max-w-(--breakpoint-lg) min-h-dvh items-center justify-center container">
				<header
					className={
						isBlog
							? "flex flex-col gap-6 items-center m-5 pb-5 mt-24 text-center"
							: "flex flex-col gap-10 items-center m-5 pb-5 mt-32 text-center"
					}
				>
					<h1
						className={
							isBlog ? "text-3xl font-bold mb-0" : "text-3xl font-bold"
						}
					>
						{entry.title}
					</h1>
					{typeof entry.frontmatter.description === "string" && (
						<h2 className="text-xl font-bold mt-0">
							{entry.frontmatter.description}
						</h2>
					)}
					{isBlog && (
						<div className="flex flex-row gap-2 items-center mt-8">
							<img
								className="rounded-full"
								src={
									entry.author?.picture ||
									"https://cdn.buape.com/buape_circle.png"
								}
								width={32}
								height={32}
								alt={`${entry.author?.name || "Buape"}'s Avatar`}
							/>
							<span className="text-lg font-bold">
								{entry.author?.name || "Buape"}
							</span>
							<Dot width={32} height={32} />
							<span className="text-lg font-bold">
								{formatPublishedDate(entry.publishedAt)}
							</span>
						</div>
					)}
				</header>
				<main className="w-screen bg-[#101013] py-20">
					<div className="max-w-full flex flex-col text-left px-12 md:px-24 lg:px-48 prose prose-lg text-white">
						<DocketContent entry={entry} />
					</div>
				</main>
			</article>
		</>
	)
}
