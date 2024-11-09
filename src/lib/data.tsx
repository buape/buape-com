import { BsDiscord } from "react-icons/bs"
import { FaGithub } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import type { FooterLinkSection } from "~/app/home/Footer"

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
				link: "https://github.com/buape/kiai-legal/blob/main/TOS.md"
			},
			{
				text: "Privacy Policy",
				link: "https://github.com/buape/kiai-legal/blob/main/TOS.md#:~:text=rights%20of%20others.-,Privacy%20Policy,-5.1.%20Data%20Collection"
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
