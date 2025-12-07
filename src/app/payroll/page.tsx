'use client';

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Calendar,
  Percent,
  Shield,
  Settings2,
  Save,
  RefreshCw,
  Clock,
  Wallet,
  Users,
  FileCheck,
  AlertCircle,
  CheckCircle2,
  Info,
  Zap,
} from "lucide-react";

export default function PayrollSetupPage() {
  const [role] = useState<"hr" | "employee">("hr");
  const [activeTab, setActiveTab] = useState("salary-cycle");
  
  // Salary Cycle State
  const [cycleType, setCycleType] = useState("monthly");
  const [payDay, setPayDay] = useState("25");
  const [cutOffDay, setCutOffDay] = useState("20");
  const [autoProcess, setAutoProcess] = useState(true);
  
  // Withdraw Limits State
  const [globalLimit, setGlobalLimit] = useState([30]);
  const [minWithdraw, setMinWithdraw] = useState("100000");
  const [maxWithdraw, setMaxWithdraw] = useState("5000000");
  const [dailyLimit, setDailyLimit] = useState("2000000");
  const [cooldownHours, setCooldownHours] = useState("4");
  const [autoApprove, setAutoApprove] = useState(true);
  
  // SBT Rules State
  const [autoMint, setAutoMint] = useState(true);
  const [probationDays, setProbationDays] = useState("30");
  const [requireKYC, setRequireKYC] = useState(true);
  const [requireContract, setRequireContract] = useState(true);
  const [autoRevoke, setAutoRevoke] = useState(true);
  const [revokeDays, setRevokeDays] = useState("7");

  const handleSave = () => {
    toast.success("Pengaturan payroll berhasil disimpan", {
      description: "Perubahan akan diterapkan pada siklus berikutnya",
    });
  };

  const formatCurrency = (value: string) => {
    const num = parseInt(value.replace(/\D/g, ""));
    if (isNaN(num)) return "";
    return new Intl.NumberFormat("id-ID").format(num);
  };

  return (
    <DashboardLayout role={role} onRoleChange={() => {}}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">Payroll Setup</h1>
            <p className="text-muted-foreground">
              Konfigurasi siklus gaji, batas penarikan, dan aturan SBT
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Reset Default
            </Button>
            <Button onClick={handleSave} className="gap-2 bg-gradient-primary hover:opacity-90 shadow-glow">
              <Save className="w-4 h-4" />
              Simpan Pengaturan
            </Button>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Siklus Aktif</p>
                <p className="text-lg font-semibold">Bulanan (Tgl 25)</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Percent className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Batas Withdraw</p>
                <p className="text-lg font-semibold">{globalLimit[0]}% Gaji</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">SBT Aktif</p>
                <p className="text-lg font-semibold">156 Karyawan</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Configuration Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-muted/50 p-1 h-auto flex-wrap">
            <TabsTrigger value="salary-cycle" className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Calendar className="w-4 h-4" />
              Siklus Gaji
            </TabsTrigger>
            <TabsTrigger value="withdraw-limits" className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Wallet className="w-4 h-4" />
              Batas Withdraw
            </TabsTrigger>
            <TabsTrigger value="sbt-rules" className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Shield className="w-4 h-4" />
              Aturan SBT
            </TabsTrigger>
          </TabsList>

          {/* Salary Cycle Tab */}
          <TabsContent value="salary-cycle" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings2 className="w-5 h-5 text-primary" />
                    Konfigurasi Siklus
                  </CardTitle>
                  <CardDescription>
                    Atur periode pembayaran gaji karyawan
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Tipe Siklus Gaji</Label>
                    <Select value={cycleType} onValueChange={setCycleType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Mingguan</SelectItem>
                        <SelectItem value="biweekly">Dua Mingguan</SelectItem>
                        <SelectItem value="monthly">Bulanan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Tanggal Gajian</Label>
                      <Select value={payDay} onValueChange={setPayDay}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 28 }, (_, i) => (
                            <SelectItem key={i + 1} value={String(i + 1)}>
                              Tanggal {i + 1}
                            </SelectItem>
                          ))}
                          <SelectItem value="last">Akhir Bulan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Cut-off Absensi</Label>
                      <Select value={cutOffDay} onValueChange={setCutOffDay}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 28 }, (_, i) => (
                            <SelectItem key={i + 1} value={String(i + 1)}>
                              Tanggal {i + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                    <div className="space-y-1">
                      <Label className="text-base">Proses Otomatis</Label>
                      <p className="text-sm text-muted-foreground">
                        Jalankan payroll secara otomatis pada tanggal gajian
                      </p>
                    </div>
                    <Switch checked={autoProcess} onCheckedChange={setAutoProcess} />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Jadwal Siklus
                  </CardTitle>
                  <CardDescription>
                    Preview siklus gaji yang akan berjalan
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">Siklus Saat Ini</p>
                        <p className="text-sm text-muted-foreground">Januari 2024</p>
                      </div>
                      <Badge className="ml-auto bg-success/10 text-success border-success/20">
                        Aktif
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Periode Kerja</p>
                        <p className="font-medium">21 Des - 20 Jan</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Tanggal Gajian</p>
                        <p className="font-medium">25 Januari 2024</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-medium text-muted-foreground">Siklus Mendatang</p>
                    {[
                      { month: "Februari 2024", period: "21 Jan - 20 Feb", payDate: "25 Feb" },
                      { month: "Maret 2024", period: "21 Feb - 20 Mar", payDate: "25 Mar" },
                      { month: "April 2024", period: "21 Mar - 20 Apr", payDate: "25 Apr" },
                    ].map((cycle, i) => (
                      <div key={i} className="p-3 rounded-lg bg-muted/30 flex items-center justify-between">
                        <div>
                          <p className="font-medium">{cycle.month}</p>
                          <p className="text-xs text-muted-foreground">{cycle.period}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">{cycle.payDate}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Withdraw Limits Tab */}
          <TabsContent value="withdraw-limits" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Percent className="w-5 h-5 text-primary" />
                    Batas Global
                  </CardTitle>
                  <CardDescription>
                    Atur batas maksimal penarikan untuk semua karyawan
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Batas Withdraw (%)</Label>
                      <span className="text-2xl font-bold text-primary">{globalLimit[0]}%</span>
                    </div>
                    <Slider
                      value={globalLimit}
                      onValueChange={setGlobalLimit}
                      max={50}
                      min={10}
                      step={5}
                      className="py-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>10%</span>
                      <span>50%</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-warning/10 border border-warning/20 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-warning">Perhatian</p>
                      <p className="text-muted-foreground">
                        Batas yang terlalu tinggi dapat mempengaruhi likuiditas pool
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Minimum Withdraw</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">Rp</span>
                        <Input
                          value={formatCurrency(minWithdraw)}
                          onChange={(e) => setMinWithdraw(e.target.value.replace(/\D/g, ""))}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Maximum Withdraw</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">Rp</span>
                        <Input
                          value={formatCurrency(maxWithdraw)}
                          onChange={(e) => setMaxWithdraw(e.target.value.replace(/\D/g, ""))}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Kontrol Frekuensi
                  </CardTitle>
                  <CardDescription>
                    Atur batasan waktu dan jumlah penarikan
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Limit Harian per Karyawan</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">Rp</span>
                      <Input
                        value={formatCurrency(dailyLimit)}
                        onChange={(e) => setDailyLimit(e.target.value.replace(/\D/g, ""))}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Cooldown Antar Withdraw</Label>
                    <Select value={cooldownHours} onValueChange={setCooldownHours}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Tanpa Cooldown</SelectItem>
                        <SelectItem value="1">1 Jam</SelectItem>
                        <SelectItem value="4">4 Jam</SelectItem>
                        <SelectItem value="8">8 Jam</SelectItem>
                        <SelectItem value="24">24 Jam</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                    <div className="space-y-1">
                      <Label className="text-base">Auto-Approve</Label>
                      <p className="text-sm text-muted-foreground">
                        Setujui otomatis withdraw dalam batas
                      </p>
                    </div>
                    <Switch checked={autoApprove} onCheckedChange={setAutoApprove} />
                  </div>

                  <div className="p-4 rounded-xl bg-success/10 border border-success/20 flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-success">Rekomendasi</p>
                      <p className="text-muted-foreground">
                        Aktifkan auto-approve untuk pengalaman karyawan yang lebih baik
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* SBT Rules Tab */}
          <TabsContent value="sbt-rules" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Aturan Minting
                  </CardTitle>
                  <CardDescription>
                    Konfigurasi kapan SBT Payroll di-mint untuk karyawan
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                    <div className="space-y-1">
                      <Label className="text-base">Auto-Mint SBT</Label>
                      <p className="text-sm text-muted-foreground">
                        Mint otomatis setelah syarat terpenuhi
                      </p>
                    </div>
                    <Switch checked={autoMint} onCheckedChange={setAutoMint} />
                  </div>

                  <div className="space-y-2">
                    <Label>Masa Probation (Hari)</Label>
                    <Select value={probationDays} onValueChange={setProbationDays}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Tanpa Probation</SelectItem>
                        <SelectItem value="14">14 Hari</SelectItem>
                        <SelectItem value="30">30 Hari</SelectItem>
                        <SelectItem value="60">60 Hari</SelectItem>
                        <SelectItem value="90">90 Hari</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      SBT baru di-mint setelah masa probation selesai
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Label>Persyaratan Minting</Label>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        <FileCheck className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Verifikasi KYC</p>
                          <p className="text-xs text-muted-foreground">Wajib upload KTP/identitas</p>
                        </div>
                      </div>
                      <Switch checked={requireKYC} onCheckedChange={setRequireKYC} />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        <FileCheck className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Kontrak Kerja</p>
                          <p className="text-xs text-muted-foreground">Wajib ada kontrak aktif</p>
                        </div>
                      </div>
                      <Switch checked={requireContract} onCheckedChange={setRequireContract} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Aturan Revoke
                  </CardTitle>
                  <CardDescription>
                    Konfigurasi kapan SBT otomatis di-revoke
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                    <div className="space-y-1">
                      <Label className="text-base">Auto-Revoke</Label>
                      <p className="text-sm text-muted-foreground">
                        Revoke otomatis saat karyawan resign
                      </p>
                    </div>
                    <Switch checked={autoRevoke} onCheckedChange={setAutoRevoke} />
                  </div>

                  <div className="space-y-2">
                    <Label>Grace Period Setelah Resign</Label>
                    <Select value={revokeDays} onValueChange={setRevokeDays}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Langsung Revoke</SelectItem>
                        <SelectItem value="7">7 Hari</SelectItem>
                        <SelectItem value="14">14 Hari</SelectItem>
                        <SelectItem value="30">30 Hari</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Waktu tunggu sebelum SBT di-revoke setelah resign
                    </p>
                  </div>

                  <Separator />

                  <div className="p-4 rounded-xl bg-info/10 border border-info/20 flex gap-3">
                    <Info className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-info">Tentang SBT</p>
                      <p className="text-muted-foreground">
                        SBT (Soulbound Token) adalah NFT non-transferable yang mengikat identitas karyawan dengan hak withdraw mereka.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Statistik SBT</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-success/10 text-center">
                        <p className="text-2xl font-bold text-success">156</p>
                        <p className="text-xs text-muted-foreground">SBT Aktif</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50 text-center">
                        <p className="text-2xl font-bold">12</p>
                        <p className="text-xs text-muted-foreground">Pending Mint</p>
                      </div>
                      <div className="p-3 rounded-lg bg-warning/10 text-center">
                        <p className="text-2xl font-bold text-warning">3</p>
                        <p className="text-xs text-muted-foreground">Grace Period</p>
                      </div>
                      <div className="p-3 rounded-lg bg-destructive/10 text-center">
                        <p className="text-2xl font-bold text-destructive">8</p>
                        <p className="text-xs text-muted-foreground">Revoked</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
