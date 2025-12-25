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

export type AuthErrorResponse = {
  error?: string
}

export function isAuthResponse(value: unknown): value is AuthResponse {
  if (typeof value !== "object" || value === null) return false
  const record = value as Record<string, unknown>
  return (
    typeof record.token === "string" &&
    typeof record.user === "object" &&
    record.user !== null
  )
}

export function normalizeUser(user: AuthUser): AuthUser {
  return {
    ...user,
    tenantId: user.tenantId ?? user.companyId,
  }
}
