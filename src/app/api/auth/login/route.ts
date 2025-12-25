"use server"

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { normalizeUser, setToken, type AuthResponse } from "@/lib/auth"

const backendUrl = process.env.NEXT_PUBLIC_API_URL

export async function POST(request: NextRequest) {
  if (!backendUrl) {
    return NextResponse.json(
      { error: "Backend URL is not configured." },
      { status: 500 }
    )
  }

  let payload: Partial<{
    address: string
    signature: string
    message: string
    email: string
  }>

  try {
    payload = await request.json()
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 })
  }

  const { address, signature, message, email } = payload ?? {}

  if (!address || !signature || !message) {
    return NextResponse.json(
      { error: "address, signature, and message are required." },
      { status: 400 }
    )
  }

  const url = `${backendUrl.replace(/\/$/, "")}/auth/login`

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ address, signature, message, email }),
    cache: "no-store",
  })

  const data = (await response.json().catch(() => null)) as AuthResponse | null

  if (!response.ok || !data) {
    return NextResponse.json(
      { error: data?.["error"] ?? "Unable to authenticate user." },
      { status: response.status || 500 }
    )
  }

  data.user = normalizeUser(data.user)
  const nextResponse = NextResponse.json(data, { status: 200 })
  setToken(nextResponse, data.token)
  return nextResponse
}
