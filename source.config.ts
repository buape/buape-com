import {
	defineCollections,
	defineConfig,
	frontmatterSchema
} from "fumadocs-mdx/config"
import { z } from "zod"

export const blog = defineCollections({
	dir: 'content/blog',
	schema: frontmatterSchema.extend({
		description: z.string(),
		author: z.string(),
		authorImage: z.string().url().optional(),
		date: z.date(),
	}),
	type: "doc"
});


export default defineConfig({
	generateManifest: true,
	lastModifiedTime: "none"
})
