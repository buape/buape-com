import Image from "next/image"
import Link from "next/link"
import { Button } from "~/components/ui/button"

export default async function Navbar() {
	return (
		<nav className="sticky left-0 top-0 z-20 w-full bg-dark border-[#2E2E38] border-b-2">
			<div className="flex flex-wrap items-center px-5 py-2.5">
				<Link
					className="order-1 flex flex-row grow items-center gap-2"
					href={"/"}
				>
					<Image
						src={"https://cdn.buape.com/buape_circle.png"}
						width={16}
						height={16}
						alt={"Buape Logo"}
						className="h-4 w-4"
					/>
					<span className="text-white text-lg font-bold">Buape Studios</span>
				</Link>
				<div className="order-last flex flex-row items-center gap-2">
					{/* <Link href={"#"}>
						<Button variant={"nav"}>
							<div className="bg-[#68F07E] rounded-full w-4 h-4" />
							Service Status
						</Button>
					</Link> */}
					<Link href={"https://discord.gg/bgASSujRMj"}>
						<Button variant={"nav"}>Join Us on Discord</Button>
					</Link>
				</div>
			</div>
		</nav>
	)
}
