"use client"

export default function GlobalError({
	error,
	// biome-ignore lint/correctness/noUnusedVariables: <explanation>
	reset
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	return (
		<div className="flex flex-col h-screen justify-center items-center">
			<p className="text-brand-blue text-2xl font-bold">Error</p>
			<p>Something has gone terribly wrong</p>
			<p>Here is an explanation of the issue:</p>
			<iframe
				src="https://www.youtube-nocookie.com/embed/t3otBjVZzT0?si=0icpfwQ4mL4Pnoxl&amp;controls=0&amp;autoplay=1"
				title="Something went terribly wrong"
				allow="autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerPolicy="strict-origin-when-cross-origin"
				allowFullScreen
				height="400"
				width="1000"
			/>
			<p>{error.message}</p>
		</div>
	)
}
