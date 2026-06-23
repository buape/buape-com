import { BsDiscord } from "react-icons/bs"
import { FaGithub } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import type { FooterLinkSection } from "~/components/home/Footer"

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
]

export const footerLinks: FooterLinkSection[] = [
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
