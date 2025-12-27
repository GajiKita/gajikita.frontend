'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { columns } from './PayrollCycleColumns';
import { usePayrollCyclePresentation } from '../hooks/usePayrollCyclePresentation';
import { CreatePayrollCycleModal } from './CreatePayrollCycleModal';
import { useState } from 'react';

export const PayrollCyclesList = ({ companyId }: { companyId?: string }) => {
  const { payrollCycles, isLoading, isError, error, refetch } = usePayrollCyclePresentation({
    companyId
  });
  const [showCreateForm, setShowCreateForm] = useState(false);

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="text-red-500 mb-4">Error: {error?.message}</div>
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <CardTitle>Payroll Cycles</CardTitle>
              <CardDescription>Manage your company's payroll cycles</CardDescription>
            </div>
            <Button onClick={() => setShowCreateForm(true)}>
              Create New Payroll Cycle
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={payrollCycles}
            isLoading={isLoading}
            onRefresh={refetch}
          />
        </CardContent>
      </Card>

      <CreatePayrollCycleModal
        open={showCreateForm}
        onOpenChange={setShowCreateForm}
        onSuccess={() => refetch()}
        companyId={companyId}
      />
    </div>
  );
};