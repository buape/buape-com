import {
	defineCollections,
	defineConfig,
	frontmatterSchema
} from "fumadocs-mdx/config"
import { z } from "zod"

export const blog = defineCollections({
	dir: "content/blog",
	schema: frontmatterSchema.extend({
		description: z.string(),
		authorId: z
			.string()
			.min(17)
			.max(19)
			.describe("Discord Snowflake for the author's Discord ID"),
		date: z.date()
	}),
	type: "doc"
})
export const pages = defineCollections({
	dir: "content/pages",
	schema: frontmatterSchema.extend({
		description: z.string().optional()
	}),
	type: "doc"
})

export default defineConfig({
	generateManifest: true,
	lastModifiedTime: "none"
})
