import { draftMode } from "next/headers"
import { redirect } from "next/navigation"
import { payload } from "~/lib/payload"

// /api/preview?secret=!!!!!!!!&type=post&slug=testing
export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const secret = searchParams.get("secret")
	const type = searchParams.get("type")
	const slug = searchParams.get("slug")

	if (!process.env.DRAFT_SECRET) {
		return new Response("DRAFT_SECRET not set", { status: 500 })
	}

	if (secret !== process.env.DRAFT_SECRET || !slug || !type) {
		return new Response("Invalid token", { status: 401 })
	}

	if (!["page", "post"].includes(`${type}`)) {
		return new Response("Type must be one of [page, post]", { status: 400 })
	}

	const post = (
		await payload.find({
			collection: type === "page" ? "buape-com-pages" : "buape-com-posts",
			draft: true,
			where: {
				slug: {
					equals: slug
				}
			}
		})
	).docs[0]

	if (!post) {
		return new Response("Invalid slug", { status: 400 })
	}

	const draft = await draftMode()
	draft.enable()

	redirect(type === "post" ? `/blog/${post.slug}` : `/${post.slug}`)
}
