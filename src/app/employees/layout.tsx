import { DashboardLayout } from '@/components/layout/DashboardLayout';

export default function EmployeesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}