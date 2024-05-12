import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { Button } from "~/components/ui/button"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from "~/components/ui/carousel"
import { cn } from "~/lib/utils"
import type { ClassValue } from "clsx"

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
	carousel?: boolean
}

export function ContentSection(data: ContentSectionData) {
	return (
		<div className="w-screen bg-[#101013] border border-gray py-20 items-center">
			<div
				className="max-w-full flex flex-col gap-4 text-center items-center justify-center px-24 lg:px-48"
				id={data.id}
			>
				<span className="text-3xl font-bold text-buape">{data.title}</span>
				<div className="text-white text-lg font-normal whitespace-pre-wrap">
					{data.description}
				</div>
				{!data.carousel ? (
					<div className="flex flex-wrap flex-row gap-4 justify-center items-center grow mx-6">
						{data.cards.map((x) => (
							<ContentCard {...x} key={x.name} />
						))}
					</div>
				) : (
					<Carousel
						className="flex flex-wrap flex-row gap-4 justify-center items-center grow mx-6 w-full"
						opts={{ align: "start", loop: true }}
					>
						<CarouselContent>
							{data.cards.map((x) => (
								<CarouselItem
									className="basis-1/2 md:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
									key={x.name}
								>
									<ContentCard {...x} className="h-32" />
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				)}
			</div>
		</div>
	)
}

export function JoinTheTeam() {
	return (
		<div
			className="w-screen bg-[#101013] border border-gray py-10 mb-10"
			id="join-the-team"
		>
			<div className="max-w-full flex flex-col gap-4 text-center items-center justify-center">
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

function ContentCard(data: ContentCardData & { className?: ClassValue }) {
	return (
		<div
			className={cn(
				"grow p-4 bg-dark rounded-xl border-gray border flex-col flex gap-4 shrink-0 basis-0",
				data.className || ""
			)}
		>
			<div className="flex flex-row gap-2 items-center shrink grow-0 order-first">
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
				{data.link && !data.linkBottomText ? (
					<Link className="order-last shrink-0 grow" href={data.link}>
						<ArrowRight className="w-6 h-6" />
					</Link>
				) : null}
			</div>
			<div className="text-sm text-wrap whitespace-pre-wrap text-center`">
				{data.body}
			</div>
			{data.linkBottomText && data.link ? (
				<div className="flex flex-row">
					<div className="grow">{data.linkBottomText}</div>
					<Link className="order-last shrink" href={data.link}>
						<ArrowRight className="w-6 h-6" />
					</Link>
				</div>
			) : null}
		</div>
	)
}
