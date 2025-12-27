import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCreateWithdrawPresentation } from '../hooks/useWithdrawPresentation';

const withdrawSchema = z.object({
  employee_id: z.string().uuid(),
  payroll_cycle_id: z.string().uuid(),
  requested_amount: z.number().positive(),
});

type WithdrawSchema = z.infer<typeof withdrawSchema>;

interface CreateWithdrawFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export const CreateWithdrawForm = ({ open, onOpenChange, onSuccess }: CreateWithdrawFormProps) => {
  const { createWithdrawRequest, isLoading, isError, error } = useCreateWithdrawPresentation();
  
  const form = useForm<WithdrawSchema>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: {
      employee_id: '',
      payroll_cycle_id: '',
      requested_amount: 0,
    },
  });

  const onSubmit = (data: WithdrawSchema) => {
    createWithdrawRequest(data, {
      onSuccess: () => {
        onSuccess();
        form.reset();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request Withdrawal</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="employee_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee ID</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="payroll_cycle_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payroll Cycle ID</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="requested_amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requested Amount</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field} 
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {isError && <div className="text-red-500">{error?.message}</div>}
            
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit Request'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};