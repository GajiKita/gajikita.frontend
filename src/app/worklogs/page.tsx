import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { WorklogsList } from "@/features/worklogs/WorklogsList";

export default function WorklogsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Worklogs</h1>
            <p className="text-muted-foreground">
              Track and approve employee work hours
            </p>
          </div>
        </div>
        <WorklogsList />
      </div>
    </DashboardLayout>
  );
}
