"use server"

import { cookies } from "next/headers"
import type { NextResponse } from "next/server"
import { AUTH_COOKIE } from "@/lib/auth-constants"
import { normalizeUser } from "@/lib/auth"
import type { AuthUser } from "@/lib/auth"

const ONE_WEEK_IN_SECONDS = 60 * 60 * 24 * 7

export async function getToken(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get(AUTH_COOKIE)?.value ?? null
}

export async function setToken(response: NextResponse, token: string): Promise<void> {
  response.cookies.set({
    name: AUTH_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: ONE_WEEK_IN_SECONDS,
    path: "/",
  })
}

export async function logout(response: NextResponse): Promise<void> {
  response.cookies.delete(AUTH_COOKIE)
}

export async function getUser(): Promise<AuthUser | null> {
  const token = await getToken()
  if (!token) return null

  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined.")
  }

  try {
    const response = await fetch(`${apiUrl.replace(/\/$/, "")}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) return null

    const data = (await response.json()) as AuthUser | { user: AuthUser }
    const user = "user" in data ? data.user : data
    return normalizeUser(user)
  } catch (error) {
    console.error("Failed to fetch current user", error)
    return null
  }
}
