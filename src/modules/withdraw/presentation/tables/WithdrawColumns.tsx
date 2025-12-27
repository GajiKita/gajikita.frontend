import { ColumnDef } from '@tanstack/react-table';
import { WithdrawRequestEntity } from '../../domain/entity/WithdrawRequestEntity';

export const columns: ColumnDef<WithdrawRequestEntity>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'employee_id',
    header: 'Employee ID',
  },
  {
    accessorKey: 'payroll_cycle_id',
    header: 'Payroll Cycle ID',
  },
  {
    accessorKey: 'requested_amount',
    header: 'Requested Amount',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('requested_amount'));
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(amount);
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      const statusColors = {
        PENDING: 'bg-yellow-500',
        APPROVED: 'bg-green-500',
        REJECTED: 'bg-red-500',
        EXECUTED: 'bg-blue-500',
      };
      
      return (
        <span className={`px-2 py-1 rounded-full text-xs text-white ${statusColors[status as keyof typeof statusColors] || 'bg-gray-500'}`}>
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: 'created_at',
    header: 'Created At',
    cell: ({ row }) => {
      const date = new Date(row.getValue('created_at'));
      return date.toLocaleDateString();
    },
  },
];