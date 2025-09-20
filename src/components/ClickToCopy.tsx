"use client"

import { toast } from "sonner"

export function ClickToCopy({
	toCopy,
	children
}: {
	toCopy: string
	children: React.ReactNode
}) {
	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(toCopy)
			toast("Copied to clipboard")
		} catch (err) {
			console.error("Failed to copy: ", err)
		}
	}

	return (
		// biome-ignore lint/a11y/useButtonType: L
		<button onClick={handleCopy} className="cursor-pointer">
			{children}
		</button>
	)
}
