import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"

export type StaffResponse = {
	data: {
		staff: {
			id: string
			positions: string[]
			username?: string
			avatarUrl?: string
			hierarchyPosition: number
		}[]
	}
}

export type CmsPage = {
	title: string
	description?: string
	slug: string
	content: SerializedEditorState
}

export type CmsPost = CmsPage & {
	author: string | { id: string }
	createdAt: string
	publishedAt?: string
}

export type Testimonial = {
	name: string
	body: string
	icon?: number | { url?: string }
	link?: string
	linkBottomText?: string
}

export async function apiJson<T>(path: string) {
	const res = await fetch(path)
	if (!res.ok) throw new Response("Not found", { status: res.status })
	return (await res.json()) as T
}

export const getStaff = () => apiJson<StaffResponse>("/api/staff")

export const getTestimonials = () => apiJson<Testimonial[]>("/api/testimonials")

export function isDraftMode() {
	return document.cookie.includes("buape_draft=1")
}

export const getPosts = () =>
	apiJson<CmsPost[]>(`/api/posts?draft=${isDraftMode() ? "1" : "0"}`)

export const getPage = (slug: string) =>
	apiJson<CmsPage>(
		`/api/pages/${encodeURIComponent(slug)}?draft=${isDraftMode() ? "1" : "0"}`
	)

export const getPost = (slug: string) =>
	apiJson<CmsPost>(
		`/api/posts/${encodeURIComponent(slug)}?draft=${isDraftMode() ? "1" : "0"}`
	)
