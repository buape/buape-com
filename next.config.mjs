import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare"

initOpenNextCloudflareForDev()

/** @type {import("next").NextConfig} */
const config = {
	reactStrictMode: true,
	transpilePackages: ["@buape/cms"],
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "*.buape.com"
			},
			{
				protocol: "https",
				hostname: "jt-99.net"
			},
			{
				protocol: "https",
				hostname: "messagekit.app"
			},
			{
				protocol: "https",
				hostname: "cdn.discordapp.com"
			}
		]
	}
}

export default config
