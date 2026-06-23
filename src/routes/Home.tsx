import { useLoaderData } from "react-router"
import {
	ContentSection,
	type ContentSectionData,
	JoinTheTeam
} from "~/components/home/Content"
import { Hero } from "~/components/home/Hero"
import { getPosts, getStaff, getTestimonials } from "~/lib/api"
import { projects } from "~/lib/data"

export async function homeLoader() {
	const [staffList, testimonials, posts] = await Promise.all([
		getStaff().catch(() => undefined),
		getTestimonials().catch(() => []),
		getPosts().catch(() => [])
	])

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
				name: x.name,
				body: x.body,
				icon:
					typeof x.icon === "object" && x.icon.url
						? `https://cms.buape.com${x.icon.url}`
						: undefined,
				link: x.link,
				linkBottomText: x.linkBottomText
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
			cards: posts.map((post) => {
				const authorId =
					typeof post.author === "string" ? post.author : post.author.id
				const author = staffList?.data.staff.find((x) => x.id === authorId)
				const publishedDate = post.publishedAt
					? new Date(post.publishedAt)
					: undefined

				return {
					name: post.title,
					body: post.description ?? "",
					link: `/blog/${post.slug}`,
					author: author
						? {
								name: author.username || author.id,
								avatarUrl: author.avatarUrl || "",
								date: publishedDate
							}
						: undefined
				}
			})
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
