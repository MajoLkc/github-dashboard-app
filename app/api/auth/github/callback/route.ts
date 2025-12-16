import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")
  const error = searchParams.get("error")
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

  if (error) {
    return NextResponse.redirect(
      `${baseUrl}/?auth_error=${encodeURIComponent("GitHub authorization was denied")}`
    )
  }

  if (!code) {
    return NextResponse.redirect(
      `${baseUrl}/?auth_error=${encodeURIComponent("No authorization code received")}`
    )
  }

  try {
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (tokenData.error) {
      return NextResponse.redirect(
        `${baseUrl}/?auth_error=${encodeURIComponent(tokenData.error_description || "Failed to get access token")}`
      )
    }

    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        Accept: "application/vnd.github.v3+json",
      },
    })

    if (!userResponse.ok) {
      return NextResponse.redirect(
        `${baseUrl}/?auth_error=${encodeURIComponent("Failed to fetch user information")}`
      )
    }

    const userData = await userResponse.json()

    const sessionData = {
      id: userData.id,
      login: userData.login,
      name: userData.name,
      avatar_url: userData.avatar_url,
      email: userData.email,
      access_token: tokenData.access_token,
    }

    const cookieStore = await cookies()
    cookieStore.set("github_session", JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })

    return NextResponse.redirect(`${baseUrl}/?auth_success=true`)
  } catch {
    return NextResponse.redirect(
      `${baseUrl}/?auth_error=${encodeURIComponent("An error occurred during authentication")}`
    )
  }
}
