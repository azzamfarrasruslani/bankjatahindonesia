// src/layouts/DashboardLayout.jsx
"use client";

import Sidebar from "@/features/dashboard/components/Sidebar";
import Navbar from "@/features/dashboard/components/Navbar";
import Breadcrumb from "@/features/dashboard/components/Breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: any) {
  const breadcrumbItems = ["Dashboard"];

  return (
    <SidebarProvider defaultOpen>
      <Sidebar />
      <SidebarInset className="min-h-screen bg-gray-50">
        <Navbar showSidebarTrigger />
        <main className="flex-1 p-6">
          <Breadcrumb />
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
