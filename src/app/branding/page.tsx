import "./styles.css"
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription
} from "~/components/ui/card"
import type { Metadata } from "next"
import Image from "next/image"
import type { ReactNode } from "react"
import { createMetadata } from "~/app/createMetadata"
import { ClickToCopy } from "~/components/ClickToCopy"
import GridPattern from "~/components/ui/grid-pattern"
import { cn } from "~/lib/utils"

type LogoData = { title: string; description?: string } & (
	| {
			src: string
			alt: string
			width?: number
			height?: number
	  }
	| {
			color: string
	  }
)

function LogoCard(data: LogoData) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{data.title}</CardTitle>
				<CardDescription>{data.description ?? ""}</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col items-center justify-center gap-2">
				{"src" in data && (
					<ClickToCopy toCopy={data.src}>
						<Image
							src={data.src}
							alt={data.alt}
							width={data.width ?? 120}
							height={data.height ?? 120}
							className="object-contain max-w-full max-h-24"
						/>
					</ClickToCopy>
				)}
				{"color" in data && (
					<ClickToCopy toCopy={data.color}>
						<div
							className={`w-16 h-16 rounded-full`}
							style={{ backgroundColor: data.color }}
						/>
					</ClickToCopy>
				)}
			</CardContent>
		</Card>
	)
}

function LogoSection({
	title,
	description,
	logos
}: {
	title: string
	description: ReactNode
	logos: Array<LogoData>
}) {
	return (
		<>
			<h3>{title}</h3>
			<div className="description">{description}</div>
			<div className="mb-8 grid sm:grid-cols-2 gap-3 md:grid-cols-3">
				{logos.map((logo, i) => {
					return <LogoCard key={`${logo.title}-${i}`} {...logo} />
				})}
			</div>
		</>
	)
}

export const metadata: Metadata = createMetadata({
	title: "Branding Guide",
	description: "Last updated: September 26, 2025"
})

