import type { Metadata } from "next"
import { footerLinks } from "~/lib/data"
import {
	ContentSection,
	type ContentSectionData,
	JoinTheTeam
} from "./home/Content"
import { Footer } from "./home/Footer"
import { Hero, HeroBackground } from "./home/Hero"
import { createMetadata } from "./createMetadata"

const sections: ContentSectionData[] = [
	{
		id: "projects",
		title: "Our Projects",
		description:
			"We develop both Discord and web applications to help our users manage and enjoy their communities.",
		cards: [
			{
				name: "Kiai",
				icon: "https://cdn-raw.buape.com/Kiai.png",
				body: "Kiai is a next generation leveling bot designed for Discord servers who want to level up their community.",
				link: "https://kiai.app"
			},
			{
				name: "JT-99",
				icon: "https://jt-99.net/images/jt99.png",
				body: "JT-99 is a cross-server chat network with a dedicated team of moderators, designed to provide a safe and welcoming environment for all users.",
				link: "https://jt-99.net"
			},
			{
				name: "Carbon",
				icon: "https://cdn-raw.buape.com/CarbonLogo.png",
				body: "Carbon is a powerful and versatile framework designed for building HTTP-based Discord bots. It provides a robust set of tools and features that enable developers to create efficient and scalable bots with ease.",
				link: "https://carbon.buape.com"
			}
			// {
			// 	name: "Bolt",
			// 	icon: "https://cdn-raw.buape.com/bolt.png",
			// 	body: "Kiai is a next generation leveling bot designed for Discord communities who want to lorem ipsum ipsum lorem lorem ipsum",
			// 	link: "https://bolt.buape.com"
			// }
		]
	},
	{
		id: "testimonials",
		title: "We Do It Best",
		description: `700+ communities, 900,000+ users.
But don’t just take our word for it, hear from some of our users on what they have to say about Buape Studios:`,
		cards: [
			{
				// https://discord.com/channels/1080982186045493338/1253730196159336620/1253731934211674163
				name: "Rand (@byterand)",
				belowName: "Community Manager @ BeluGANG",
				icon: "https://cdn.buape.com/web/testimonials/pfps/byterand_262614847353651200.png",
				body: "Kiai is a must-have for servers in need of a lightweight yet in-depth leveling bot. Buape has done an outstanding job creating Kiai's many features and customization options while still maintaining a user-friendly solution to leveling.",
				link: "https://discord.gg/beluga",
				linkBottomText: "Join BeluGANG today"
			},
			// https://discord.com/channels/1080982186045493338/1253730196159336620/1253735905991069767
			{
				name: "Rony (@ronykax)",
				belowName: "Owner @ Rony's Server",
				icon: "https://cdn.buape.com/web/testimonials/pfps/ronykax_791222882499690519.png",
				body: "The Buape team are the best software producers out there. One of their apps, Kiai, is by far the best leveling app I've ever used. They're also quite consistent with updating Kiai and releasing other awesome apps too!",
				link: "https://discord.gg/CU5SUGNvtH",
				linkBottomText: "Join Rony's Server"
			},
			// https://discord.com/channels/1080982186045493338/1253730196159336620/1301326834742333551
			{
				name: "Emma (@emmmatech)",
				belowName: "Active JT-99 Member",
				icon: "https://cdn.buape.com/web/testimonials/pfps/emmmatech_407203299977068544.jpg",
				body: "JT-99 has been a great network to connect to other like minded individuals separated by different servers. I met several great friends that I would not have met otherwise!",
				link: "https://emmatech.dev/",
				linkBottomText: "Check out Emma's site"
			},
			{
				name: "ELI (@einsturd)",
				belowName: "Artist/Owner @ Sturdy Shelter", 
				icon: "https://cdn.buape.com/web/testimonials/pfps/einsturd_712187277568376903.png",
				body: "Kiai is definitely the ultimate leveling bot, aside from having customizable XP settings and formula, Kiai allows server owners to get creative with how they can give their members XP and create custom XP events which just really makes leveling more fun, engaging, and playful.",
				link: "https://discord.gg/MM8DZ9HP3e",
				linkBottomText: "Join Sturdy Shelter"
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
			<Footer />
		</div>
	)
}
