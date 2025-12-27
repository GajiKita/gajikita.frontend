'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { columns } from './SmartContractColumns';
import { useSmartContractsPresentation } from '../hooks/useSmartContractPresentation';
import { CreateSmartContractModal } from './CreateSmartContractModal';
import { useState } from 'react';

export const SmartContractsList = () => {
  const { smartContracts, isLoading, isError, error, refetch } = useSmartContractsPresentation();
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
              <CardTitle>Smart Contracts</CardTitle>
              <CardDescription>Manage smart contract metadata</CardDescription>
            </div>
            <Button onClick={() => setShowCreateForm(true)}>
              Create Smart Contract
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={smartContracts}
            isLoading={isLoading}
            onRefresh={refetch}
          />
        </CardContent>
      </Card>

      <CreateSmartContractModal
        open={showCreateForm}
        onOpenChange={setShowCreateForm}
        onSuccess={() => refetch()}
      />
    </div>
  );
};