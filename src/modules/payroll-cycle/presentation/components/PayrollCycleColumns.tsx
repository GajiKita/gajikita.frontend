import { ColumnDef } from '@tanstack/react-table';
import { PayrollCycleEntity } from '../../domain/entity/PayrollCycleEntity';

export const columns: ColumnDef<PayrollCycleEntity>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => {
      const id = row.getValue('id') as string;
      return (
        <span className="font-mono text-sm">
          {id.slice(0, 8)}...
        </span>
      );
    },
  },
  {
    accessorKey: 'company_id',
    header: 'Company ID',
    cell: ({ row }) => {
      const companyId = row.getValue('company_id') as string;
      return (
        <span className="font-mono text-sm">
          {companyId.slice(0, 8)}...
        </span>
      );
    },
  },
  {
    accessorKey: 'period_start',
    header: 'Period Start',
    cell: ({ row }) => {
      const date = new Date(row.getValue('period_start'));
      return date.toLocaleDateString();
    },
  },
  {
    accessorKey: 'period_end',
    header: 'Period End',
    cell: ({ row }) => {
      const date = new Date(row.getValue('period_end'));
      return date.toLocaleDateString();
    },
  },
  {
    accessorKey: 'payout_date',
    header: 'Payout Date',
    cell: ({ row }) => {
      const date = new Date(row.getValue('payout_date'));
      return date.toLocaleDateString();
    },
  },
  {
    accessorKey: 'total_working_days',
    header: 'Working Days',
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
