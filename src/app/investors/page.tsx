import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { InvestorsList } from "@/features/investors/InvestorsList";

export default function InvestorsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Investors</h1>
            <p className="text-muted-foreground">
              Manage investor accounts and liquidity pools
            </p>
          </div>
        </div>
        <InvestorsList />
      </div>
    </DashboardLayout>
  );
}
