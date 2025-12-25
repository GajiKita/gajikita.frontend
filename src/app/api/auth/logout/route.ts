"use server"

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { logout } from "@/lib/auth"

export async function POST(_request: NextRequest) {
  const response = NextResponse.json({ success: true })
  logout(response)
  return response
}
