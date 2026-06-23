import { type LoaderFunctionArgs, useLoaderData } from "react-router"
import { RefreshRouteOnSave } from "~/components/RefreshOnSave"
import { RichText } from "~/components/RichText"
import GridPattern from "~/components/ui/grid-pattern"
import { getPage } from "~/lib/api"
import { cn } from "~/lib/utils"

export async function cmsPageLoader({ params }: LoaderFunctionArgs) {
	if (!params.slug) throw new Response("Not found", { status: 404 })
	return getPage(params.slug)
}

export default function CmsPage() {
	const page = useLoaderData() as Awaited<ReturnType<typeof cmsPageLoader>>

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
