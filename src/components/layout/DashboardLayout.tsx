import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface DashboardLayoutProps {
  children: ReactNode;
  role: "hr" | "employee";
  onRoleChange: (role: "hr" | "employee") => void;
}

export function DashboardLayout({ children, role, onRoleChange }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar role={role} onRoleChange={onRoleChange} />
      
      <div className="lg:pl-64 transition-all duration-300">
        <Header role={role} />
        
        <main className="p-6">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
