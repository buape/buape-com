import type { Config } from "@buape/cms-types"
import { PayloadSDK } from "@payloadcms/sdk"

export const payload = new PayloadSDK<Config>({
	baseURL: "https://cms.buape.com/api",
	baseInit: {
		headers: {
			"x-buape": "studios"
		}
	}
})
