'use client';

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import HRDashboard from "@/features/dashboard/HRDashboard";
import EmployeeDashboard from "@/features/dashboard/EmployeeDashboard";

export default function HomePage() {
  const [role, setRole] = useState<"hr" | "employee">("hr");

  return (
    <DashboardLayout role={role} onRoleChange={setRole}>
      {role === "hr" ? <HRDashboard /> : <EmployeeDashboard />}
    </DashboardLayout>
  );
}
