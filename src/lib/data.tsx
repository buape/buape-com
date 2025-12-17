import { BsDiscord } from "react-icons/bs"
import { FaGithub } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import type { ContentSectionData } from "~/app/home/Content"
import type { FooterLinkSection } from "~/app/home/Footer"
import { payload } from "./payload"

export const projects = [
	{
		name: "Kiai",
		icon: "https://cdn.buape.com/kiai/logo.png",
		body: "Kiai is a next generation leveling bot designed for Discord servers who want to level up their community.",
		link: "https://kiai.app"
	},
	{
		name: "JT-99",
		icon: "https://cdn.buape.com/jt-99/logo.png",
		body: "JT-99 is a cross-server chat network with a dedicated team of moderators, designed to provide a safe and welcoming environment for all users.",
		link: "https://jt-99.buape.com"
	},
	{
		name: "Carbon",
		icon: "https://cdn.buape.com/carbon/logo.png",
		body: "Carbon is a powerful and versatile framework designed for building HTTP-based Discord bots. It provides a robust set of tools and features that enable developers to create efficient and scalable bots with ease.",
		link: "https://carbon.buape.com"
	},
	{
		name: "Message Kit",
		icon: "https://cdn.buape.com/message-kit/logo.png",
		body: "Message Kit is a powerful tool that enables you to build fully custom Discord messages and components (using the new Components V2 system) directly to your Discord server. You can even be able to hook up 'Actions' to components to carry out certain tasks.",
		link: "https://messagekit.app"
	}
	// {
	// 	name: "Bolt",
	// 	icon: "https://cdn-raw.buape.com/bolt.png",
	// 	body: "Kiai is a next generation leveling bot designed for Discord communities who want to lorem ipsum ipsum lorem lorem ipsum",
	// 	link: "https://bolt.buape.com"
	// }
]

export const sections: () => Promise<ContentSectionData[]> = async () => {
	const testimonials =
		(
			await payload.find({
				collection: "buape-com-testimonials",
				sort: "createdAt",
				where: {
					_status: {
						equals: "published"
					}
				}
			})
		)?.docs || []
	return [
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
			cards: testimonials.map((x) => {
				return {
					name: x.name,
					body: x.body,
					icon:
						typeof x.icon === "number"
							? ""
							: `https://cms.buape.com${x.icon.url}` || undefined,
					link: x.link,
					linkBottomText: x.linkBottomText
				}
			})
		}
	]
}

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
