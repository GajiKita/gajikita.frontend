'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Wallet,
  FileText,
  Settings,
  Building2,
  CreditCard,
  TrendingUp,
  Shield,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  role: "hr" | "employee";
  onRoleChange: (role: "hr" | "employee") => void;
}

const hrNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Users, label: "Karyawan", path: "/employees" },
  { icon: Wallet, label: "Liquidity", path: "/liquidity" },
  { icon: TrendingUp, label: "Analytics", path: "/analytics" },
  { icon: CreditCard, label: "Payroll Setup", path: "/payroll" },
  { icon: Shield, label: "Compliance", path: "/compliance" },
];

const employeeNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Wallet, label: "Withdraw", path: "/withdraw" },
  { icon: FileText, label: "History", path: "/history" },
  { icon: CreditCard, label: "SBT Card", path: "/sbt" },
];

export function Sidebar({ role, onRoleChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname() ?? "/";

  const navItems = role === "hr" ? hrNavItems : employeeNavItems;

  return (
    <>
      {/* Mobile Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen bg-sidebar z-50 transition-all duration-300 flex flex-col",
          collapsed ? "w-20" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div className="animate-fade-in">
                <h1 className="text-xl font-bold text-sidebar-foreground">GajiKita</h1>
                <p className="text-xs text-sidebar-foreground/60">Salary Advance</p>
              </div>
            )}
          </div>
        </div>

        {/* Role Switcher */}
        <div className="px-4 py-4 border-b border-sidebar-border">
          <button
            onClick={() => onRoleChange(role === "hr" ? "employee" : "hr")}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
              "bg-sidebar-accent hover:bg-sidebar-accent/80"
            )}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              {role === "hr" ? (
                <Building2 className="w-4 h-4 text-primary-foreground" />
              ) : (
                <Users className="w-4 h-4 text-primary-foreground" />
              )}
            </div>
            {!collapsed && (
              <>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-sidebar-foreground">
                    {role === "hr" ? "HR Admin" : "Karyawan"}
                  </p>
                  <p className="text-xs text-sidebar-foreground/60">Switch Role</p>
                </div>
                <ChevronDown className="w-4 h-4 text-sidebar-foreground/60" />
              </>
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-glow"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 transition-transform duration-200",
                    isActive ? "" : "group-hover:scale-110"
                  )}
                />
                {!collapsed && <span className="font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-sidebar-border">
          <Link
            href="/settings"
            className={cn(
              "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200",
              "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            )}
          >
            <Settings className="w-5 h-5" />
            {!collapsed && <span className="font-medium">Settings</span>}
          </Link>
          <button
            className={cn(
              "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 mt-2",
              "text-destructive/80 hover:bg-destructive/10 hover:text-destructive"
            )}
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>

        {/* Collapse Toggle - Desktop Only */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-3 top-24 w-6 h-6 items-center justify-center bg-card border border-border rounded-full shadow-elevated hover:shadow-floating transition-all"
        >
          <ChevronDown
            className={cn(
              "w-4 h-4 text-muted-foreground transition-transform",
              collapsed ? "-rotate-90" : "rotate-90"
            )}
          />
        </button>
      </aside>
    </>
  );
}
