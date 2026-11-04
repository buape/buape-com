import { createDocketClient } from "@buape/docket/client"

// Override VITE_DOCKET_URL explicitly when working against a local Docket instance.
export const docket = createDocketClient({
	baseUrl: import.meta.env.VITE_DOCKET_URL || "https://docket.buape.com"
})
