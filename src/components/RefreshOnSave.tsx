import { RefreshRouteOnSave as PayloadLivePreview } from "@payloadcms/live-preview-react"
import { useRevalidator } from "react-router"

export const RefreshRouteOnSave = () => {
	const revalidator = useRevalidator()

	return (
		<PayloadLivePreview
			refresh={() => revalidator.revalidate()}
			serverURL="https://cms.buape.com/admin"
		/>
	)
}
