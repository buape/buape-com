import {
	TwitterLogoIcon,
	DiscordLogoIcon,
	GitHubLogoIcon
} from "@radix-ui/react-icons"
import type { FooterLinkSection } from "~/app/home/Footer"

export const footerLinks: FooterLinkSection[] = [
	{
		title: "Projects",
		links: [
			{ text: "Kiai", link: "https://kiaibot.com" },
			{ text: "JT-99", link: "https://jt-99.net" }
		]
	},
	{
		title: "Services",
		links: [
			{ text: "Private Hosting", link: "#" },
			{ text: "Bot Development", link: "#" },
			{ text: "Community Management", link: "#" }
		]
	},
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
						<TwitterLogoIcon /> Twitter
					</span>
				),
				link: "https://twitter.com/buapestudios"
			},
			{
				text: (
					<span className="flex flex-row gap-2 items-center">
						<DiscordLogoIcon /> Discord
					</span>
				),
				link: "https://go.buape.com"
			},
			{
				text: (
					<span className="flex flex-row gap-2 items-center">
						<GitHubLogoIcon /> GitHub
					</span>
				),
				link: "https://github.com/buape"
			}
		]
	}
]
