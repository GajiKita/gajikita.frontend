import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, CheckCircle2, Clock, ArrowDownCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const history = [
  {
    id: 1,
    amount: 1000000,
    fee: 25000,
    date: "2024-01-15",
    status: "completed",
    txHash: "0x1a2b...3c4d",
  },
  {
    id: 2,
    amount: 500000,
    fee: 12500,
    date: "2024-01-10",
    status: "completed",
    txHash: "0x5e6f...7g8h",
  },
  {
    id: 3,
    amount: 500000,
    fee: 12500,
    date: "2024-01-05",
    status: "pending",
    txHash: "0x9i0j...1k2l",
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

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export function WithdrawHistory() {
  return (
    <div className="card-elevated p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Withdraw History</h3>
          <p className="text-sm text-muted-foreground">Recent salary advances</p>
        </div>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {history.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center",
                item.status === "completed"
                  ? "bg-success/10 text-success"
                  : "bg-warning/10 text-warning"
              )}
            >
              <ArrowDownCircle className="w-5 h-5" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold">{formatCurrency(item.amount)}</p>
                <Badge
                  variant="secondary"
                  className={cn(
                    "text-xs",
                    item.status === "completed"
                      ? "bg-success/10 text-success"
                      : "bg-warning/10 text-warning"
                  )}
                >
                  {item.status === "completed" ? (
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                  ) : (
                    <Clock className="w-3 h-3 mr-1" />
                  )}
                  {item.status === "completed" ? "Completed" : "Pending"}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{formatDate(item.date)}</span>
                <span>•</span>
                <span>Fee: {formatCurrency(item.fee)}</span>
              </div>
            </div>

            <Button variant="ghost" size="icon-sm" className="text-muted-foreground">
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
