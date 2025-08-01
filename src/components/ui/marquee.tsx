import type { ReactNode } from "react"
import { cn } from "~/lib/utils"

interface MarqueeProps {
	className?: string
	reverse?: boolean
	pauseOnHover?: boolean
	children?: ReactNode
	vertical?: boolean
	repeat?: number
	[key: string]: unknown
}

export default function Marquee({
	className,
	reverse,
	pauseOnHover = false,
	children,
	vertical = false,
	repeat = 4,
	...props
}: MarqueeProps) {
	return (
		<div
			{...props}
			className={cn(
				"group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] gap-(--gap)",
				{
					"flex-row": !vertical,
					"flex-col": vertical
				},
				className
			)}
		>
			{Array(repeat)
				.fill(0)
				.map((_, i) => (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: ahhhh
						key={i}
						className={cn("flex shrink-0 justify-around gap-(--gap)", {
							"animate-marquee flex-row": !vertical,
							"animate-marquee-vertical flex-col": vertical,
							"group-hover:[animation-play-state:paused]": pauseOnHover,
							"[animation-direction:reverse]": reverse
						})}
					>
						{children}
					</div>
				))}
		</div>
	)
}
