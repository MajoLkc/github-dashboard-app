import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("github_session")

  if (!sessionCookie) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  try {
    const session = JSON.parse(sessionCookie.value)

    return NextResponse.json({
      id: session.id,
      login: session.login,
      name: session.name,
      avatar_url: session.avatar_url,
      email: session.email,
    })
  } catch {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 })
  }
}
