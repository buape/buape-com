import type { Metadata } from "next"
import { footerLinks, projects, sections } from "~/lib/data"
import {
	ContentSection,
	type ContentSectionData,
	JoinTheTeam
} from "./home/Content"
import { Footer } from "./home/Footer"
import { Hero, HeroBackground } from "./home/Hero"
import { createMetadata } from "./createMetadata"
import { blog } from "~/lib/source"

async function getData() {
	const res = await fetch("https://internal.buape.com/staff", {
		next: { revalidate: 3600 }
	})
	if (res.ok) {
		return (await res.json()) as {
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
	}
}

export const metadata = createMetadata({})

export default async function Page() {
	const staffList = await getData()
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

	const posts = [...blog.getPages()].sort(
		(a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
	)
	if (posts.length > 0 && !sections.find((x) => x.id === "blog"))
		sections.push({
			id: "blog",
			title: "Our Blog",
			description: `Check out our blog for the latest news and updates.`,
			cards: posts.map((post) => {
				const author = staffList?.data.staff.find(
					(x: { id: string }) => x.id === post.data.authorId
				)
				return {
					name: post.data.title,
					body: post.data.description,
					link: `/blog/${post.slugs.join("/")}`,
					author: author
						? {
								name: author.username!,
								avatarUrl: author.avatarUrl!,
								date: new Date(
									post.data.date.valueOf() + post.data.date.getTimezoneOffset()
								)
							}
						: undefined
				}
			})
		})

	return (
		<div>
			<HeroBackground />
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
