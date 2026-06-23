import type { ReactNode } from "react"
import { BreakpointIndicator } from "~/components/BreakpointIndicator"
import { Footer } from "~/components/home/Footer"
import Navbar from "~/components/Navbar"
import { Toaster } from "~/components/ui/sonner"
import { projects } from "~/lib/data"
import { cn } from "~/lib/utils"
import { PostHogProvider } from "~/providers"

export function AppLayout({ children }: { children: ReactNode }) {
	return (
		<PostHogProvider>
			<div className={cn("max-w-screen max-h-full bg-dark overflow-x-hidden")}>
				<Navbar />
				<div className="pt-3 max-w-screen min-w-screen w-dvh">{children}</div>
				<Footer projects={projects} />
				<BreakpointIndicator />
				<Toaster />
			</div>
		</PostHogProvider>
	)
}
