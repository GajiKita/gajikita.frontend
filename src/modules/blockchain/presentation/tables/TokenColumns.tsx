import { ColumnDef } from '@tanstack/react-table';
import { TokenEntity } from '../../domain/entity/TokenEntity';

export const columns: ColumnDef<TokenEntity>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'symbol',
    header: 'Symbol',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'chain_id',
    header: 'Chain ID',
  },
  {
    accessorKey: 'decimals',
    header: 'Decimals',
  },
  {
    accessorKey: 'is_active',
    header: 'Active',
    cell: ({ row }) => {
      const isActive = row.original.is_active;
      return (
        <span className={isActive ? 'text-green-500' : 'text-red-500'}>
          {isActive ? 'Yes' : 'No'}
        </span>
      );
    },
  },
];