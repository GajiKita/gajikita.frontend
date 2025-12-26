'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { EmployeeList } from '@/modules/employee/presentation/tables/EmployeeList';
import { EmployeeForm } from '@/modules/employee/presentation/forms/EmployeeForm';
import { EmployeeEntity } from '@/modules/employee/domain/entity/EmployeeEntity';

export const EmployeeManagement: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<EmployeeEntity | null>(null);

  const handleOpenDialog = (employee?: EmployeeEntity) => {
    setEditingEmployee(employee || null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingEmployee(null);
  };

  const handleSuccess = () => {
    handleCloseDialog();
    // In a real app, you might want to refetch the data here
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Employee Management</h1>
          <p className="text-muted-foreground">
            Manage your employees and their information
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          Add Employee
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Employees</CardTitle>
          <CardDescription>
            View and manage all employees in your organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmployeeList />
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingEmployee ? 'Edit Employee' : 'Create New Employee'}
            </DialogTitle>
          </DialogHeader>
          <EmployeeForm 
            employee={editingEmployee || undefined} 
            onSuccess={handleSuccess}
            onCancel={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};