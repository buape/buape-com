import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { Button } from "~/components/ui/button"

type ContentCardData = {
	name: string
	body: ReactNode
	icon?: string
	link?: string
}
export type ContentSectionData = {
	id: string
	title: string
	description: string
	cards: ContentCardData[]
}

export function ContentSection(data: ContentSectionData) {
	return (
		<div
			className="w-screen bg-[#101013] border border-gray py-20"	
		>
			<div className="max-w-screen-2xl flex flex-col gap-4 text-center items-center justify-center px-24 lg:px-48" id={data.id}>
				<span className="text-3xl font-bold text-buape">{data.title}</span>
				<div className="text-white text-lg font-normal">{data.description}</div>
				<div className="flex flex-wrap flex-row gap-4 justify-center items-center grow mx-6">
					{data.cards.map((x) => (
						<ContentCard {...x} key={x.name} />
					))}
				</div>
			</div>
		</div>
	)
}

export function JoinTheTeam() {
	return (
		<div className="w-screen bg-[#101013] border border-gray py-10 mb-10" id="join-the-team">
			<div className="max-w-screen-2xl flex flex-col gap-4 text-center items-center justify-center">
				<span className="text-3xl font-bold text-buape m-2">Join the Team</span>
				<div className="text-white text-lg font-normal">
					We are always looking to expand our talented team and extensive
					portfolio. Join the team today!
				</div>
				<div className="flex flex-row gap-10 justify-center items-center">
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
					<Link href={"https://go.buape.com/discord"} className="w-56">
						<Button variant={"outline"} className="w-full">
							Join Us on Discord
						</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}

function ContentCard(data: ContentCardData) {
	return (
		<div className="max-w-64 grow p-4 bg-dark rounded-xl border-gray border flex-col flex gap-4 shrink-0">
			<div className="flex flex-row gap-2 items-center grow shrink-0">
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
				{data.link ? (
					<Link className="order-last shrink grow-0" href={data.link}>
						<ArrowRight className="w-6 h-6" />
					</Link>
				) : null}
			</div>
			<div className="text-sm text-wrap">{data.body}</div>
		</div>
	)
}
