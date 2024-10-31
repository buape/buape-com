import type { Metadata } from "next"
import { Rubik } from "next/font/google"

import "~/styles/globals.css"

import type { ReactNode } from "react"

import { Toaster } from "~/components/ui/toaster"
import { cn } from "~/lib/utils"
import Navbar from "./Navbar"

import { BreakpointIndicator } from "~/components/BreakpointIndicator"

const font = Rubik({
	subsets: ["latin"]
})

export const metadata: Metadata = {
	title: "Buape Studios"
}

export default async function Layout({
	children
}: {
	children: ReactNode
}) {
	return (
		<html lang="en">
			<body
				className={cn(
					"max-w-screen max-h-full bg-dark overflow-x-hidden",
					font.className
				)}
			>
				<Navbar />
				<div className="pt-3 max-w-screen min-w-screen w-dvh">{children}</div>
				<Toaster />
				<BreakpointIndicator />
			</body>
		</html>
	)
}
