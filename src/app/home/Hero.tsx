import Image from "next/image"
import Link from "next/link"
import { Button } from "~/components/ui/button"

export function HeroBackground() {
	return (
		<div className="-z-50 absolute top-0 bg-[url('/hero-background.svg')] bg-top w-screen h-screen" />
	)
}

export function Hero() {
	return (
		<div className="flex flex-col w-screen max-w-screen-lg h-dvh items-center justify-center container">
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
				well as <span className="font-bold">empowering and supporting</span> the{" "}
				<span className="font-bold"> next generation</span> of developers.
			</div>
			<div className="flex flex-row gap-10 my-12">
				<Link href={"#projects"} className="w-56">
					<Button variant={"default"} className="w-full">
						Our Projects
					</Button>
				</Link>
				<Link href={"https://go.buape.com/discord"} className="w-56">
					<Button variant={"outline"} className="w-full">
						Join Us on Discord
					</Button>
				</Link>
			</div>
		</div>
	)
}
