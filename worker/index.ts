import { payload } from "~/lib/payload"

type Env = {
	ASSETS: {
		fetch(request: Request): Promise<Response>
	}
	DRAFT_SECRET?: string
}

const json = (data: unknown, init?: ResponseInit) =>
	new Response(JSON.stringify(data), {
		...init,
		headers: {
			"content-type": "application/json",
			...init?.headers
		}
	})

const draftEnabled = (request: Request) =>
	request.headers.get("cookie")?.includes("buape_draft=1") ?? false

const isDraftRequest = (request: Request, url: URL) =>
	url.searchParams.get("draft") === "1" && draftEnabled(request)

const publishedWhere = {
	_status: {
		equals: "published"
	}
}

const escapeHtml = (value = "") =>
	value
		.replaceAll("&", "&amp;")
		.replaceAll('"', "&quot;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")

type PageMetadata = {
	title?: string
	description?: string
}

const metadataTags = ({
	title = "Buape Studios",
	description
}: PageMetadata) => {
	const safeTitle = escapeHtml(title)
	const safeDescription = escapeHtml(description)
	const descriptionTags = description
		? `
		<meta name="description" content="${safeDescription}" />
		<meta name="twitter:description" content="${safeDescription}" />`
		: ""

	return `
		<title>${safeTitle}</title>${descriptionTags}
		<meta name="twitter:card" content="summary" />
		<meta name="twitter:title" content="${safeTitle}" />
		<meta name="twitter:image" content="https://cdn.buape.com/buape_circle.png" />`
}

async function pageMetadata(request: Request, url: URL): Promise<PageMetadata> {
	if (url.pathname === "/" || url.pathname === "/branding") {
		return {
			title: url.pathname === "/branding" ? "Branding Guide" : "Buape Studios",
			description:
				url.pathname === "/branding"
					? "Last updated: October 25, 2025"
					: undefined
		}
	}

	const draft = draftEnabled(request)
	const blogMatch = url.pathname.match(/^\/blog\/([^/]+)$/)
	if (blogMatch?.[1]) {
		const post = (
			await payload.find({
				collection: "buape-com-posts",
				draft,
				where: draft
					? { slug: { equals: decodeURIComponent(blogMatch[1]) } }
					: {
							and: [
								publishedWhere,
								{ slug: { equals: decodeURIComponent(blogMatch[1]) } }
							]
						}
			})
		).docs[0]

		if (!post) return {}

		const staff = await fetch("https://internal.buape.com/staff")
			.then((res) =>
				res.ok
					? (res.json() as Promise<{
							data?: { staff?: { id: string; username?: string }[] }
						}>)
					: undefined
			)
			.catch(() => undefined)
		const authorId =
			typeof post.author === "string" ? post.author : post.author.id
		const author = staff?.data?.staff?.find((x) => x.id === authorId)
		const date = new Intl.DateTimeFormat("en-US", {
			month: "long",
			day: "numeric",
			year: "numeric",
			timeZone: "America/New_York"
		}).format(new Date(post.publishedAt ?? post.createdAt))

		return {
			title: `Blog: ${post.title}`,
			description: `${post.description ?? ""}\n\nWritten by ${author?.username || authorId} on ${date}`
		}
	}

	const slug = decodeURIComponent(url.pathname.slice(1))
	if (!slug || slug.includes("/")) return {}

	const page = (
		await payload.find({
			collection: "buape-com-pages",
			draft,
			where: draft
				? { slug: { equals: slug } }
				: {
						and: [publishedWhere, { slug: { equals: slug } }]
					}
		})
	).docs[0]

	return page
		? {
				title: page.title,
				description: page.description ?? " "
			}
		: {}
}

async function withMetadata(request: Request, env: Env) {
	const url = new URL(request.url)
	const response = await env.ASSETS.fetch(request)
	const html = await response.text()
	const tags = metadataTags(await pageMetadata(request, url))

	return new Response(
		html
			.replace("<!--buape-metadata-->\n\t\t<title>Buape Studios</title>", tags)
			.replace("<!--buape-metadata-->", tags),
		{
			status: response.status,
			headers: response.headers
		}
	)
}

