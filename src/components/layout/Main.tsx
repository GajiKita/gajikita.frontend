"use client"

import { usePathname } from "next/navigation"
import { ReactNode, useEffect, useState } from "react"

interface MainProps {
  children: ReactNode
}

export function Main({ children }: Readonly<MainProps>) {
  const pathname = usePathname()
  const [isNavigating, setIsNavigating] = useState(false)
  const [label, setLabel] = useState("Memuat data...")

  useEffect(() => {
    setIsNavigating(true)
    setLabel(loadingMessages[Math.floor(Math.random() * loadingMessages.length)])
    const timer = setTimeout(() => setIsNavigating(false), 300)
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <main className="relative p-6">
      {isNavigating && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-6">
            <div className="relative flex h-16 w-16 items-center justify-center">
              <div className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
              <div className="absolute h-14 w-14 animate-spin rounded-full border-2 border-dashed border-primary/70" />
              <div className="absolute h-10 w-10 animate-spin rounded-full border-2 border-secondary/70 [animation-direction:reverse]" />
              <div className="h-4 w-4 rounded-full bg-primary shadow-lg shadow-primary/40" />
            </div>
            <div className="flex flex-col items-center text-center">
              <p className="text-sm font-semibold text-primary">{label}</p>
              <p className="text-xs text-muted-foreground">Sedang menuju halaman berikut...</p>
            </div>
          </div>
        </div>
      )}
      <div className="animate-fade-in">{children}</div>
    </main>
  )
}

const loadingMessages = [
  "Mengatur dashboard agar lebih rapi...",
  "Menjembatani data payroll Anda...",
  "Fintech pixie sedang bekerja...",
  "Sinkronisasi status karyawan...",
  "Menyusun laporan sesuai peran Anda...",
]
