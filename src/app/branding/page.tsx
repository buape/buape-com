import { Card, Cards } from "fumadocs-ui/components/card"
import type { Metadata } from "next"
import Image from "next/image"
import type { ReactNode } from "react"
import { createMetadata } from "~/app/createMetadata"
import { ClickToCopy } from "~/components/ClickToCopy"
import GridPattern from "~/components/ui/grid-pattern"
import { cn } from "~/lib/utils"

function LogoCard({
	title,
	src,
	alt,
	description,
	width = 120,
	height = 60
}: {
	title: string
	src: string
	alt: string
	description: string
	width?: number
	height?: number
}) {
	return (
		<Card title={title}>
			<div className="flex flex-col items-center gap-2 h-full">
				<p className="text-xs mb-2">{description}</p>
				<ClickToCopy toCopy={src}>
					<Image
						src={src}
						alt={alt}
						width={width}
						height={height}
						className="object-contain max-w-full max-h-24"
					/>
				</ClickToCopy>
			</div>
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
	logos: Array<{
		title: string
		src: string
		alt: string
		description: string
		width?: number
		height?: number
	}>
}) {
	return (
		<>
			<h3 className="text-xl font-bold mb-4">{title}</h3>
			<div className="text-base mb-6">{description}</div>
			<Cards className="mb-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{logos.map((logo) => (
					<LogoCard key={`${logo.src}-${logo.title}`} {...logo} />
				))}
			</Cards>
		</>
	)
}

export const metadata: Metadata = createMetadata({
	title: "Branding Guide",
	description: "Last updated: September 20, 2025"
})

