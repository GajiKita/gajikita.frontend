'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/date-picker';
import { useCreatePayrollCyclePresentation } from '../hooks/usePayrollCyclePresentation';
import { PayrollCycleEntity } from '../../domain/entity/PayrollCycleEntity';

const formSchema = z.object({
  company_id: z.string().min(1, { message: 'Company ID is required' }),
  period_start: z.string().min(1, { message: 'Period start is required' }),
  period_end: z.string().min(1, { message: 'Period end is required' }),
  payout_date: z.string().min(1, { message: 'Payout date is required' }),
  total_working_days: z.number().min(1, { message: 'Total working days must be at least 1' }),
});

interface CreatePayrollCycleFormProps {
  companyId?: string;
  onSuccess?: (payrollCycle: PayrollCycleEntity) => void;
  onCancel?: () => void;
}

export function CreatePayrollCycleForm({ companyId, onSuccess, onCancel }: CreatePayrollCycleFormProps) {
  const { createPayrollCycle, isLoading, isError, error } = useCreatePayrollCyclePresentation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_id: companyId || '',
      period_start: '',
      period_end: '',
      payout_date: '',
      total_working_days: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createPayrollCycle(values, {
      onSuccess: (data) => {
        if (onSuccess) onSuccess(data.data);
        form.reset();
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="company_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter company ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="period_start"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Period Start</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="period_end"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Period End</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="payout_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payout Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="total_working_days"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Working Days</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  {...field} 
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isError && (
          <div className="text-red-500">
            Error: {error?.message}
          </div>
        )}

        <div className="flex space-x-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Payroll Cycle'}
          </Button>
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}