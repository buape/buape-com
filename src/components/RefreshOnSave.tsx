"use client"

import { isDocumentEvent, ready } from "@payloadcms/live-preview"
import { useRouter } from "next/navigation"
import type React from "react"
import { useCallback, useEffect, useRef } from "react"

export const RefreshRouteOnSave: React.FC = () => {
	const router = useRouter()

	const hasSentReadyMessage = useRef<boolean>(false)

	const onMessage = useCallback(
		(event: MessageEvent) => {
			if (isDocumentEvent(event, "https://cms.buape.com/api")) {
				router.refresh()
			}
		},
		[router]
	)

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.addEventListener("message", onMessage)
		}

		if (!hasSentReadyMessage.current) {
			hasSentReadyMessage.current = true

			ready({
				serverURL: "https://cms.buape.com/api"
			})
		}

		return () => {
			if (typeof window !== "undefined") {
				window.removeEventListener("message", onMessage)
			}
		}
	}, [onMessage])

	return null
}
