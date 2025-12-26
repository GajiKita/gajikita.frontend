import { Suspense } from 'react';
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import HRDashboard from "@/features/dashboard/HRDashboard";

export default function HomePage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div className="p-8 text-center">Loading dashboard...</div>}>
        <HRDashboard />
      </Suspense>
    </DashboardLayout>
  );
}
