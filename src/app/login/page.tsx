'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Wallet, Smartphone } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Privy Secured",
    description: "Enterprise-grade authentication for your payroll workspace.",
  },
  {
    icon: Wallet,
    title: "Wallet atau Email",
    description: "Izinkan tim HR atau karyawan login dengan dompet Web3 atau email.",
  },
  {
    icon: Smartphone,
    title: "MFA Siap Pakai",
    description: "Privy dapat mengaktifkan MFA berbasis SMS tanpa konfigurasi tambahan.",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  if (!privyAppId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <Card className="max-w-lg text-center">
          <CardHeader>
            <CardTitle>Konfigurasi Privy Diperlukan</CardTitle>
            <CardDescription>
              Setel <code className="font-mono text-xs">NEXT_PUBLIC_PRIVY_APP_ID</code> untuk mengaktifkan login Privy.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Dapatkan App ID Anda di dashboard Privy, lalu restart aplikasi.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { ready, authenticated, login, logout, user } = usePrivy();

  useEffect(() => {
    if (ready && authenticated) {
      const handle = setTimeout(() => router.replace("/"), 400);
      return () => clearTimeout(handle);
    }
  }, [ready, authenticated, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--app-gradient)] px-6 py-12">
      <Card className="w-full max-w-2xl border-white/50 bg-white/95 shadow-[0_45px_120px_-60px_rgba(20,60,120,0.55)]">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold">Masuk ke GajiKita</CardTitle>
          <CardDescription>
            Login menggunakan Privy untuk mengakses dashboard payroll yang aman.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-white/60 bg-white/80 p-4 text-left">
                <feature.icon className="mb-3 h-6 w-6 text-primary" />
                <p className="text-sm font-semibold">{feature.title}</p>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-center">
            <Button
              size="lg"
              className="min-w-[240px] justify-center"
              disabled={!ready}
              onClick={() => (authenticated ? logout() : login())}
            >
              {authenticated ? "Keluar" : "Masuk dengan Privy"}
            </Button>
            {!ready && <p className="text-xs text-muted-foreground">Memuat Privy...</p>}
            {authenticated && user && (
              <p className="text-xs text-muted-foreground">
                Masuk sebagai <span className="font-medium">{user.email?.address ?? user.wallet?.address}</span>
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
