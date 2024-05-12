import {
	ContentSection,
	JoinTheTeam,
	type ContentSectionData
} from "./home/Content"
import { Footer } from "./home/Footer"
import { HeroBackground, Hero } from "./home/Hero"
import { footerLinks } from "~/lib/data"

const sections: ContentSectionData[] = [
	{
		id: "mission",
		title: "Our Mission",
		description:
			"We develop both Discord and web applications to help our users manage and enjoy their communities.",
		cards: [
			{
				name: "Kiai",
				icon: "https://cdn-raw.buape.com/kiai.png",
				body: "Kiai is a next generation leveling bot designed for Discord communities who want to lorem ipsum ipsum lorem lorem ipsum",
				link: "https://kiai.app"
			},
			{
				name: "JT-99",
				icon: "https://jt-99.net/images/jt99.png",
				body: "Kiai is a next generation leveling bot designed for Discord communities who want to lorem ipsum ipsum lorem lorem ipsum",
				link: "https://jt-99.net"
			},
			{
				name: "Bolt",
				icon: "https://cdn-raw.buape.com/bolt.png",
				body: "Kiai is a next generation leveling bot designed for Discord communities who want to lorem ipsum ipsum lorem lorem ipsum",
				link: "https://bolt.buape.com"
			},
			{
				name: "Sync",
				icon: "https://cdn-raw.buape.com/sync.png",
				body: "Kiai is a next generation leveling bot designed for Discord communities who want to lorem ipsum ipsum lorem lorem ipsum"
			},
			{
				name: "StatTrack",
				icon: "https://cdn-raw.buape.com/stattrack.png",
				body: "Kiai is a next generation leveling bot designed for Discord communities who want to lorem ipsum ipsum lorem lorem ipsum",
				link: "https://stattrack.buape.com"
			}
		]
	},
	{
		id: "testimonials",
		title: "We Do It Best",
		description: `x+ communities, y+ users.
But don’t just take our word for it, hear from some of our users on what they have to say about Buape Studios:`,
		cards: [
			{
				name: "Kiai",
				icon: "https://cdn-raw.buape.com/kiai.png",
				body: "Kiai is a next generation leveling bot designed for Discord communities who want to lorem ipsum ipsum lorem lorem ipsum",
				link: "https://kiai.app",
				linkBottomText: "Join COMMUNITY today"
			},
			{
				name: "Kiai",
				icon: "https://cdn-raw.buape.com/kiai.png",
				body: "Kiai is a next generation leveling bot designed for Discord communities who want to lorem ipsum ipsum lorem lorem ipsum",
				link: "https://kiai.app",
				linkBottomText: "Join COMMUNITY today"
			},
			{
				name: "Kiai",
				icon: "https://cdn-raw.buape.com/kiai.png",
				body: "Kiai is a next generation leveling bot designed for Discord communities who want to lorem ipsum ipsum lorem lorem ipsum",
				link: "https://kiai.app",
				linkBottomText: "Join COMMUNITY today"
			}
		]
	}
]

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
			carousel: true
		})

	return (
		<div>
			<HeroBackground />
			<div className="h-[calc(100vh-74px)]">
				<Hero />
			</div>
			{sections.map((x) => (
				<ContentSection {...x} key={x.title} />
			))}
			<JoinTheTeam />
			<Footer data={footerLinks} />
		</div>
	)
}
