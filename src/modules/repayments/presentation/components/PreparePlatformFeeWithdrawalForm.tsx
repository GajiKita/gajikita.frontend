'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRepaymentsPresentation } from '../hooks/useRepaymentsPresentation';

const prepareWithdrawalSchema = z.object({
  amount: z.number().min(0.01, { message: 'Amount must be greater than 0' }),
  cid: z.string().min(1, { message: 'CID is required' }),
});

type PrepareWithdrawalFormData = z.infer<typeof prepareWithdrawalSchema>;

interface PreparePlatformFeeWithdrawalFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export const PreparePlatformFeeWithdrawalForm = ({
  open,
  onOpenChange,
  onSuccess
}: PreparePlatformFeeWithdrawalFormProps) => {
  const { preparePlatformFeeWithdrawal, isLoading, isError, error } = useRepaymentsPresentation();

  const form = useForm<PrepareWithdrawalFormData>({
    resolver: zodResolver(prepareWithdrawalSchema),
    defaultValues: {
      amount: 0,
      cid: '',
    },
  });

  const onSubmit = (data: PrepareWithdrawalFormData) => {
    preparePlatformFeeWithdrawal(data, {
      onSuccess: () => {
        onSuccess();
        form.reset();
      },
    });
  };

  const handleCancel = () => {
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Prepare Platform Fee Withdrawal</DialogTitle>
          <DialogDescription>
            Enter the amount and CID to prepare platform fee withdrawal transaction.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Enter amount"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CID (Context Identifier)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter CID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isError && (
              <div className="text-red-500 text-sm">
                Error: {error?.message}
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Preparing...' : 'Prepare Withdrawal'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
