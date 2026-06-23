import posthog from "posthog-js"
import { PostHogProvider as PHProvider } from "posthog-js/react"
import { type ReactNode, useEffect } from "react"

export function PostHogProvider({ children }: { children: ReactNode }) {
	useEffect(() => {
		posthog.init("phc_iDrcbhOvTDdtvJ0N0iIyFywvFM5eXbgTKQGyh8NbpO9", {
			api_host: "https://pogpig.buape.com",
			defaults: "2026-01-30"
		})
	}, [])

	return <PHProvider client={posthog}>{children}</PHProvider>
}
