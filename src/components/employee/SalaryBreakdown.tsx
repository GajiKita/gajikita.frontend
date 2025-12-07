import { Calendar, Wallet, Clock, CreditCard } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export function SalaryBreakdown() {
  const monthlySalary = 15000000;
  const dailySalary = 600000;
  const daysWorked = 15;
  const totalDays = 25;
  const estimatedPayday = "January 31, 2024";
  const repaymentDue = 2000000;

  return (
    <div className="card-elevated p-6">
      <h3 className="text-lg font-semibold mb-6">Salary Breakdown</h3>

      <div className="space-y-6">
        {/* Monthly Salary */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Wallet className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Monthly Salary</p>
            <p className="text-xl font-bold">{formatCurrency(monthlySalary)}</p>
          </div>
        </div>

        {/* Daily Rate */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Daily Rate</p>
            <p className="text-xl font-bold">{formatCurrency(dailySalary)}</p>
          </div>
        </div>

        {/* Work Days Progress */}
        <div className="p-4 rounded-xl bg-muted/50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Work Days</span>
            </div>
            <span className="text-sm font-semibold">
              {daysWorked} / {totalDays} days
            </span>
          </div>
          <Progress value={(daysWorked / totalDays) * 100} className="h-2" />
        </div>

        {/* Estimated Payday */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Estimated Payday</p>
            <p className="text-lg font-semibold">{estimatedPayday}</p>
          </div>
        </div>

        {/* Repayment Schedule */}
        {repaymentDue > 0 && (
          <div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-warning">Repayment Due</p>
                <p className="text-xs text-muted-foreground">
                  Will be deducted from next payroll
                </p>
              </div>
              <p className="text-lg font-bold text-warning">
                {formatCurrency(repaymentDue)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
