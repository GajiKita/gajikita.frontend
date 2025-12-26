'use client';

import { ColumnDef } from '@tanstack/react-table';
import { EmployeeEntity } from '../../domain/entity/EmployeeEntity';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/data-table/data-table-column-header';
import { DataTableRowActions } from '@/components/ui/data-table/data-table-row-actions';

export const EmployeeColumns: ColumnDef<EmployeeEntity>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    cell: ({ row }) => (
      <div className="w-24 truncate">
        {row.getValue('id') as string}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'user_id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="User ID" />,
    cell: ({ row }) => <div className="font-medium">{row.original.user_id}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'wallet_address',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Wallet Address" />,
    cell: ({ row }) => <div className="lowercase">{row.original.wallet_address}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'position',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Position" />,
    cell: ({ row }) => <div>{row.original.position || '-'}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => (
      <Badge 
        variant={row.original.status === 'active' ? 'default' : 'secondary'}
        className="capitalize"
      >
        {row.original.status}
      </Badge>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];