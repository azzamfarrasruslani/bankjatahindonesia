// src/layouts/DashboardLayout.jsx
"use client";

import Sidebar from "@/components/features/(admin)/dashboard/Sidebar";
import Navbar from "@/components/features/(admin)/dashboard/Navbar";
import Breadcrumb from "@/components/features/(admin)/dashboard/Breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }) {
  const breadcrumbItems = ["Dashboard"];

  return (
    <SidebarProvider defaultOpen>
      <Sidebar />
      <SidebarInset className="min-h-screen bg-gray-50">
        <Navbar showSidebarTrigger />
        <main className="flex-1 p-6">
          <Breadcrumb items={breadcrumbItems} />
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
