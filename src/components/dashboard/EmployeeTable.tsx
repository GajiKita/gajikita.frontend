'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Eye, Edit, Shield, ShieldOff } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEmployeeListPresentation } from "@/modules/employee/presentation/hooks/useEmployeePresentation";
import { Skeleton } from "@/components/ui/skeleton";
import { EmployeeEntity } from "@/modules/employee/domain/entity/EmployeeEntity";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export function EmployeeTable() {
  const { employees, isLoading, isError, error } = useEmployeeListPresentation({
    page: 1,
    limit: 10,
  });

  if (isError) {
    return (
      <div className="card-elevated p-6">
        <div className="text-center py-8">
          <p className="text-destructive">Error loading employee data: {error?.message}</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="card-elevated overflow-hidden">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Payroll Status</h3>
          <p className="text-sm text-muted-foreground">
            Overview of employee salary advances
          </p>
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[250px]">Karyawan</TableHead>
              <TableHead>Gaji Bulanan</TableHead>
              <TableHead>Withdrawable</TableHead>
              <TableHead>Already Withdrawn</TableHead>
              <TableHead>Limit</TableHead>
              <TableHead>SBT Status</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div>
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24 mt-1" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-8" /></TableCell>
                </TableRow>
              ))
            ) : employees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No employees found
                </TableCell>
              </TableRow>
            ) : (
              employees.map((employee: EmployeeEntity, index: number) => (
                <EmployeeRow key={employee.id} employee={employee} index={index} />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

interface EmployeeRowProps {
  employee: EmployeeEntity;
  index: number;
}

const EmployeeRow = React.memo(({ employee, index }: EmployeeRowProps) => (
  <TableRow
    className="animate-fade-in"
    style={{ animationDelay: `${index * 50}ms` }}
  >
    <TableCell>
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${employee.id}`}
          />
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {employee.user_id.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{employee.user_id}</p>
          <p className="text-sm text-muted-foreground">
            {employee.position || '-'}
          </p>
        </div>
      </div>
    </TableCell>
    <TableCell className="font-medium">
      {formatCurrency(employee.base_salary || 0)}
    </TableCell>
    <TableCell className="font-medium text-success">
      {formatCurrency(employee.base_salary ? employee.base_salary * 0.3 : 0)} {/* Assuming 30% withdrawable */}
    </TableCell>
    <TableCell>
      <div className="flex items-center gap-2">
        <span className="font-medium">
          {formatCurrency(0)} {/* Placeholder for withdrawn amount */}
        </span>
        {0 > 0 && (
          <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-primary rounded-full"
              style={{
                width: `${0}%`, /* Placeholder for withdrawn percentage */
              }}
            />
          </div>
        )}
      </div>
    </TableCell>
    <TableCell>
      <Badge variant="secondary" className="font-semibold">
        30% {/* Placeholder for limit */}
      </Badge>
    </TableCell>
    <TableCell>
      <Badge
        className={cn(
          "gap-1 font-medium",
          employee.status === "active"
            ? "bg-success/10 text-success hover:bg-success/20"
            : "bg-destructive/10 text-destructive hover:bg-destructive/20"
        )}
      >
        {employee.status === "active" ? (
          <Shield className="w-3 h-3" />
        ) : (
          <ShieldOff className="w-3 h-3" />
        )}
        {employee.status === "active" ? "Active" : "Inactive"}
      </Badge>
    </TableCell>
    <TableCell>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="gap-2">
            <Eye className="w-4 h-4" />
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <Edit className="w-4 h-4" />
            Adjust Limit
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 text-destructive">
            <ShieldOff className="w-4 h-4" />
            Revoke SBT
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  </TableRow>
));
