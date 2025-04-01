import Image from "next/image"
import Link from "next/link"
import { Button } from "~/components/ui/button"

// import GridPattern from "~/components/ui/grid-pattern"
// import { cn } from "~/lib/utils"

// export function HeroBackground() {
// 	return (
// 		<div className="-z-50 absolute top-0 bg-[url('/hero-background.svg')] bg-top w-screen h-screen" />
// 	)
// }

export function Hero({ showBlog }: { showBlog: boolean }) {
	return (
		<>
			{/* <GridPattern
				className={cn(
					"[mask-image:linear-gradient(to_bottom,white,transparent,transparent)]"
				)}
			/> */}
			<div className="absolute inset-0 -z-50 w-screen h-screen">
				{/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
				<video
					autoPlay
					loop
					playsInline
					controls={false}
					preload="metadata"
					poster="https://cdn.buape.com/oiia-full.gif"
					className="object-cover w-full h-full"
				>
					<source src="https://cdn.buape.com/oiia-song.mp4" type="video/mp4" />
				</video>
			</div>
			<div className="relative flex size-full flex-col w-screen max-w-screen-lg h-dvh items-center justify-end container sm:mt-0 mt-32 lg:pb-28 pb-0">
				<Image
					src={"https://cdn.buape.com/oiia.gif"}
					priority={true}
					width={256}
					height={256}
					alt={"Buape Logo"}
					className="m-8 opacity-0"
				/>
				<span className="text-4xl font-bold text-white m-2">Buape Studios</span>
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
