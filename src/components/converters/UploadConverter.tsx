/** biome-ignore-all lint/performance/noImgElement: <cms> */
import type { SerializedUploadNode } from "@payloadcms/richtext-lexical"
import type { JSXConverters } from "@payloadcms/richtext-lexical/react"
import type { UploadDataImproved } from "node_modules/@payloadcms/richtext-lexical/dist/features/upload/server/nodes/UploadNode"
import type { FileData, FileSizeImproved, TypeWithID } from "payload"

export const UploadJSXConverter: JSXConverters<SerializedUploadNode> = {
	upload: ({ node }) => {
		// TO-DO (v4): SerializedUploadNode should use UploadData_P4
		const uploadNode = node as UploadDataImproved
		if (typeof uploadNode.value !== "object") {
			return null
		}

		const uploadDoc = uploadNode.value as unknown as FileData &
			TypeWithID & { caption: string }

		const url = uploadDoc.url

		/**
		 * If the upload is not an image, return a link to the upload
		 */
		if (!uploadDoc.mimeType.startsWith("image")) {
			return (
				<a href={url} rel="noopener noreferrer">
					{uploadDoc.filename}
				</a>
			)
		}

		/**
		 * If the upload is an image with different sizes, return a picture element
		 */
		const pictureJSX: React.ReactNode[] = []

		if (uploadDoc.sizes && !Object.keys(uploadDoc.sizes).length) {
			// Iterate through each size in the data.sizes object
			for (const size in uploadDoc.sizes) {
				const imageSize = uploadDoc.sizes[size] as FileSizeImproved

				// Skip if any property of the size object is null
				if (
					!imageSize ||
					!imageSize.width ||
					!imageSize.height ||
					!imageSize.mimeType ||
					!imageSize.filesize ||
					!imageSize.filename ||
					!imageSize.url
				) {
					continue
				}
				const imageSizeURL = imageSize?.url

				pictureJSX.push(
					<source
						key={size}
						media={`(max-width: ${imageSize.width}px)`}
						srcSet={imageSizeURL}
						type={imageSize.mimeType}
					/>
				)
			}
		}

		// Add the default img tag
		pictureJSX.push(
			<img
				alt={uploadDoc?.filename}
				height={uploadDoc?.height}
				key={"image"}
				src={url}
				width={uploadDoc?.width}
			/>
		)
		return (
			<figure>
				<picture>{pictureJSX}</picture>
				<figcaption>{uploadDoc.caption}</figcaption>
			</figure>
		)
	}
}
