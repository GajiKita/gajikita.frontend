import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CompaniesList } from "@/features/companies/CompaniesList";

export default function CompaniesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Companies</h1>
            <p className="text-muted-foreground">
              Manage company registrations and settings
            </p>
          </div>
        </div>
        <CompaniesList />
      </div>
    </DashboardLayout>
  );
}
