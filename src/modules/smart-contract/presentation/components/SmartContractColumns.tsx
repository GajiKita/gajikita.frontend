import { ColumnDef } from '@tanstack/react-table';
import { SmartContractEntity } from '../../domain/entity/SmartContractEntity';

export const columns: ColumnDef<SmartContractEntity>[] = [
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
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'contract_address',
    header: 'Contract Address',
    cell: ({ row }) => {
      const address = row.getValue('contract_address') as string;
      return (
        <span className="font-mono text-sm">
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
      );
    },
  },
  {
    accessorKey: 'chain_id',
    header: 'Chain ID',
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
