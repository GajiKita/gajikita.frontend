"use server"

import { cookies } from "next/headers"
import type { NextResponse } from "next/server"
import { AUTH_COOKIE } from "@/lib/auth-constants"
const ONE_WEEK_IN_SECONDS = 60 * 60 * 24 * 7

export type UserRole = "HR" | "EMPLOYEE" | string

export interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
  companyId?: string
  tenantId?: string
}

export interface AuthResponse {
  token: string
  user: AuthUser
}

export function getToken(): string | null {
  return cookies().get(AUTH_COOKIE)?.value ?? null
}

export function setToken(response: NextResponse, token: string): void {
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

export function logout(response: NextResponse): void {
  response.cookies.delete(AUTH_COOKIE)
}

export async function getUser(): Promise<AuthUser | null> {
  const token = getToken()
  if (!token) return null

  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined.")
  }

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
}

export function normalizeUser(user: AuthUser): AuthUser {
  return {
    ...user,
    tenantId: user.tenantId ?? user.companyId,
  }
}
