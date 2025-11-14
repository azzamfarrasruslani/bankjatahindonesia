// src/layouts/DashboardLayout.jsx
"use client";

import Sidebar from "@/components/features/(admin)/dashboard/Sidebar";
import Navbar from "@/components/features/(admin)/dashboard/Navbar";
import Breadcrumb from "@/components/features/(admin)/dashboard/Breadcrumb";

export default function DashboardLayout({ children }) {
  const breadcrumbItems = ["Dashboard"];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 ml-64">
          <Breadcrumb items={breadcrumbItems} />
          {children}
        </main>
      </div>
    </div>
  );
}
