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
  const [queryClient] = useState(() => new QueryClient())
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
