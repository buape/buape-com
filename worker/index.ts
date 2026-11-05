import { docket } from "~/lib/docket"

type Env = {
	ASSETS: {
		fetch(request: Request): Promise<Response>
	}
}

const json = (data: unknown, init?: ResponseInit) =>
	new Response(JSON.stringify(data), {
		...init,
		headers: {
			"content-type": "application/json",
			...init?.headers
		}
	})

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

async function pageMetadata(url: URL): Promise<PageMetadata> {
	if (url.pathname === "/" || url.pathname === "/branding") {
		return {
			title: url.pathname === "/branding" ? "Branding Guide" : "Buape Studios",
			description:
				url.pathname === "/branding"
					? "Last updated: October 25, 2025"
					: undefined
		}
	}

	const blogMatch = url.pathname.match(/^\/blog\/([^/]+)$/)
	if (blogMatch?.[1]) {
		const { data, response } = await docket.GET(
			"/api/content/{slug}/{entrySlug}",
			{
				path: {
					slug: "blog",
					entrySlug: decodeURIComponent(blogMatch[1])
				}
			}
		)
		if (!response.ok || !data) return {}
		const date = new Intl.DateTimeFormat("en-US", {
			month: "long",
			day: "numeric",
			year: "numeric",
			timeZone: "America/New_York"
		}).format(new Date(data.publishedAt))
		const description =
			typeof data.frontmatter.description === "string"
				? data.frontmatter.description
				: ""
		return {
			title: `Blog: ${data.title}`,
			description: `${description}\n\nWritten by ${data.author?.name || "Buape"} on ${date}`
		}
	}

	const slug = decodeURIComponent(url.pathname.slice(1))
	if (!slug || slug.includes("/")) return {}
	const { data, response } = await docket.GET(
		"/api/content/{slug}/{entrySlug}",
		{
			path: { slug: "pages", entrySlug: slug }
		}
	)
	return response.ok && data
		? {
				title: data.title,
				description:
					typeof data.frontmatter.description === "string"
						? data.frontmatter.description
						: " "
			}
		: {}
}

async function withMetadata(request: Request, env: Env) {
	const url = new URL(request.url)
	const response = await env.ASSETS.fetch(request)
	const html = await response.text()
	const tags = metadataTags(await pageMetadata(url))

	return new Response(
		html
			.replace("<title>Buape Studios</title>", "")
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

export default {
	async fetch(request: Request, env: Env) {
		const url = new URL(request.url)

		try {
			if (url.pathname === "/blog")
				return Response.redirect(`${url.origin}/#blog`)
			if (url.pathname === "/privacy-policy") {
				return Response.redirect(`${url.origin}/terms#5-privacy-policy`)
			}
			if (url.pathname === "/api/staff") return getStaff()
			if (url.pathname === "/api" || url.pathname.startsWith("/api/"))
				return json({ error: "Not found" }, { status: 404 })
			if (/^\/old-(?:blog|pages)(?:\/|$)/.test(url.pathname))
				return new Response("Not found", { status: 404 })
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
