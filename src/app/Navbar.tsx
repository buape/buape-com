import Link from "next/link"
import type { ReactNode } from "react"
import { ClickyLogoBranding } from "~/components/ClickyLogoBranding"
import { Button } from "~/components/ui/button"

export default async function Navbar(): Promise<Awaited<ReactNode>> {
	return (
		<nav className="sticky left-0 top-0 z-20 w-screen bg-dark border-[#2E2E38] border-b-2">
			<div className="flex flex-wrap items-center px-5 py-2.5">
				<ClickyLogoBranding />
				<div className="order-last flex flex-row items-center gap-2">
					<Link href={"https://discord.gg/bgASSujRMj"}>
						<Button variant={"nav"}>Join Us on Discord</Button>
					</Link>
				</div>
			</div>
		</nav>
	)
}
