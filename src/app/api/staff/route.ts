import { NextResponse } from "next/server"
import { getStaff } from "~/lib/staff"

export async function GET() {
	try {
		const staff = await getStaff()
		if (!staff) {
			return NextResponse.json({ error: "Staff data not found" }, { status: 404 })
		}
		return NextResponse.json(staff)
	} catch (error) {
		console.error("Error fetching staff:", error)
		return NextResponse.json({ error: "Internal server error" }, { status: 500 })
	}
}
