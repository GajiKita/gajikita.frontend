'use client';

import { useState } from 'react';
import { useInvestorsQuery } from '@/modules/investor/data/investor.query';
import { TrendingUp, Plus, Search, MoreHorizontal, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function InvestorsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: investorsData, isLoading, error } = useInvestorsQuery();

  const investors = investorsData?.data || [];

  const filteredInvestors = investors.filter(investor =>
    investor.wallet_address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Investors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-muted rounded animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Investors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Failed to load investors. Please try again.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Investors ({investors.length})
          </CardTitle>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Investor
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by wallet address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Wallet Address</TableHead>
                <TableHead>Liquidity Balance</TableHead>
                <TableHead>Withdrawn Rewards</TableHead>
                <TableHead>Preferred Token</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvestors.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex flex-col items-center gap-2">
                      <TrendingUp className="w-8 h-8 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        {searchTerm ? 'No investors found matching your search.' : 'No investors registered yet.'}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredInvestors.map((investor) => (
                  <TableRow key={investor.id}>
                    <TableCell className="font-mono text-sm">
                      <div className="flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-muted-foreground" />
                        {investor.wallet_address.slice(0, 8)}...{investor.wallet_address.slice(-6)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {investor.liquidity_balance.toLocaleString()} tokens
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {investor.withdrawn_rewards.toLocaleString()} tokens
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {investor.preferred_payout_token || '-'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={investor.deleted ? "destructive" : "default"}>
                        {investor.deleted ? 'Inactive' : 'Active'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Investor</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Remove Investor
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
