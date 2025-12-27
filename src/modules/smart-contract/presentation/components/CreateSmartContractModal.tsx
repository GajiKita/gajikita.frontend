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
import { Textarea } from '@/components/ui/textarea';
import { useCreateSmartContractPresentation } from '../hooks/useSmartContractPresentation';

const createSmartContractSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  contract_address: z.string().min(1, { message: 'Contract address is required' }),
  chain_id: z.number().min(1, { message: 'Chain ID must be at least 1' }),
  abi: z.string().min(1, { message: 'ABI is required' }),
});

type CreateSmartContractFormData = z.infer<typeof createSmartContractSchema>;

interface CreateSmartContractModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CreateSmartContractModal({
  open,
  onOpenChange,
  onSuccess,
}: CreateSmartContractModalProps) {
  const { createSmartContract, isLoading, isError, error } = useCreateSmartContractPresentation();

  const form = useForm<CreateSmartContractFormData>({
    resolver: zodResolver(createSmartContractSchema),
    defaultValues: {
      name: '',
      contract_address: '',
      chain_id: 0,
      abi: '',
    },
  });

  const onSubmit = (data: CreateSmartContractFormData) => {
    const requestData = {
      ...data,
      abi: JSON.parse(data.abi), // Parse ABI string to JSON
    };

    createSmartContract(requestData, {
      onSuccess: () => {
        onOpenChange(false);
        onSuccess?.();
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
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Smart Contract</DialogTitle>
          <DialogDescription>
            Add metadata for a new smart contract to the system.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter contract name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contract_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contract Address</FormLabel>
                  <FormControl>
                    <Input placeholder="0x..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="chain_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chain ID</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter chain ID"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="abi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ABI (JSON)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter contract ABI as JSON"
                      className="min-h-[200px]"
                      {...field}
                    />
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
                {isLoading ? 'Creating...' : 'Create Contract'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
