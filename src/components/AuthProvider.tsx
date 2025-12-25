"use client"

import {
  createContext,
  useCallback,
  useMemo,
  type ReactNode,
} from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import type { AuthUser } from "@/lib/auth"

export type AuthStatus = "loading" | "authenticated" | "unauthenticated"

export interface AuthContextValue {
  user: AuthUser | null
  status: AuthStatus
  isHR: boolean
  isEmployee: boolean
  setUser: (user: AuthUser | null) => void
  logout: () => Promise<void>
  refetchUser: () => Promise<AuthUser | null>
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
)

async function fetchCurrentUser(): Promise<AuthUser | null> {
  try {
    const response = await fetch("/api/proxy/auth/me", {
      credentials: "include",
      cache: "no-store",
    })

    if (response.status === 401 || response.status === 403) return null
    if (!response.ok) return null

    const data = (await response.json()) as AuthUser | { user: AuthUser }
    const user = "user" in data ? data.user : data
    return user ?? null
  } catch {
    return null
  }
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient()
  const {
    data,
    isLoading,
    refetch,
  } = useQuery<AuthUser | null>({
    queryKey: ["auth", "me"],
    queryFn: fetchCurrentUser,
    retry: false,
    staleTime: 0,
  })

  const setUser = useCallback(
    (user: AuthUser | null) => {
      queryClient.setQueryData(["auth", "me"], user)
    },
    [queryClient]
  )

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    })
    setUser(null)
  }, [setUser])

  const refetchUser = useCallback(async () => {
    const result = await refetch()
    return result.data ?? null
  }, [refetch])

  const status: AuthStatus = isLoading
    ? "loading"
    : data
      ? "authenticated"
      : "unauthenticated"

  const value = useMemo<AuthContextValue>(
    () => ({
      user: data ?? null,
      status,
      isHR: (data?.role ?? "").toUpperCase() === "HR",
      isEmployee: (data?.role ?? "").toUpperCase() === "EMPLOYEE",
      setUser,
      logout,
      refetchUser,
    }),
    [data, status, setUser, logout, refetchUser]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
