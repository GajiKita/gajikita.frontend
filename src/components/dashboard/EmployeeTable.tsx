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

const employees = [
  {
    id: 1,
    name: "Ahmad Rizki",
    position: "Software Engineer",
    salary: 15000000,
    withdrawable: 4500000,
    withdrawn: 2000000,
    limit: 30,
    sbtStatus: "active",
    avatar: "ahmad",
  },
  {
    id: 2,
    name: "Sarah Putri",
    position: "Product Manager",
    salary: 18000000,
    withdrawable: 5400000,
    withdrawn: 0,
    limit: 30,
    sbtStatus: "active",
    avatar: "sarah",
  },
  {
    id: 3,
    name: "Budi Santoso",
    position: "UI/UX Designer",
    salary: 12000000,
    withdrawable: 3600000,
    withdrawn: 3600000,
    limit: 30,
    sbtStatus: "active",
    avatar: "budi",
  },
  {
    id: 4,
    name: "Diana Sari",
    position: "Data Analyst",
    salary: 14000000,
    withdrawable: 4200000,
    withdrawn: 1500000,
    limit: 30,
    sbtStatus: "revoked",
    avatar: "diana",
  },
  {
    id: 5,
    name: "Eko Prasetyo",
    position: "DevOps Engineer",
    salary: 16000000,
    withdrawable: 4800000,
    withdrawn: 500000,
    limit: 30,
    sbtStatus: "active",
    avatar: "eko",
  },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export function EmployeeTable() {
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
            {employees.map((employee, index) => (
              <TableRow
                key={employee.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${employee.avatar}`}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {employee.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{employee.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {employee.position}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  {formatCurrency(employee.salary)}
                </TableCell>
                <TableCell className="font-medium text-success">
                  {formatCurrency(employee.withdrawable)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {formatCurrency(employee.withdrawn)}
                    </span>
                    {employee.withdrawn > 0 && (
                      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-primary rounded-full"
                          style={{
                            width: `${(employee.withdrawn / employee.withdrawable) * 100}%`,
                          }}
                        />
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="font-semibold">
                    {employee.limit}%
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      "gap-1 font-medium",
                      employee.sbtStatus === "active"
                        ? "bg-success/10 text-success hover:bg-success/20"
                        : "bg-destructive/10 text-destructive hover:bg-destructive/20"
                    )}
                  >
                    {employee.sbtStatus === "active" ? (
                      <Shield className="w-3 h-3" />
                    ) : (
                      <ShieldOff className="w-3 h-3" />
                    )}
                    {employee.sbtStatus === "active" ? "Active" : "Revoked"}
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