export default function BrandingPage() {
	return (
		<>
			<GridPattern
				className={cn(
					"mask-[linear-gradient(to_bottom,white,transparent,transparent)]"
				)}
			/>
			<article className="relative flex size-full flex-col w-screen max-w-(--breakpoint-lg) min-h-dvh items-center justify-center container">
				<header className="flex flex-col gap-10 items-center m-5 pb-5 mt-32">
					<h1 className="text-4xl font-bold text-white">Branding Guide</h1>
					<span className="text-xl font-normal text-white text-center">
						Last updated: October 17, 2025
					</span>
				</header>
				<main className="w-screen bg-[#101013] py-20 flex flex-col gap-4 text-left px-24 lg:px-48 prose prose-lg max-w-none text-white mt-10">
					<p>
						This guide outlines the proper usage of Buape Studios logos and
						branding materials. Please read carefully before using any of our
						brand assets.
					</p>
					<p>
						This branding guide is subject to change. Please check back
						regularly for updates to ensure compliance with our current
						guidelines.
					</p>
					<h2>Available Logos</h2>
					<p>We provide the following logos for public use:</p>
					<LogoSection
						title="Buape Studios"
						description={
							<>
								The Buape Studios logo (B-Wave){" "}
								<strong>must be used solely in its blue (main) form</strong>.
								Any other colored or transparent variants may only be used with
								explicit permission.
							</>
						}
						logos={[
							{
								title: "Main Logo",
								src: "https://cdn.buape.com/buape.png",
								alt: "Buape Logo",
								description: "Standard Buape Studios logo in blue"
							},
							{
								title: "Circle Logo",
								src: "https://cdn.buape.com/buape_circle.png",
								alt: "Buape Circle Logo",
								description: "Circular variant for profile pictures and icons"
							},
							{
								title: "Buape Color",
								description: "The Buape color is #343f79",
								color: "#343f79"
							}
						]}
					/>
					<LogoSection
						title="Kiai"
						description={
							<>
								The Kiai logo may only be used in reference to features of or
								integration with Kiai itself. The logo may be used in{" "}
								<strong>transparent form</strong> or{" "}
								<strong>with its background</strong>.
								<br />
								<br />
								<strong>Required:</strong> When using the Kiai logo, you{" "}
								<strong>must</strong> link to our site at{" "}
								<a
									href="https://kiai.app"
									className="text-blue-400 hover:text-blue-300"
								>
									kiai.app
								</a>
								.
							</>
						}
						logos={[
							{
								title: "Logo",
								src: "https://cdn.buape.com/kiai/logo.png",
								alt: "Kiai Logo",
								description: "The primary logo for most use cases"
							},
							{
								title: "Logo Transparent",
								src: "https://cdn.buape.com/kiai/logo_transparent.png",
								alt: "Kiai Logo Transparent"
							},
							{
								title: "Banner",
								src: "https://cdn.buape.com/kiai/banner.png",
								alt: "Kiai Banner",
								width: 300
							},
							{
								title: "Banner Transparent",
								src: "https://cdn.buape.com/kiai/banner_transparent.png",
								alt: "Kiai Banner Transparent",
								width: 300
							},
							{
								title: "Banner Black",
								src: "https://cdn.buape.com/kiai/banner_black.png",
								alt: "Kiai Banner Black",
								description: "Black outline on lettering",
								width: 300
							},
							{
								title: "Banner Black Transparent",
								src: "https://cdn.buape.com/kiai/banner_black_transparent.png",
								alt: "Kiai Banner Black Transparent",
								width: 300
							},
							{
								title: "Brand Primary",
								color: "#FF8D00"
							},
							{
								title: "Brand Secondary",
								color: "#FFD900"
							},
							{
								title: "Deep Blue",
								color: "#2C2E43"
							},
							{
								title: "Secondary Blue",
								color: "#494E7D"
							},
							{
								title: "Tertiary Blue",
								color: "#9BA0FF"
							}
						]}
					/>
					<LogoSection
						title="Carbon"
						description={
							<>
								Standard usage guidelines apply. Link to{" "}
								<a
									href="https://carbon.buape.com"
									className="text-blue-400 hover:text-blue-300"
								>
									carbon.buape.com
								</a>{" "}
								when referencing Carbon.
							</>
						}
						logos={[
							{
								title: "Logo",
								src: "https://cdn.buape.com/carbon/logo.png",
								alt: "Carbon Logo",
								description: "Standard Carbon logo"
							},
							{
								title: "Logo Transparent",
								src: "https://cdn.buape.com/carbon/logo_transparent.png",
								alt: "Carbon Logo Transparent"
							},
							{
								title: "Logo White",
								src: "https://cdn.buape.com/carbon/logo_white.png",
								alt: "Carbon Logo White"
							},
							{
								title: "Wordmark",
								src: "https://cdn.buape.com/carbon/wordmark.png",
								alt: "Carbon Wordmark",
								width: 300
							},
							{
								title: "Wordmark Transparent",
								src: "https://cdn.buape.com/carbon/wordmark_transparent.png",
								alt: "Carbon Wordmark Transparent",
								width: 300
							},
							{
								title: "Wordmark White",
								src: "https://cdn.buape.com/carbon/wordmark_white.png",
								alt: "Carbon Wordmark White",
								width: 300
							}
						]}
					/>
					<LogoSection
						title="JT-99"
						description={
							<>
								The JT-99 logo may be used in <strong>transparent form</strong>{" "}
								or <strong>with its background</strong>. When using the JT-99
								logo, you <strong>must</strong> link to our site at{" "}
								<a
									href="https://jt-99.buape.com"
									className="text-blue-400 hover:text-blue-300"
								>
									jt-99.buape.com
								</a>
								.
							</>
						}
						logos={[
							{
								title: "Logo",
								src: "https://cdn.buape.com/jt-99/logo.png",
								alt: "JT-99 Logo",
								description: "Standard JT-99 logo"
							}
						]}
					/>
					<LogoSection
						title="Message Kit"
						description={
							<>
								Standard usage guidelines apply. Link to{" "}
								<a
									href="https://messagekit.app"
									className="text-blue-400 hover:text-blue-300"
								>
									messagekit.app
								</a>{" "}
								when referencing Message Kit.
							</>
						}
						logos={[
							{
								title: "Logo",
								src: "https://cdn.buape.com/message-kit/logo.png",
								alt: "Message Kit Logo",
								description: "Standard Message Kit logo"
							}
						]}
					/>	
					<h2>Usage Permissions</h2>
					<h3>General Usage Rights</h3>
					<p>
						Our logos (Kiai, Carbon, JT-99, Message Kit, and Buape) may be used anywhere to
						directly refer to Buape Studios{" "}
						<strong>without prior permission</strong>, provided you follow the
						guidelines below. <br />
						When using our logos, please ensure they are used to accurately
						represent or reference our products and services. Always maintain
						proper aspect ratios and avoid distorting our logos in any way. Our
						logos should be clearly visible and legible in whatever context they
						appear, and you must include the required links when using specific
						product logos as outlined in the guidelines above. <br />
						<br />
					</p>
					<h3>Restricted Usage</h3>

					<p>
						Do not modify, alter, or recreate our logos under any circumstances.{" "}
						<br />
						Our logos may <strong>not</strong> be used to indicate direct
						sponsorship or official support without explicit written permission
						from Buape Studios.
						<br />
						If a logo is not specifically listed in this guide, it is{" "}
						<strong>not allowed</strong> to be used.
					</p>
					<h2>Contact</h2>
					<p>
						For questions about logo usage, permissions for unlisted assets, or
						to request special usage rights, please contact us through our{" "}
						<a href="https://bua.pe/discord" rel="noreferrer" target="_blank">
							Discord server
						</a>{" "}
						or by emailing us at{" "}
						<a href="mailto:legal@buape.com">support@buape.com</a>.
					</p>
				</main>
			</article>
		</>
	)
}
