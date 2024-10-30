import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { BsDiscord } from "react-icons/bs"
import { FaGithub } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { footerLinks } from "~/lib/data"

export type FooterLinkSection = {
	title: string
	links: FooterLink[]
}
type FooterLink = {
	text: ReactNode
	link: string
}

export function Footer() {
	return (
		<footer className="flex flex-col bg-dark w-screen container gap-5 overflow-hidden">
			<div className="flex flex-col gap-8 mb-4 md:px-28 px-10">
				<div className="flex md:flex-row flex-col md:gap-10 py-20 justify-center">
					<div className="flex flex-col gap-2 grow shrink-0 md:mb-0 mb-10">
						<Image
							src={"https://cdn.buape.com/buape_circle.png"}
							width={64}
							height={64}
							alt={"Buape Logo"}
						/>
						<span className="text-white text-2xl font-bold">Buape Studios</span>
						<span className="text-md">
							Developed by talents worldwide ⚒️
							<br />
							Loved by many around the world 🌎
						</span>
					</div>
					<div className="grow grid grid-cols-2 lg:grid-cols-3 gap-16 justify-center">
						{footerLinks.map((x) => (
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
							<FaXTwitter />
						</Link>
						<Link href="https://discord.gg/7MUYugRj2T">
							<BsDiscord />
						</Link>
						<Link href="https://github.com/buape">
							<FaGithub />
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}

function LinkSection({ data }: { data: FooterLinkSection }) {
	return (
		<div className="flex flex-col gap-6 grow">
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
