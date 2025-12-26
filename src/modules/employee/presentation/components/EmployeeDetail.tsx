'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  useEmployeeDetailPresentation 
} from '@/modules/employee/presentation/hooks/useEmployeePresentation';
import { Skeleton } from '@/components/ui/skeleton';

export const EmployeeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { employee, isLoading, isError, error } = useEmployeeDetailPresentation(id);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-1/3" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/4" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error?.message || 'Failed to load employee'}</span>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="p-4">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Not Found! </strong>
          <span className="block sm:inline">Employee not found</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{employee.user_id}</h1>
          <p className="text-muted-foreground">{employee.wallet_address}</p>
        </div>
        <Button variant="outline">Edit Employee</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Basic details about the employee</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Position</h4>
              <p>{employee.position || '-'}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Employee Number</h4>
              <p>{employee.employee_number || '-'}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
              <Badge 
                variant={employee.status === 'active' ? 'default' : 'secondary'}
                className="capitalize"
              >
                {employee.status}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Financial Information</CardTitle>
            <CardDescription>Salary and compensation details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Base Salary</h4>
              <p>${employee.base_salary?.toLocaleString() || 'N/A'}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Preferred Payout Token</h4>
              <p>{employee.preferred_payout_token || 'N/A'}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
            <CardDescription>Employee bio and additional information</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{employee.employee_number || 'No additional information provided'}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};