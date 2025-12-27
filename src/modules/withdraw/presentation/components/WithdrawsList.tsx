'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { columns } from '../tables/WithdrawColumns';
import { useWithdrawsPresentation } from '../hooks/useWithdrawPresentation';
import { CreateWithdrawForm } from '../forms/CreateWithdrawForm';
import { useState } from 'react';

export const WithdrawsList = ({ employeeId }: { employeeId?: string }) => {
  const { withdraws, isLoading, isError, error, refetch } = useWithdrawsPresentation();
  const [showCreateForm, setShowCreateForm] = useState(false);

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="text-red-500 mb-4">Error loading withdrawals</div>
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
              <CardTitle>Withdraw Requests</CardTitle>
              <CardDescription>Manage your withdrawal requests</CardDescription>
            </div>
            <Button onClick={() => setShowCreateForm(true)}>
              Request Withdrawal
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={withdraws}
            isLoading={isLoading}
            onRefresh={refetch}
          />
        </CardContent>
      </Card>

      {showCreateForm && (
        <CreateWithdrawForm
          open={showCreateForm}
          onOpenChange={setShowCreateForm}
          onSuccess={() => {
            setShowCreateForm(false);
            refetch();
          }}
        />
      )}
    </div>
  );
};