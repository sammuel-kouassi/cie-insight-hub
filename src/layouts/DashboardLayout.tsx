import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Outlet } from "react-router-dom";
import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-dashboard">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-14 flex items-center justify-between border-b border-dashboard-border px-4 bg-dashboard-card">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-dashboard-card-foreground hover:text-primary" />
              <span className="text-sm font-medium text-dashboard-card-foreground/60">
                DLF — Sensibilisation
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-dashboard-card-foreground/60 hover:text-primary">
                <Bell className="w-4 h-4" />
              </Button>
              <div className="w-8 h-8 rounded-full gradient-green-orange flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
            </div>
          </header>
          {/* Content */}
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
