'use client';

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { LiquidityCard } from "@/components/dashboard/LiquidityCard";
import { LiquidityChart } from "@/components/dashboard/AnalyticsCharts";
import { StatCard } from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Coins, 
  TrendingUp, 
  Landmark, 
  Users, 
  ArrowUpRight,
  ExternalLink,
  Activity,
  AlertCircle,
} from "lucide-react";

const transactions = [
  { type: "Deposit", amount: 50000000, source: "Company", time: "2 hours ago", status: "confirmed" },
  { type: "Borrow", amount: 30000000, source: "Aave", time: "5 hours ago", status: "confirmed" },
  { type: "Withdraw", amount: 15000000, source: "LP", time: "1 day ago", status: "confirmed" },
  { type: "Repayment", amount: 25000000, source: "Payroll", time: "2 days ago", status: "pending" },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export default function LiquidityPage() {
  const [role, setRole] = useState<"hr" | "employee">("hr");

  return (
    <DashboardLayout role={role} onRoleChange={setRole}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">Liquidity Management</h1>
            <p className="text-muted-foreground">
              Manage funding sources and monitor pool health.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-success/10 text-success gap-1 py-1.5">
              <Activity className="w-3 h-3" />
              Pool Healthy
            </Badge>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Liquidity"
            value="Rp 1.15B"
            change="+5.2%"
            changeType="positive"
            icon={Coins}
            iconColor="primary"
          />
          <StatCard
            title="Company Funds"
            value="Rp 580M"
            icon={Landmark}
            iconColor="secondary"
          />
          <StatCard
            title="Borrowed (Aave)"
            value="Rp 350M"
            change="3.2% APY"
            changeType="neutral"
            icon={TrendingUp}
            iconColor="accent"
          />
          <StatCard
            title="Public LP"
            value="Rp 220M"
            change="8.5% APY"
            changeType="positive"
            icon={Users}
            iconColor="success"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <LiquidityCard />
          </div>
          
          {/* Pool Health */}
          <div className="card-elevated p-6">
            <h3 className="font-semibold mb-4">Pool Health</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-success/10 border border-success/20">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-success" />
                  <span className="font-medium text-success">Utilization Rate</span>
                </div>
                <p className="text-2xl font-bold">68%</p>
                <p className="text-sm text-muted-foreground">Optimal range: 60-80%</p>
              </div>
              
              <div className="p-4 rounded-xl bg-muted/50">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="font-medium">Daily Volume</span>
                </div>
                <p className="text-2xl font-bold">Rp 45M</p>
                <p className="text-sm text-muted-foreground">Average: Rp 38M</p>
              </div>

              <div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-warning" />
                  <span className="font-medium text-warning">Aave Health Factor</span>
                </div>
                <p className="text-2xl font-bold">1.85</p>
                <p className="text-sm text-muted-foreground">Safe above 1.5</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <LiquidityChart />

        {/* Recent Transactions */}
        <div className="card-elevated p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">Recent Transactions</h3>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {transactions.map((tx, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    tx.type === "Deposit" || tx.type === "Repayment" 
                      ? "bg-success/10 text-success" 
                      : "bg-warning/10 text-warning"
                  }`}>
                    <ArrowUpRight className={`w-5 h-5 ${
                      tx.type === "Withdraw" || tx.type === "Borrow" ? "rotate-180" : ""
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium">{tx.type}</p>
                    <p className="text-sm text-muted-foreground">{tx.source} • {tx.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className={`font-semibold ${
                    tx.type === "Deposit" || tx.type === "Repayment" 
                      ? "text-success" 
                      : "text-warning"
                  }`}>
                    {tx.type === "Deposit" || tx.type === "Repayment" ? "+" : "-"}
                    {formatCurrency(tx.amount)}
                  </p>
                  <Badge variant="secondary" className={
                    tx.status === "confirmed" 
                      ? "bg-success/10 text-success" 
                      : "bg-warning/10 text-warning"
                  }>
                    {tx.status}
                  </Badge>
                  <Button variant="ghost" size="icon-sm">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
