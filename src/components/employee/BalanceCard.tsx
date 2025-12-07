import { Button } from "@/components/ui/button";
import { Wallet, TrendingUp, Calendar, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface BalanceCardProps {
  onWithdraw: () => void;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export function BalanceCard({ onWithdraw }: BalanceCardProps) {
  const earnedSalary = 9000000; // 15 days * 600k daily
  const withdrawable = 4500000; // 30% of earned
  const withdrawn = 2000000;
  const remaining = withdrawable - withdrawn;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-8 text-primary-foreground">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/20 blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/20 blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-white/70">Total Earned This Month</p>
              <p className="text-3xl font-bold">{formatCurrency(earnedSalary)}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-sm text-white/70">
              <Calendar className="w-4 h-4" />
              15 days worked
            </div>
          </div>
        </div>

        {/* Withdrawable Balance */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-white/70 mb-1">Available to Withdraw</p>
              <p className="text-4xl font-bold">{formatCurrency(remaining)}</p>
            </div>
            <Button
              onClick={onWithdraw}
              className="bg-white text-primary hover:bg-white/90 shadow-xl gap-2 h-12 px-6"
            >
              <Zap className="w-5 h-5" />
              Withdraw Now
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">Used: {formatCurrency(withdrawn)}</span>
              <span className="text-white/70">Limit: {formatCurrency(withdrawable)}</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${(withdrawn / withdrawable) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <p className="text-2xl font-bold">{formatCurrency(600000)}</p>
            <p className="text-xs text-white/70">Daily Rate</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <p className="text-2xl font-bold">30%</p>
            <p className="text-xs text-white/70">Withdraw Limit</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-1 text-2xl font-bold">
              <TrendingUp className="w-5 h-5" />
              2.5%
            </div>
            <p className="text-xs text-white/70">Fee Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}
