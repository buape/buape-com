// Importing env files here to validate on build
import "./src/env.mjs"

import { createMDX } from 'fumadocs-mdx/next'

/** @type {import("next").NextConfig} */
const config = {
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

const withMDX = createMDX()

export default withMDX(config)
