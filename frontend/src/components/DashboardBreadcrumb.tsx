'use client';

import { usePathname } from "next/navigation";
import { PanelLeft, ChevronRight } from "lucide-react";
import { useTaskStore } from "@/store/useTaskStore";

export function DashboardBreadcrumb() {
  const pathname = usePathname();
  const { tasks } = useTaskStore();

  let breadcrumbs = [];

  if (pathname === '/dashboard/projects') {
    breadcrumbs = ['Projects'];
  } else if (pathname === '/dashboard') {
    breadcrumbs = ['Tasks'];
  } else if (pathname.startsWith('/dashboard/tasks/')) {
    const taskId = pathname.split('/').pop();
    const task = tasks.find(t => t.id === taskId);
    breadcrumbs = ['Tasks', task?.title || 'Loading...'];
  } else {
    breadcrumbs = ['App'];
  }

  return (
    <div className="flex items-center gap-4 px-4 py-3 border-b border-gray-100 dark:border-zinc-800 bg-white dark:bg-[#111]">
      <button className="text-gray-500 hover:text-black dark:hover:text-white transition-colors">
        <PanelLeft className="w-4 h-4" />
      </button>
      
      <div className="w-px h-4 bg-gray-200 dark:bg-zinc-800" />
      
      <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
        {breadcrumbs.map((crumb, idx) => (
          <div key={crumb} className="flex items-center gap-2">
            <span className={idx === breadcrumbs.length - 1 ? 'text-gray-900 dark:text-white' : ''}>
              {crumb}
            </span>
            {idx < breadcrumbs.length - 1 && (
              <ChevronRight className="w-3.5 h-3.5" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
