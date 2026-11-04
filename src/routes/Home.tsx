import Markdown from "react-markdown"
import { useLoaderData } from "react-router"
import {
	ContentSection,
	type ContentSectionData,
	JoinTheTeam
} from "~/components/home/Content"
import { Hero } from "~/components/home/Hero"
import { getStaff } from "~/lib/api"
import { projects } from "~/lib/data"
import { docket } from "~/lib/docket"

export async function homeLoader() {
	const [staffList, testimonials, posts] = await Promise.all([
		getStaff().catch(() => undefined),
		docket
			.GET("/api/content/{slug}", { path: { slug: "testimonials" } })
			.then(({ data }) => data?.entries ?? [])
			.catch(() => []),
		docket
			.GET("/api/content/{slug}", { path: { slug: "blog" } })
			.then(({ data }) => data?.entries ?? [])
			.catch(() => [])
	])

	testimonials.sort(
		(a, b) =>
			Number(a.frontmatter.order ?? 0) - Number(b.frontmatter.order ?? 0)
	)
	return { staffList, testimonials, posts }
}

export default function Home() {
	const { staffList, testimonials, posts } = useLoaderData() as Awaited<
		ReturnType<typeof homeLoader>
	>
	const sections: ContentSectionData[] = [
		{
			id: "projects",
			title: "Our Projects",
			description:
				"We develop both Discord and web applications to help our users manage and enjoy their communities.",
			cards: projects
		},
		{
			id: "testimonials",
			title: "We Do It Best",
			description: `1,200+ communities, 1,100,000+ users.
But don’t just take our word for it, hear from some of our users on what they have to say about Buape Studios:`,
			cards: testimonials.map((x) => ({
				name: x.title,
				body: (
					<Markdown components={{ p: ({ children }) => <>{children}</> }}>
						{x.body}
					</Markdown>
				),
				icon:
					typeof x.frontmatter.icon === "string"
						? x.frontmatter.icon
						: undefined,
				link:
					typeof x.frontmatter.link === "string"
						? x.frontmatter.link
						: undefined,
				linkBottomText:
					typeof x.frontmatter.linkBottomText === "string"
						? x.frontmatter.linkBottomText
						: undefined
			}))
		}
	]

	if (staffList && !sections.find((x) => x.id === "staff")) {
		sections.push({
			id: "staff",
			title: "The Team Behind the Screen",
			description:
				"With our team consisting of everything from engineers and marketing professionals to designers and community moderators - we work tirelessly behind the scenes to bring our products to life.",
			cards: staffList.data.staff.map((staff) => ({
				icon: staff.avatarUrl || "https://cdn.buape.com/buape_circle.png",
				name: staff.username || staff.id,
				body: staff.positions.join(", ")
			})),
			marquee: true
		})
	}

	if (posts.length > 0 && !sections.find((x) => x.id === "blog")) {
		sections.push({
			id: "blog",
			title: "Our Blog",
			description: "Check out our blog for the latest news and updates.",
			cards: posts.map((post) => ({
				name: post.title,
				body:
					typeof post.frontmatter.description === "string"
						? post.frontmatter.description
						: "",
				link: `/blog/${post.slug}`,
				author: post.author
					? {
							name: post.author.name,
							avatarUrl: post.author.picture || "",
							date: new Date(post.publishedAt)
						}
					: undefined
			}))
		})
	}

	return (
		<div>
			<div className="h-[calc(100vh-74px)]">
				<Hero showBlog={posts.length > 0} />
			</div>
			{sections.map((x) => (
				<ContentSection {...x} key={x.title} />
			))}
			<JoinTheTeam />
		</div>
	)
}
