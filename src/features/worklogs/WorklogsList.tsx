'use client';

import { useState } from 'react';
import { useWorklogsQuery } from '@/modules/worklog/data/worklog.query';
import { useEmployeesQuery } from '@/modules/employee/data/employee.query';
import { Clock, Search, MoreHorizontal, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

export function WorklogsList() {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: employeesData } = useEmployeesQuery();
  const employees = employeesData?.employees || [];

  const { data: worklogsData, isLoading, error } = useWorklogsQuery(
    { employeeId: selectedEmployeeId },
    { enabled: !!selectedEmployeeId }
  );

  const worklogs = worklogsData?.worklogs || [];

  const filteredWorklogs = worklogs.filter(worklog => {
    if (!searchTerm) return true;
    const employee = employees.find(e => e.id === worklog.employee_id);
    return employee?.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const selectedEmployee = employees.find(e => e.id === selectedEmployeeId);

  if (!selectedEmployeeId) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Worklogs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Select Employee</label>
              <Select value={selectedEmployeeId} onValueChange={setSelectedEmployeeId}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Choose an employee to view their worklogs" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.name} - {employee.position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Select an employee to view their worklogs
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Worklogs - {selectedEmployee?.name}
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
            <Clock className="w-5 h-5" />
            Worklogs - {selectedEmployee?.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Failed to load worklogs. Please try again.
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
            <Clock className="w-5 h-5" />
            Worklogs - {selectedEmployee?.name}
          </CardTitle>
          <Button
            variant="outline"
            onClick={() => setSelectedEmployeeId('')}
            className="gap-2"
          >
            Change Employee
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search worklogs..."
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
                <TableHead>Date</TableHead>
                <TableHead>Hours Worked</TableHead>
                <TableHead>Payroll Cycle</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Approved By</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWorklogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex flex-col items-center gap-2">
                      <Clock className="w-8 h-8 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        {searchTerm ? 'No worklogs found matching your search.' : 'No worklogs recorded yet.'}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredWorklogs.map((worklog) => (
                  <TableRow key={worklog.id}>
                    <TableCell>
                      {new Date(worklog.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {worklog.hours_worked} hours
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {worklog.payroll_cycle_id.slice(0, 8)}...
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {worklog.approved ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <Badge variant="default">Approved</Badge>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-yellow-500" />
                            <Badge variant="secondary">Pending</Badge>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {worklog.approved_by ? (
                        <span className="text-sm text-muted-foreground">
                          {worklog.approved_by.slice(0, 8)}...
                        </span>
                      ) : (
                        '-'
                      )}
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
                          <DropdownMenuItem>Edit Worklog</DropdownMenuItem>
                          {!worklog.approved && (
                            <DropdownMenuItem className="text-green-600">
                              Approve
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-destructive">
                            Delete Worklog
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
