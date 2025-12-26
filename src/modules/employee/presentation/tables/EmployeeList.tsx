'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { EmployeeEntity } from '../../domain/entity/EmployeeEntity';
import { useEmployeeListPresentation } from '../hooks/useEmployeePresentation';
import { EmployeeColumns } from './EmployeeColumns';

interface EmployeeListProps {
  companyId?: string;
}

export const EmployeeList: React.FC<EmployeeListProps> = ({ companyId }) => {
  const { employees, isLoading, isError, error, refetch } = useEmployeeListPresentation({
    companyId,
    page: 1,
    limit: 10,
  });

  if (isError) {
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error?.message || 'Failed to load employees'}</span>
          <div className="mt-2">
            <Button onClick={() => refetch()}>Retry</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <DataTable
        columns={EmployeeColumns}
        data={employees}
        loading={isLoading}
        enableSearch={true}
        enableFilter={true}
        searchField="user_id"  // Use a field that exists in EmployeeEntity
      />
    </div>
  );
};