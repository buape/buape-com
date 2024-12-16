import type { Metadata } from "next"
import { Rubik } from "next/font/google"

import "~/styles/globals.css"

import type { ReactNode } from "react"

import { Toaster } from "~/components/ui/toaster"
import { cn } from "~/lib/utils"
import Navbar from "./Navbar"

import Script from "next/script"
import { BreakpointIndicator } from "~/components/BreakpointIndicator"
import { projects } from "~/lib/data"
import { Footer } from "./home/Footer"

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
		<html
			lang="en"
			style={{
				scrollPaddingTop: "100px",
				scrollBehavior: "smooth"
			}}
		>
			<body
				className={cn(
					"max-w-screen max-h-full bg-dark overflow-x-hidden",
					font.className
				)}
			>
				<Navbar />
				<div className="pt-3 max-w-screen min-w-screen w-dvh">{children}</div>
				<Footer projects={projects} />
				<Toaster />
				<BreakpointIndicator />
				<Script
					defer
					src="https://stats.b1.buape.com/script.js"
					data-website-id="220d5910-f06d-465b-991b-280d8867a803"
					data-domains="www.buape.com"
				/>
			</body>
		</html>
	)
}
