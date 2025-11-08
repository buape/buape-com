"use client"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function ClickyLogoBranding() {
	const router = useRouter()
	const handleContextMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()
		router.push("/branding")
	}
	return (
		<Link
			className="order-1 flex flex-row grow items-center gap-2"
			href={"/"}
			onContextMenu={handleContextMenu}
		>
			<Image
				src={"https://cdn.buape.com/buape_circle.png"}
				width={24}
				height={24}
				alt={"Buape Logo"}
				className="h-6 w-6"
			/>
			<span className="text-white text-lg font-bold">Buape Studios</span>
		</Link>
	)
}
