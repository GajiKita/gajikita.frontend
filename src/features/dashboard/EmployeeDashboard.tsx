'use client';

import { useState } from "react";
import { BalanceCard } from "@/components/employee/BalanceCard";
import { SBTCard } from "@/components/employee/SBTCard";
import { SalaryBreakdown } from "@/components/employee/SalaryBreakdown";
import { WithdrawHistory } from "@/components/employee/WithdrawHistory";
import { WithdrawModal } from "@/components/employee/WithdrawModal";
import { Lightbulb, TrendingDown, TrendingUp, AlertTriangle } from "lucide-react";

const tips = [
  {
    icon: TrendingDown,
    title: "Limit Your Advances",
    description: "Try to keep advances below 20% to maintain financial stability.",
    color: "primary",
  },
  {
    icon: TrendingUp,
    title: "Build Emergency Fund",
    description: "Save 3-6 months of expenses for unexpected situations.",
    color: "success",
  },
  {
    icon: AlertTriangle,
    title: "Current Usage",
    description: "You've used 44% of your limit. Consider reducing next month.",
    color: "warning",
  },
];

export default function EmployeeDashboard() {
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Selamat Pagi, Ahmad! 👋</h1>
        <p className="text-muted-foreground">
          Here's your salary overview for January 2024.
        </p>
      </div>

      {/* Main Balance Card */}
      <BalanceCard onWithdraw={() => setWithdrawOpen(true)} />

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <SalaryBreakdown />
          <WithdrawHistory />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* SBT Card */}
          <SBTCard />

          {/* Financial Tips */}
          <div className="card-elevated p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-warning" />
              <h3 className="font-semibold">Financial Tips</h3>
            </div>
            <div className="space-y-4">
              {tips.map((tip, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center bg-${tip.color}/10 text-${tip.color}`}
                  >
                    <tip.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{tip.title}</p>
                    <p className="text-xs text-muted-foreground">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Withdraw Modal */}
      <WithdrawModal open={withdrawOpen} onOpenChange={setWithdrawOpen} />
    </div>
  );
}
