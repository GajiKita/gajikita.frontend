'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CreatePayrollCycleForm } from '../forms/CreatePayrollCycleForm';

interface CreatePayrollCycleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  companyId?: string;
}

export function CreatePayrollCycleModal({
  open,
  onOpenChange,
  onSuccess,
  companyId,
}: CreatePayrollCycleModalProps) {
  const handleSuccess = () => {
    onOpenChange(false);
    onSuccess?.();
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Payroll Cycle</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new payroll cycle for your company.
          </DialogDescription>
        </DialogHeader>
        <CreatePayrollCycleForm
          companyId={companyId}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}
