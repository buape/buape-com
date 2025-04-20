import { BsDiscord } from "react-icons/bs"
import { FaGithub } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import type { ContentSectionData } from "~/app/home/Content"
import type { FooterLinkSection } from "~/app/home/Footer"

export const projects = [
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

export const sections: ContentSectionData[] = [
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
			},
			{
				name: "Two (@real2two)",
				belowName: "Developer @ Custom Developments",
				icon: "https://cdn.buape.com/web/testimonials/pfps/real2two_276497792526974996.png",
				body: "Kiai is one of the most feature-full leveling bots I've seen. Many bots are either limited, vote-lock feature and/or put really cool features behind a paywall, but on the other hand, Kiai gives you so many options, such as setting your own formula for leveling and many other commands to easily modify how much XP people have. Additionally, it has a REST API, which I'm looking forward to integrate into a project I'm working on. The support team is relatively cool as well and replies back in a reasonable amount of time.",
				link: "https://discord.gg/mxVTezz",
				linkBottomText: "Join Custom Developments"
			}
		]
	}
]

export const footerLinks: FooterLinkSection[] = [
	// {
	// 	title: "Services",
	// 	links: [
	// 		{ text: "Private Hosting", link: "#" },
	// 		{ text: "Bot Development", link: "#" },
	// 		{ text: "Community Management", link: "#" }
	// 	]
	// },
	{
		title: "Legal",
		links: [
			{
				text: "Terms of Service",
				link: "https://buape.com/terms"
			},
			{
				text: "Privacy Policy",
				link: "https://buape.com/privacy-policy"
			},
			{
				text: "Security Policy",
				link: "https://buape.com/security"
			}
		]
	},
	{
		title: "Socials",
		links: [
			{
				text: (
					<span className="flex flex-row gap-2 items-center">
						<FaXTwitter /> Twitter / X
					</span>
				),
				link: "https://x.com/buapestudios"
			},
			{
				text: (
					<span className="flex flex-row gap-2 items-center">
						<BsDiscord /> Discord
					</span>
				),
				link: "https://discord.gg/7MUYugRj2T"
			},
			{
				text: (
					<span className="flex flex-row gap-2 items-center">
						<FaGithub /> GitHub
					</span>
				),
				link: "https://github.com/buape"
			}
		]
	}
]
