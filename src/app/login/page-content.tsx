'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { usePrivy } from "@privy-io/react-auth"
import { ShieldCheck, Mail, Lock } from "lucide-react"
import { isAuthResponse, type AuthErrorResponse, type AuthResponse } from "@/lib/auth"
import { useAuth } from "@/hooks/useAuth"

const SIGN_MESSAGE = "Login to GajiKita"
type SignableWallet = {
  address?: string
  signMessage?: (message: string) => Promise<string>
}

export default function LoginPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirect") ?? "/dashboard"
  const { setUser } = useAuth()
  const { ready, authenticated, login, user, logout } = usePrivy()
  const [statusMessage, setStatusMessage] = useState<string>("")
  const syncInProgress = useRef(false)

  const {
    mutate,
    isPending,
  } = useMutation<AuthResponse, Error, { address: string; signature: string }>({
    mutationFn: async ({ address, signature }) => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          signature,
          message: SIGN_MESSAGE,
          email: user?.email?.address,
        }),
      })

      const data = (await response.json().catch(() => null)) as
        | AuthResponse
        | AuthErrorResponse
        | null
      const errorMessage =
        data && typeof data === "object" && "error" in data
          ? data.error
          : null

      if (!response.ok || !data || !isAuthResponse(data)) {
        throw new Error(errorMessage ?? "Authentication failed.")
      }

      return data
    },
    onSuccess: (data) => {
      setUser(data.user)
      router.replace(redirectTo)
    },
    onError: (error) => {
      setStatusMessage(error.message)
      syncInProgress.current = false
    },
  })

  const featureList = useMemo(
    () => [
      {
        icon: ShieldCheck,
        title: "Privy secured",
        description:
          "Login memakai email kantor dengan embedded wallet otomatis.",
      },
      {
        icon: Mail,
        title: "Email only",
        description: "Tidak ada UI dompet. Semua akses via email terverifikasi.",
      },
      {
        icon: Lock,
        title: "Message signing",
        description:
          "Privy signer menandatangani pesan \"Login to GajiKita\" sebelum token JWT diberikan.",
      },
    ],
    []
  )

  const handlePrivyLogin = useCallback(() => {
    setStatusMessage("")
    login({
      loginMethods: ["email"],
    })
  }, [login])

  useEffect(() => {
    if (!ready || !authenticated || !user) {
      syncInProgress.current = false
      return
    }
    if (syncInProgress.current) return

    const sync = async () => {
      try {
        syncInProgress.current = true
        setStatusMessage("Memverifikasi tanda tangan Privy...")
        const wallet = user.wallet as SignableWallet | null
        if (!wallet?.address) {
          throw new Error("Wallet address tidak ditemukan.")
        }
        if (typeof wallet.signMessage !== "function") {
          throw new Error("Wallet tidak mendukung penandatanganan pesan.")
        }
        const signature = await wallet.signMessage(SIGN_MESSAGE)
        mutate({
          address: wallet.address,
          signature,
        })
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Gagal melakukan login."
        setStatusMessage(message)
        syncInProgress.current = false
        await logout()
      }
    }

    void sync()
  }, [ready, authenticated, user, mutate, logout])

  return (
    <div className="grid min-h-screen grid-cols-1 bg-slate-50 lg:grid-cols-2">
      <aside className="relative hidden lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-blue-700" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),transparent_55%)]" />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <Image
            src="/images/logo-gaji-kita.png"
            alt="GajiKita"
            width={140}
            height={48}
            className="h-16 w-auto"
          />
          <div className="space-y-6">
            {featureList.map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl border border-white/20 bg-white/5 p-6 backdrop-blur-xl"
              >
                <feature.icon className="h-6 w-6 text-white" />
                <p className="mt-4 text-lg font-semibold">{feature.title}</p>
                <p className="text-sm text-white/80">{feature.description}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-white/70">
            Login hanya menerima email kantor yang terdaftar. Tidak ada UI dompet
            namun signing message tetap diwajibkan untuk keamanan backend.
          </p>
        </div>
      </aside>

      <main className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md space-y-8 rounded-[32px] border border-slate-100 bg-white p-8 shadow-xl">
          <div className="space-y-2 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
              Secure Access
            </p>
            <h1 className="text-3xl font-semibold text-slate-900">
              Masuk ke GajiKita
            </h1>
            <p className="text-sm text-slate-500">
              Gunakan email kantor yang terverifikasi Privy. Setelah login, kami
              akan membuat tanda tangan untuk token platform.
            </p>
          </div>

          <div className="space-y-4">
            <button
              className="flex h-12 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-500 text-base font-semibold text-white shadow-lg transition hover:opacity-90 disabled:opacity-60"
              disabled={!ready || isPending}
              onClick={handlePrivyLogin}
            >
              {isPending ? "Menghubungkan Privy..." : "Login dengan Email Kantor"}
            </button>

            <p className="text-center text-xs text-slate-400">
              Privy akan mengirim tautan magic link ke email perusahaan Anda.
            </p>

            {statusMessage && (
              <p className="rounded-xl bg-slate-100 p-3 text-center text-sm text-slate-600">
                {statusMessage}
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}