export const dynamic = "force-dynamic"

import { sections as getSections } from "~/lib/data"
import { payload } from "~/lib/payload"
import { getStaff } from "~/lib/staff"
import { createMetadata } from "./createMetadata"
import { ContentSection, JoinTheTeam } from "./home/Content"
import { Hero } from "./home/Hero"

export const metadata = createMetadata({})

export default async function Page() {
	const staffList = await getStaff()
	const sections = await getSections()
	if (staffList && !sections.find((x) => x.id === "staff"))
		sections.push({
			id: "staff",
			title: "The Team Behind the Screen",
			description:
				"With our team consisting of everything from engineers and marketing professionals to designers and community moderators - we work tirelessly behind the scenes to bring our products to life.",
			cards: staffList.data.staff.map((staff) => {
				return {
					icon: staff.avatarUrl || `https://cdn.buape.com/buape_circle.png`,
					name: staff.username || staff.id,
					body: staff.positions.join(", ")
				}
			}),
			marquee: true
		})

	const posts = (
		await payload.find({
			collection: "buape-com-posts"
		})
	).docs.sort(
		(a, b) =>
			new Date(b.publishedAt ?? b.createdAt).getTime() -
			new Date(a.publishedAt ?? a.createdAt).getTime()
	)
	if (posts.length > 0 && !sections.find((x) => x.id === "blog"))
		sections.push({
			id: "blog",
			title: "Our Blog",
			description: `Check out our blog for the latest news and updates.`,
			cards: posts.map((post) => {
				const author = staffList?.data.staff.find((x: { id: string }) => {
					const authorId =
						typeof post.author === "string" ? post.author : post.author.id
					return x.id === authorId
				})
				const publishedDate = new Date(
					post.publishedAt ?? post.createdAt ?? new Date()
				)
				return {
					name: post.title,
					body: post.description,
					link: `/blog/${post.slug}`,
					author: author
						? {
								name: author.username!,
								avatarUrl: author.avatarUrl!,
								date: publishedDate
							}
						: undefined
				}
			})
		})

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
