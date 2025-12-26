'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PayrollCycleEntity } from '../../domain/entity/PayrollCycleEntity';
import { format } from 'date-fns';

interface PayrollCycleListProps {
  payrollCycles: PayrollCycleEntity[];
  onEdit?: (payrollCycle: PayrollCycleEntity) => void;
  onDelete?: (id: string) => void;
  loading?: boolean;
}

export function PayrollCycleList({ payrollCycles, onEdit, onDelete, loading }: PayrollCycleListProps) {
  if (loading) {
    return <div>Loading payroll cycles...</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Company ID</TableHead>
            <TableHead>Period</TableHead>
            <TableHead>Payout Date</TableHead>
            <TableHead>Working Days</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payrollCycles.map((payrollCycle) => (
            <TableRow key={payrollCycle.id}>
              <TableCell className="font-medium">{payrollCycle.id.substring(0, 8)}...</TableCell>
              <TableCell>{payrollCycle.company_id.substring(0, 8)}...</TableCell>
              <TableCell>
                {format(new Date(payrollCycle.period_start), 'MMM dd, yyyy')} - {format(new Date(payrollCycle.period_end), 'MMM dd, yyyy')}
              </TableCell>
              <TableCell>{format(new Date(payrollCycle.payout_date), 'MMM dd, yyyy')}</TableCell>
              <TableCell>{payrollCycle.total_working_days}</TableCell>
              <TableCell>
                <Badge variant={payrollCycle.deleted ? 'destructive' : 'default'}>
                  {payrollCycle.deleted ? 'Deleted' : 'Active'}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {onEdit && (
                    <button 
                      onClick={() => onEdit(payrollCycle)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                  )}
                  {onDelete && !payrollCycle.deleted && (
                    <button 
                      onClick={() => onDelete(payrollCycle.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}