async function getStaff() {
	const res = await fetch("https://internal.buape.com/staff")
	if (!res.ok) return json({ error: "Staff data not found" }, { status: 404 })
	return json(await res.json())
}

async function getTestimonials() {
	const testimonials = await payload.find({
		collection: "buape-com-testimonials",
		sort: "createdAt",
		where: publishedWhere
	})

	return json(testimonials.docs)
}

async function getPosts(request: Request, url: URL) {
	const draft = isDraftRequest(request, url)
	const posts = await payload.find({
		collection: "buape-com-posts",
		draft,
		where: draft ? undefined : publishedWhere
	})

	return json(posts.docs)
}

async function getPage(request: Request, url: URL, slug: string) {
	const draft = isDraftRequest(request, url)
	const page = (
		await payload.find({
			collection: "buape-com-pages",
			draft,
			where: draft
				? { slug: { equals: slug } }
				: {
						and: [publishedWhere, { slug: { equals: slug } }]
					}
		})
	).docs[0]

	return page ? json(page) : json({ error: "Not found" }, { status: 404 })
}

async function getPost(request: Request, url: URL, slug: string) {
	const draft = isDraftRequest(request, url)
	const post = (
		await payload.find({
			collection: "buape-com-posts",
			draft,
			where: draft
				? { slug: { equals: slug } }
				: {
						and: [publishedWhere, { slug: { equals: slug } }]
					}
		})
	).docs[0]

	return post ? json(post) : json({ error: "Not found" }, { status: 404 })
}

async function preview(env: Env, url: URL) {
	const secret = url.searchParams.get("secret")
	const type = url.searchParams.get("type")
	const slug = url.searchParams.get("slug")

	if (!env.DRAFT_SECRET)
		return new Response("DRAFT_SECRET not set", { status: 500 })
	if (secret !== env.DRAFT_SECRET || !slug || !type) {
		return new Response("Invalid token", { status: 401 })
	}
	if (!["page", "post"].includes(type)) {
		return new Response("Type must be one of [page, post]", { status: 400 })
	}

	const doc = (
		await payload.find({
			collection: type === "page" ? "buape-com-pages" : "buape-com-posts",
			draft: true,
			where: { slug: { equals: slug } }
		})
	).docs[0]

	if (!doc) return new Response("Invalid slug", { status: 400 })

	return new Response(null, {
		status: 302,
		headers: {
			location: type === "post" ? `/blog/${doc.slug}` : `/${doc.slug}`,
			"set-cookie": "buape_draft=1; Path=/; Max-Age=3600; SameSite=Lax; Secure"
		}
	})
}

async function fetchMedia(url: URL) {
	const path = url.pathname.replace("/api/media/", "")
	return fetch(`https://cms.buape.com/api/media/${path}${url.search}`)
}

export default {
	async fetch(request: Request, env: Env) {
		const url = new URL(request.url)

		try {
			if (url.pathname === "/blog")
				return Response.redirect(`${url.origin}/#blog`)
			if (url.pathname === "/privacy-policy") {
				return Response.redirect(`${url.origin}/terms#5-privacy-policy`)
			}
			if (url.pathname.startsWith("/api/media/")) return fetchMedia(url)
			if (url.pathname === "/api/staff") return getStaff()
			if (url.pathname === "/api/testimonials") return getTestimonials()
			if (url.pathname === "/api/posts") return getPosts(request, url)
			if (url.pathname.startsWith("/api/pages/")) {
				return getPage(request, url, decodeURIComponent(url.pathname.slice(11)))
			}
			if (url.pathname.startsWith("/api/posts/")) {
				return getPost(request, url, decodeURIComponent(url.pathname.slice(11)))
			}
			if (url.pathname === "/api/preview") return preview(env, url)
			if (
				request.method === "GET" &&
				request.headers.get("accept")?.includes("text/html")
			) {
				return withMetadata(request, env)
			}
			return env.ASSETS.fetch(request)
		} catch (error) {
			console.error(error)
			return json({ error: "Internal server error" }, { status: 500 })
		}
	}
}
