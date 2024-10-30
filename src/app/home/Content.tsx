import type { ClassValue } from "clsx"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { Button } from "~/components/ui/button"
import Marquee from "~/components/ui/marquee"
import { cn } from "~/lib/utils"

type ContentCardData = {
	name: string
	body: ReactNode
	icon?: string
	link?: string
	linkBottomText?: string
}
export type ContentSectionData = {
	id: string
	title: string
	description: string
	cards: ContentCardData[]
	marquee?: boolean
}

export function ContentSection(data: ContentSectionData) {
	const firstRow = data.cards.slice(0, data.cards.length / 2)
	const secondRow = data.cards.slice(data.cards.length / 2)
	return (
		<section className="w-screen bg-[#101013] border border-gray py-20 items-center">
			<div
				className="max-w-full flex flex-col gap-4 text-center items-center justify-center px-24 lg:px-48"
				id={data.id}
			>
				<span className="text-3xl font-bold text-buape">{data.title}</span>
				<div className="text-white text-lg font-normal whitespace-pre-wrap">
					{data.description}
				</div>
				{!data.marquee ? (
					<div className="flex flex-wrap md:flex-row flex-col gap-4 justify-center grow mx-6 items-stretch">
						{data.cards.map((x) => (
							<ContentCard {...x} key={x.name} />
						))}
					</div>
				) : (
					<div className="w-screen overflow-hidden">
						<Marquee
							pauseOnHover
							className="[--duration:40s] flex items-stretch"
						>
							{firstRow.map((x) => (
								<ContentCard {...x} key={x.name} />
							))}
						</Marquee>
						<Marquee
							reverse
							pauseOnHover
							className="[--duration:40s] flex items-stretch"
						>
							{secondRow.map((x) => (
								<ContentCard {...x} key={x.name} />
							))}
						</Marquee>
					</div>
				)}
			</div>
		</section>
	)
}

export function JoinTheTeam() {
	return (
		<div
			className="w-screen bg-[#101013] border border-gray p-10 mb-10"
			id="join-the-team"
		>
			<div className="max-w-full flex flex-col gap-4 text-center items-center justify-center">
				<span className="text-3xl font-bold text-buape m-2">Join the Team</span>
				<div className="text-white text-lg font-normal">
					We are always looking to expand our talented team and extensive
					portfolio. Join the team today!
				</div>
				<div className="flex md:flex-row flex-col md:gap-10 gap-2 justify-center items-center">
					<Link href={"https://go.buape.com/apply"} className="w-56">
						<Button variant={"default"} className="w-full">
							Apply to join us
						</Button>
					</Link>
					<Link href={"https://go.buape.com/project"} className="w-56">
						<Button variant={"default"} className="w-full">
							Submit a project
						</Button>
					</Link>
					<Link href={"https://discord.gg/7MUYugRj2T"} className="w-56">
						<Button variant={"outline"} className="w-full">
							Join Us on Discord
						</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}

function ContentCard(data: ContentCardData & { className?: ClassValue }) {
	return (
		<Link
			className={cn(
				"grow p-4 bg-dark rounded-xl border-gray border flex-col flex gap-4 shrink-0 basis-0 w-80",
				data.className || ""
			)}
			href={data.link || "#"}
		>
			<div className="flex flex-row gap-2 items-center order-first">
				{data.icon ? (
					<Image
						src={data.icon}
						width={64}
						height={64}
						alt={`${data.name} Icon`}
						className="w-6 h-6 rounded-full"
					/>
				) : null}
				<span className="text-white text-lg font-bold grow w-full text-left">
					{data.name}
				</span>
				{!data.linkBottomText ? (
					<div className="order-last shrink-0 grow">
						<ArrowRight className="w-6 h-6" />
					</div>
				) : null}
			</div>
			<div className="text-md text-wrap whitespace-pre-wrap text-center grow">
				{data.body}
			</div>
			{data.linkBottomText ? (
				<div className="flex flex-row justify-center align-middle">
					<div className="grow text-sm">{data.linkBottomText}</div>
					<div className="order-last shrink">
						<ArrowRight className="w-6 h-6" />
					</div>
				</div>
			) : null}
		</Link>
	)
}
