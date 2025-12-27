'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { columns } from '../tables/TokenColumns';
import { useSupportedTokensPresentation } from '../hooks/useBlockchainPresentation';
import { SyncTokensForm } from '../forms/SyncTokensForm';
import { useState } from 'react';

export const SupportedTokensList = () => {
  const { tokens, isLoading, isError, error, refetch } = useSupportedTokensPresentation();
  const [showSyncForm, setShowSyncForm] = useState(false);

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
              <CardTitle>Supported Tokens</CardTitle>
              <CardDescription>Manage supported payout stablecoins</CardDescription>
            </div>
            <Button onClick={() => setShowSyncForm(true)}>
              Sync Tokens
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={tokens}
            isLoading={isLoading}
            onRefresh={refetch}
          />
        </CardContent>
      </Card>

      {showSyncForm && (
        <SyncTokensForm
          open={showSyncForm}
          onOpenChange={setShowSyncForm}
          onSuccess={() => {
            setShowSyncForm(false);
            refetch();
          }}
        />
      )}
    </div>
  );
};