export default function BrandingPage() {
	return (
		<>
			<GridPattern
				className={cn(
					"mask-[linear-gradient(to_bottom,white,transparent,transparent)]"
				)}
			/>
			<div className="relative flex size-full flex-col w-screen max-w-(--breakpoint-lg) min-h-dvh items-center justify-center container">
				<div className="flex flex-col gap-10 items-center m-5 pb-5 mt-32">
					<h1 className="text-4xl font-bold text-buape">Branding Guide</h1>
					<span className="text-xl font-normal text-white text-center">
						Last updated: September 20, 2025
					</span>
				</div>
				<div className="w-screen bg-[#101013] border border-gray py-20">
					<div className="max-w-full flex flex-col gap-4 text-left px-24 lg:px-48">
						<div className="prose prose-lg max-w-none text-white">
							<div className="mt-10">
								<p className="text-lg mb-8">
									This guide outlines the proper usage of Buape Studios logos
									and branding materials. Please read carefully before using any
									of our brand assets.
								</p>

								<p className="text-lg mb-8">
									This branding guide is subject to change. Please check back
									regularly for updates to ensure compliance with our current
									guidelines.
								</p>

								<span className="text-3xl font-bold text-buape mb-6 block">
									Available Logos
								</span>

								<p className="mb-6">
									We provide the following logos for public use:
								</p>

								<LogoSection
									title="Buape Studios"
									description={
										<>
											The Buape Studios logo (B-Wave){" "}
											<strong>
												must be used solely in its blue (main) form
											</strong>
											. Any other colored or transparent variants may only be
											used with explicit permission.
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
											description:
												"Circular variant for profile pictures and icons",
											width: 120,
											height: 120
										}
									]}
								/>

								<LogoSection
									title="Kiai"
									description={
										<>
											The Kiai logo may only be used in reference to features of
											or integration with Kiai itself. The logo may be used in{" "}
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
											description: "Standard Kiai logo with background"
										},
										{
											title: "Logo Transparent",
											src: "https://cdn.buape.com/kiai/logo_transparent.png",
											alt: "Kiai Logo Transparent",
											description: "Kiai logo without background"
										},
										{
											title: "Banner",
											src: "https://cdn.buape.com/kiai/banner.png",
											alt: "Kiai Banner",
											description: "Full banner with text and logo"
										},
										{
											title: "Banner Transparent",
											src: "https://cdn.buape.com/kiai/banner_transparent.png",
											alt: "Kiai Banner Transparent",
											description: "Banner without background"
										},
										{
											title: "Banner Black",
											src: "https://cdn.buape.com/kiai/banner_black.png",
											alt: "Kiai Banner Black",
											description: "Black variant of the banner"
										},
										{
											title: "Banner Black Transparent",
											src: "https://cdn.buape.com/kiai/banner_black_transparent.png",
											alt: "Kiai Banner Black Transparent",
											description: "Black banner without background"
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
											alt: "Carbon Logo Transparent",
											description: "Carbon logo without background"
										},
										{
											title: "Logo White",
											src: "https://cdn.buape.com/carbon/logo_white.png",
											alt: "Carbon Logo White",
											description: "White version for dark backgrounds"
										},
										{
											title: "Wordmark",
											src: "https://cdn.buape.com/carbon/wordmark.png",
											alt: "Carbon Wordmark",
											description: "Carbon wordmark with text"
										},
										{
											title: "Wordmark Transparent",
											src: "https://cdn.buape.com/carbon/wordmark_transparent.png",
											alt: "Carbon Wordmark Transparent",
											description: "Wordmark without background"
										},
										{
											title: "Wordmark White",
											src: "https://cdn.buape.com/carbon/wordmark_white.png",
											alt: "Carbon Wordmark White",
											description: "White wordmark for dark backgrounds"
										}
									]}
								/>
								<LogoSection
									title="JT-99"
									description={
										<>
											The JT-99 logo may be used in{" "}
											<strong>transparent form</strong> or{" "}
											<strong>with its background</strong>. When using the JT-99
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

								<span className="text-3xl font-bold text-buape mb-6 block">
									Usage Permissions
								</span>

								<h3 className="text-xl font-bold mb-4">General Usage Rights</h3>
								<p className="mb-6">
									Our logos (Kiai, Carbon, JT-99, and Buape) may be used
									anywhere to directly refer to Buape Studios{" "}
									<strong>without prior permission</strong>, provided you follow
									the guidelines below.
								</p>

								<h3 className="text-xl font-bold mb-4">Restricted Usage</h3>
								<p className="mb-4">
									Our logos may <strong>not</strong> be used to indicate direct
									sponsorship or official support without explicit written
									permission from Buape Studios.
								</p>
								<p className="mb-6">
									If a logo is not specifically listed in this guide, it is{" "}
									<strong>not allowed</strong> to be used.
								</p>

								<span className="text-3xl font-bold text-buape mb-6 block">
									Best Practices
								</span>
								<p className="mb-6">
									When using our logos, please ensure they are used to
									accurately represent or reference our products and services.
									Always maintain proper aspect ratios and avoid distorting our
									logos in any way. Our logos should be clearly visible and
									legible in whatever context they appear, and you must include
									the required links when using specific product logos as
									outlined in the guidelines above.
								</p>
								<p className="mb-6">
									Please do not modify, alter, or recreate our logos under any
									circumstances. Additionally, avoid using our logos in any way
									that suggests partnership or endorsement without explicit
									permission from Buape Studios. Remember that only logos
									explicitly listed in this guide are permitted for use, and the
									Buape logo must always appear in its official blue color
									unless special permission has been granted.
								</p>

								<span className="text-3xl font-bold text-buape mb-6 block">
									Contact
								</span>
								<p className="mb-4">
									For questions about logo usage, permissions for unlisted
									assets, or to request special usage rights, please contact us
									through our{" "}
									<a
										href="https://bua.pe/discord"
										rel="noreferrer"
										target="_blank"
									>
										official channels
									</a>
									.
								</p>
								<p className="mb-6">
									For sponsorship or partnership inquiries, please reach out to
									discuss proper usage rights and permissions.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
