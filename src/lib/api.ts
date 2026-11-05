export type StaffResponse = {
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

export async function getStaff() {
	const res = await fetch("/api/staff")
	if (!res.ok) throw new Response("Not found", { status: res.status })
	return (await res.json()) as StaffResponse
}
