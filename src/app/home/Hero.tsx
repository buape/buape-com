import Image from "next/image"
import Link from "next/link"
import { Button } from "~/components/ui/button"

import { cn } from "~/lib/utils"
import GridPattern from "~/components/ui/grid-pattern"

// export function HeroBackground() {
// 	return (
// 		<div className="-z-50 absolute top-0 bg-[url('/hero-background.svg')] bg-top w-screen h-screen" />
// 	)
// }

export function Hero({ showBlog }: { showBlog: boolean }) {
	return (
		<>
			<GridPattern
				className={cn(
					"[mask-image:linear-gradient(to_bottom,white,transparent,transparent)]"
				)}
			/>
			<div className="relative flex size-full flex-col w-screen max-w-screen-lg h-dvh items-center justify-center container sm:mt-0 mt-32">
				<Image
					src={"https://cdn.buape.com/buape_circle.png"}
					priority={true}
					width={256}
					height={256}
					alt={"Buape Logo"}
					className="m-8"
				/>
				<span className="text-4xl font-bold text-buape m-2">Buape Studios</span>
				<div className="text-center text-white text-xl font-normal">
					Welcome to Buape Studios, a development studio committed to{" "}
					<span className="font-bold">producing quality applications</span>, as
					well as <span className="font-bold">empowering and supporting</span>{" "}
					the <span className="font-bold"> next generation</span> of developers.
				</div>
				<div className="flex md:flex-row flex-col md:gap-6 gap-2 my-12 mb-64 md:mb-12">
					<Link href={"#projects"} className="w-56">
						<Button variant={"default"} className="w-full">
							Our Projects
						</Button>
					</Link>
					{showBlog ? (
						<Link href={"/blog"} className="w-56">
							<Button variant={"default"} className="w-full">
								Our Blog
							</Button>
						</Link>
					) : null}
					<Link href={"https://discord.gg/bgASSujRMj"} className="w-56">
						<Button variant={"outline"} className="w-full">
							Join Us on Discord
						</Button>
					</Link>
				</div>
			</div>
		</>
	)
}
