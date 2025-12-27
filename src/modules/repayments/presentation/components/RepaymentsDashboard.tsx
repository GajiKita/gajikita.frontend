'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRepaymentsPresentation } from '../hooks/useRepaymentsPresentation';
import { ProcessCycleForm } from './ProcessCycleForm';
import { PreparePlatformFeeWithdrawalForm } from './PreparePlatformFeeWithdrawalForm';
import { useState } from 'react';

export const RepaymentsDashboard = () => {
  const { 
    processCycle,
    isLoading: isProcessing,
    preparePlatformFeeWithdrawal,
    isLoading: isPreparing
  } = useRepaymentsPresentation();
  
  const [showProcessForm, setShowProcessForm] = useState(false);
  const [showPrepareForm, setShowPrepareForm] = useState(false);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="space-y-1">
            <CardTitle>Repayments Management</CardTitle>
            <CardDescription>Process repayments and manage platform fees</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={() => setShowProcessForm(true)}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Process Cycle'}
            </Button>
            
            <Button 
              onClick={() => setShowPrepareForm(true)}
              variant="outline"
              disabled={isPreparing}
            >
              {isPreparing ? 'Preparing...' : 'Prepare Platform Fee Withdrawal'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {showProcessForm && (
        <ProcessCycleForm
          open={showProcessForm}
          onOpenChange={setShowProcessForm}
          onSuccess={() => {
            setShowProcessForm(false);
          }}
        />
      )}

      {showPrepareForm && (
        <PreparePlatformFeeWithdrawalForm
          open={showPrepareForm}
          onOpenChange={setShowPrepareForm}
          onSuccess={() => {
            setShowPrepareForm(false);
          }}
        />
      )}
    </div>
  );
};