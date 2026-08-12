'use client';

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { AuthGuard } from "@/components/Providers/AuthGuard";
import { DashboardBreadcrumb } from "@/components/DashboardBreadcrumb";
import { Menu, X } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#FAFAFA] dark:bg-[#0a0a0a] overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative w-64 bg-white dark:bg-[#111] h-full flex flex-col shadow-xl z-50">
            <button 
              className="absolute top-4 right-4 p-1 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <Sidebar />
          </div>
        </div>
      )}

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white dark:bg-[#111] md:m-2 rounded-none md:rounded-2xl border-0 md:border border-gray-200 dark:border-zinc-800 shadow-sm relative">
        {/* Mobile Header (Only visible on small screens) */}
        <div className="md:hidden flex items-center px-4 py-3 border-b border-gray-100 dark:border-zinc-800 bg-white dark:bg-[#111]">
          <button onClick={() => setIsMobileMenuOpen(true)} className="mr-3 text-gray-500">
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-semibold text-lg">Task Management</span>
        </div>

        <div className="hidden md:block">
          <DashboardBreadcrumb />
        </div>
        
        <div className="flex-1 overflow-hidden flex flex-col relative">
          <AuthGuard>{children}</AuthGuard>
        </div>
      </main>
    </div>
  );
}
