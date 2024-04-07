import { vercel } from "@t3-oss/env-core/presets"
import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
	extends: [vercel],
	shared: {
	},
	server: {
	},
	client: {
	},
	runtimeEnv: {
	},
	skipValidation:
		!!process.env.CI ||
		!!process.env.SKIP_ENV_VALIDATION ||
		process.env.npm_lifecycle_event === "lint"
})
