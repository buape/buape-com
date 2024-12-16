export const dynamic = "force-static"
export async function GET() {
	return new Response(null, {
		status: 308,
		headers: {
			'Location': '/terms#5-privacy-policy',
			'Refresh': '0;url=/terms#5-privacy-policy'
		},
	})
}
