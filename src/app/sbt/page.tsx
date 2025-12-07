'use client';

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import SBTPage from "@/features/sbt/SBTPage";

export default function SBTEmployeePage() {
  const [role, setRole] = useState<"hr" | "employee">("employee");

  return (
    <DashboardLayout role={role} onRoleChange={setRole}>
      <SBTPage />
    </DashboardLayout>
  );
}
