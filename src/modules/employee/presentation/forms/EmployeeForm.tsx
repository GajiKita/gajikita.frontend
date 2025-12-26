'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { EmployeeEntity } from '../../domain/entity/EmployeeEntity';
import { useCreateEmployeePresentation, useUpdateEmployeePresentation } from '../hooks/useEmployeePresentation';

const employeeFormSchema = z.object({
  user_id: z.string().min(2, { message: 'User ID must be at least 2 characters.' }),
  wallet_address: z.string().min(10, { message: 'Wallet address must be at least 10 characters.' }),
  position: z.string().optional(),
  employee_number: z.string().optional(),
  base_salary: z.string().optional(),
  status: z.enum(['active', 'inactive'], {
    required_error: 'Please select a status.'
  }),
  sbt_token_id: z.string().optional(),
});

type EmployeeFormValues = z.infer<typeof employeeFormSchema>;

interface EmployeeFormProps {
  employee?: EmployeeEntity;
  companyId?: string; // Required for creating new employees
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({
  employee,
  companyId,
  onSuccess,
  onCancel
}) => {
  const isEditing = !!employee;
  const { createEmployee, isLoading: isCreating } = useCreateEmployeePresentation();
  const { updateEmployee, isLoading: isUpdating } = useUpdateEmployeePresentation();
  
  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      user_id: employee?.user_id || '',
      wallet_address: employee?.wallet_address || '',
      position: employee?.position || '',
      employee_number: employee?.employee_number || '',
      base_salary: employee?.base_salary?.toString() || '',
      status: employee?.status as "active" | "inactive" || 'active',
      sbt_token_id: employee?.sbt_token_id || '',
    },
  });

  const onSubmit = (data: EmployeeFormValues) => {
    if (isEditing) {
      // Map form data to UpdateEmployeeRequest
      const updateData = {
        id: employee.id,
        user_id: data.user_id,
        position: data.position,
        employee_number: data.employee_number,
        base_salary: data.base_salary ? parseInt(data.base_salary) : undefined,
        wallet_address: data.wallet_address,
        status: data.status,
        sbt_token_id: data.sbt_token_id,
      };

      updateEmployee(updateData, {
        onSuccess: () => {
          onSuccess?.();
        },
      });
    } else {
      // Map form data to CreateEmployeeRequest
      // Note: company_id and other required fields would need to be provided separately
      const createData = {
        user_id: data.user_id,
        company_id: companyId || "", // Pass company ID as prop
        position: data.position,
        employee_number: data.employee_number,
        base_salary: data.base_salary ? parseInt(data.base_salary) : 0,
        wallet_address: data.wallet_address,
        status: data.status,
        sbt_token_id: data.sbt_token_id,
      };

      createEmployee(createData, {
        onSuccess: () => {
          onSuccess?.();
          form.reset();
        },
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="user_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User ID</FormLabel>
                <FormControl>
                  <Input placeholder="user123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="wallet_address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wallet Address</FormLabel>
                <FormControl>
                  <Input placeholder="0x..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input placeholder="Software Engineer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="employee_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employee Number</FormLabel>
                <FormControl>
                  <Input placeholder="EMP001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="base_salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Base Salary</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="5000000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sbt_token_id"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>SBT Token ID</FormLabel>
                <FormControl>
                  <Input
                    placeholder="SBT token ID if applicable"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button 
            type="submit" 
            disabled={isCreating || isUpdating}
          >
            {isCreating || isUpdating ? 'Saving...' : isEditing ? 'Update Employee' : 'Create Employee'}
          </Button>
        </div>
      </form>
    </Form>
  );
};