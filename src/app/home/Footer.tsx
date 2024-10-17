import {
	DiscordLogoIcon,
	GitHubLogoIcon,
	TwitterLogoIcon
} from "@radix-ui/react-icons"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"

export type FooterLinkSection = {
	title: string
	links: FooterLink[]
}
type FooterLink = {
	text: ReactNode
	link: string
}

export function Footer({ data }: { data: FooterLinkSection[] }) {
	return (
		<div className="flex flex-col bg-dark w-screen container gap-5 px-28">
			<div className="flex flex-col gap-8 mb-4">
				<div className="flex flex-row py-20">
					<div className="flex flex-col gap-2 grow shrink-0">
						<Image
							src={"https://cdn.buape.com/buape_circle.png"}
							width={64}
							height={64}
							alt={"Buape Logo"}
						/>
						<span className="text-white text-2xl font-bold">Buape Studios</span>
						<span className="text-md">
							Made in the USA 🇺🇲 <br />
							Loved by thousands worldwide 🌎
						</span>
					</div>
					<div className="flex flex-row gap-16">
						{data.map((x) => (
							<LinkSection data={x} key={x.title} />
						))}
					</div>
				</div>
				<div className="align-bottom flex flex-row">
					<div className="text-neutral-500 grow">
						© 2024 Buape Studios. All rights reserved.
					</div>
					<div className="flex flex-row gap-2">
						<Link href="https://twitter.com/buapestudios">
							<TwitterLogoIcon />
						</Link>
						<Link href="https://discord.gg/7MUYugRj2T">
							<DiscordLogoIcon />
						</Link>
						<Link href="https://github.com/buape">
							<GitHubLogoIcon />
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

function LinkSection({ data }: { data: FooterLinkSection }) {
	return (
		<div className="flex flex-col gap-6">
			<div className="text-neutral-400">{data.title}</div>
			<div className="flex flex-col gap-4">
				{data.links.map((x) => (
					<Link href={x.link} className="text-stone-300" key={x.link}>
						{x.text}
					</Link>
				))}
			</div>
		</div>
	)
}
