// Importing env files here to validate on build
import "./src/env.mjs"

/** @type {import("next").NextConfig} */
export default {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "*.buape.com"
			},
			{
				protocol: "https",
				hostname: "*.stattrack.dev"
			},
			{
				protocol: "https",
				hostname: "jt-99.net"
			},
			{
				protocol: "https",
				hostname: "cdn.discordapp.com"
			}
		]
	}
}
