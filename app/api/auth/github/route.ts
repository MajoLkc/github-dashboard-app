import { NextResponse } from "next/server"

export async function GET() {
  const clientId = process.env.GITHUB_CLIENT_ID

  if (!clientId) {
    return NextResponse.redirect(
      new URL("/?auth_error=" + encodeURIComponent("GitHub OAuth not configured"), process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000")
    )
  }

  const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/auth/github/callback`
  const scope = "read:user user:email"

  const githubAuthUrl = new URL("https://github.com/login/oauth/authorize")
  githubAuthUrl.searchParams.set("client_id", clientId)
  githubAuthUrl.searchParams.set("redirect_uri", redirectUri)
  githubAuthUrl.searchParams.set("scope", scope)

  return NextResponse.redirect(githubAuthUrl.toString())
}
