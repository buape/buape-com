'use client'

import { useEffect, type ReactNode } from "react"

import posthog from "posthog-js"
import { PostHogProvider as PHProvider } from "posthog-js/react"

export function PostHogProvider({ children }: { children: ReactNode }) {
	useEffect(() => {
		posthog.init("phc_iDrcbhOvTDdtvJ0N0iIyFywvFM5eXbgTKQGyh8NbpO9", {
			api_host: "https://pogpig.buape.com",
			defaults: "2026-01-30"
		})
	}, [])

	return <PHProvider client={posthog}>{children}</PHProvider>
}
