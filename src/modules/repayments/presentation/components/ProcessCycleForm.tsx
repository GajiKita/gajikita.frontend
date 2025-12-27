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

const processCycleSchema = z.object({
  cycleId: z.string().min(1, { message: 'Cycle ID is required' }),
});

type ProcessCycleFormData = z.infer<typeof processCycleSchema>;

interface ProcessCycleFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export const ProcessCycleForm = ({ open, onOpenChange, onSuccess }: ProcessCycleFormProps) => {
  const { processCycle, isLoading, isError, error } = useRepaymentsPresentation();

  const form = useForm<ProcessCycleFormData>({
    resolver: zodResolver(processCycleSchema),
    defaultValues: {
      cycleId: '',
    },
  });

  const onSubmit = (data: ProcessCycleFormData) => {
    processCycle({ cycleId: data.cycleId }, {
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
          <DialogTitle>Process Cycle</DialogTitle>
          <DialogDescription>
            Enter the payroll cycle ID to process pending repayments.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="cycleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cycle ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter payroll cycle ID" {...field} />
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
                {isLoading ? 'Processing...' : 'Process Cycle'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
