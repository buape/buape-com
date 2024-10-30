import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "~/lib/utils"
import Image from "next/image"

export function BlogCard(data: {
	title: string
	author: string
	authorImage?: string
	description: string
	date: Date
	link: string
}) {
	return (
		<Link
			className={cn(
				"grow p-4 bg-dark rounded-xl border-gray border flex-col flex gap-4 shrink-0 basis-0 w-80"
			)}
			href={data.link || "#"}
		>
			<div className="flex flex-row gap-2 items-center order-first">
				<span className="text-white text-lg font-bold grow w-full text-left">
					{data.title}
				</span>
				<div className="order-last shrink-0 grow">
					<ArrowRight className="w-6 h-6" />
				</div>
			</div>
			<div className="text-md text-wrap whitespace-pre-wrap text-center grow">
				{data.description}
			</div>
			<div className="text-sm text-nowrap overflow-clip whitespace-nowrap flex flex-row align-bottom items-center">
				<Image
					src={data.authorImage || "https://cdn.buape.com/buape_circle.png"}
					width={64}
					height={64}
					alt={`${data.author} Image`}
					className="w-6 h-6 rounded-full mr-2"
				/>
				<span className="text-white font-bold grow w-full">{data.author}</span>{" "}
				<span className="text-sm text-gray-400">
					{data.date.toLocaleDateString()}
				</span>
			</div>
		</Link>
	)
}
