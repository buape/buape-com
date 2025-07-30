export async function getStaff() {
	const res = await fetch("https://internal.buape.com/staff", {
		cache: "no-store"
	})
	if (res.ok) {
		return (await res.json()) as {
			data: {
				staff: {
					id: string
					positions: string[]
					username?: string
					avatarUrl?: string
					hierarchyPosition: number
				}[]
			}
		}
	}
}