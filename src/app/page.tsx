import { DashboardLayout } from "@/components/layout/DashboardLayout";
import HRDashboard from "@/features/dashboard/HRDashboard";

export default function HomePage() {
  return (
    <DashboardLayout>
      <HRDashboard />
    </DashboardLayout>
  );
}
