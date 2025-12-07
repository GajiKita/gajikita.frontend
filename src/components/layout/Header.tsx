import { Bell, Search, Plus, Download, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  role: "hr" | "employee";
}

export function Header({ role }: HeaderProps) {
  return (
    <header className="h-20 bg-card/80 backdrop-blur-xl border-b border-border sticky top-0 z-30 px-6 flex items-center justify-between gap-4">
      {/* Left Section - Search */}
      <div className="flex-1 max-w-md pl-12 lg:pl-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search employees, transactions..."
            className="pl-10 h-11 bg-muted/50 border-0 focus-visible:ring-2 focus-visible:ring-primary/20 rounded-xl"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Quick Actions - HR Only */}
        {role === "hr" && (
          <div className="hidden md:flex items-center gap-2">
            <Button variant="soft" size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Tambah Karyawan
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        )}

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="font-semibold">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                    Withdraw
                  </Badge>
                  <span className="text-xs text-muted-foreground">2 min ago</span>
                </div>
                <p className="text-sm">Ahmad Rizki requested salary advance of Rp 2.500.000</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-success/10 text-success text-xs">
                    Repayment
                  </Badge>
                  <span className="text-xs text-muted-foreground">1 hour ago</span>
                </div>
                <p className="text-sm">Payroll cycle completed. 45 employees paid.</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-warning/10 text-warning text-xs">
                    Alert
                  </Badge>
                  <span className="text-xs text-muted-foreground">3 hours ago</span>
                </div>
                <p className="text-sm">Liquidity pool running low. Consider adding funds.</p>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted transition-colors">
              <Avatar className="h-9 w-9 ring-2 ring-primary/20">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=company" />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground text-sm font-bold">
                  PT
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold">
                  {role === "hr" ? "PT. TechIndo Global" : "Ahmad Rizki"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {role === "hr" ? "HR Administrator" : "Software Engineer"}
                </p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive gap-2">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
