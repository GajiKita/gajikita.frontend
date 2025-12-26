"use client"

import { ReactNode, useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { PrivyProvider } from "@privy-io/react-auth"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { AuthProvider } from "@/components/AuthProvider"

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 2, // 2 minutes (was 5)
        gcTime: 1000 * 60 * 5, // 5 minutes (was 10)
        retry: 1,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000), // Reduced max retry delay
        refetchOnWindowFocus: false, // Disable auto refetch on window focus
        refetchOnReconnect: false, // Disable auto refetch on reconnect
      },
      mutations: {
        retry: 0, // Reduce mutation retries to speed up failure detection
      },
    },
  }))
  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID

  const baseProviders = (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          {children}
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  )

  if (!privyAppId) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "NEXT_PUBLIC_PRIVY_APP_ID is not defined. Privy login is disabled."
      )
    }
    return baseProviders
  }

  return (
    <PrivyProvider
      appId={privyAppId}
      config={{
        appearance: {
          accentColor: "#1f81e0",
          theme: "light",
        },
        loginMethods: ["email"],
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      {baseProviders}
    </PrivyProvider>
  )
}
