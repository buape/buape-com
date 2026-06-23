import { useNavigate } from "react-router"

export function ClickyLogoBranding() {
	const navigate = useNavigate()

	return (
		<a
			className="order-1 flex flex-row grow items-center gap-2"
			href="/"
			onContextMenu={(e) => {
				e.preventDefault()
				navigate("/branding")
			}}
		>
			<img
				src="https://cdn.buape.com/buape_circle.png"
				width={24}
				height={24}
				alt="Buape Logo"
				className="h-6 w-6"
			/>
			<span className="text-white text-lg font-bold">Buape Studios</span>
		</a>
	)
}
