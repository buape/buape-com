import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare"

initOpenNextCloudflareForDev()

/** @type {import("next").NextConfig} */
const config = {
	reactStrictMode: true,
	transpilePackages: ["@buape/cms"],
	rewrites: async () => {
		return [
			{
				source: "/api/media/:path*",
				destination: "https://cms.buape.com/api/media/:path*"
			}
		]
	},
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
