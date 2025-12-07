import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Building2, Landmark, Users, TrendingUp, Plus, ArrowDownToLine, Link2 } from "lucide-react";

const liquiditySources = [
  {
    id: "company",
    title: "Company Pool",
    amount: 580000000,
    icon: Building2,
    color: "primary",
    description: "Direct company contribution",
  },
  {
    id: "aave",
    title: "Aave Market",
    amount: 350000000,
    icon: Landmark,
    color: "accent",
    description: "DeFi borrowed liquidity",
    apy: "3.2%",
  },
  {
    id: "crowdfund",
    title: "Public LP",
    amount: 220000000,
    icon: Users,
    color: "secondary",
    description: "Crowdfunded liquidity",
    apy: "8.5%",
  },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const colorClasses = {
  primary: "bg-primary/10 text-primary border-primary/20",
  secondary: "bg-secondary/10 text-secondary border-secondary/20",
  accent: "bg-accent/10 text-accent border-accent/20",
};

export function LiquidityCard() {
  const totalLiquidity = liquiditySources.reduce((sum, source) => sum + source.amount, 0);

  return (
    <div className="card-elevated p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Liquidity Pool</h3>
          <p className="text-sm text-muted-foreground">Funding sources overview</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Total Liquidity</p>
          <p className="text-2xl font-bold text-gradient-primary">
            {formatCurrency(totalLiquidity)}
          </p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {liquiditySources.map((source, index) => (
          <div
            key={source.id}
            className={cn(
              "flex items-center gap-4 p-4 rounded-xl border transition-all hover:shadow-soft animate-slide-up",
              colorClasses[source.color as keyof typeof colorClasses]
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center bg-current/10")}>
              <source.icon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-foreground">{source.title}</p>
                {source.apy && (
                  <span className="flex items-center gap-1 text-xs font-medium text-success bg-success/10 px-2 py-0.5 rounded-full">
                    <TrendingUp className="w-3 h-3" />
                    {source.apy} APY
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{source.description}</p>
            </div>
            <p className="text-lg font-bold text-foreground">{formatCurrency(source.amount)}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Button variant="gradient" className="flex-1 gap-2">
          <Plus className="w-4 h-4" />
          Add Liquidity
        </Button>
        <Button variant="outline" className="flex-1 gap-2">
          <ArrowDownToLine className="w-4 h-4" />
          Withdraw
        </Button>
        <Button variant="ghost" size="icon">
          <Link2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
