'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, LayoutList, Filter, MoreHorizontal, Plus, Circle, BarChart2, Users, Calendar, Flag, Tag, Settings, Check, ChevronRight } from "lucide-react";

export default function ProjectsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<'priority' | null>('priority');

  const mockProjects = [
    { id: '1', title: 'Design Homepage', priority: 'High', lead: 'avatar', date: '12 Sep 2026' },
    { id: '2', title: 'Develop Login Feature', priority: 'Low', lead: 'CN', date: '15 Sep 2026' },
    { id: '3', title: 'Test Payment Gateway', priority: 'Medium', lead: '+', date: '18 Sep 2026' },
  ];

  const renderPriorityIcon = (priority: string) => {
    if (priority === 'Low') return <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-1.5" />;
    const color = priority === 'High' ? 'text-red-500' : 'text-orange-500';
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`mr-1.5 ${color}`}>
        <path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 4v16"/>
      </svg>
    );
  };

  const renderLead = (lead: string) => {
    if (lead === 'avatar') {
      return (
        <div className="w-6 h-6 rounded-full overflow-hidden bg-blue-500 border border-white dark:border-zinc-950 shadow-sm relative z-20">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=admin1`} alt="Lead" />
        </div>
      );
    }
    if (lead === 'CN') {
      return (
        <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-zinc-700 border border-white dark:border-zinc-950 shadow-sm flex items-center justify-center text-[9px] font-bold text-gray-600 relative z-10">
          CN
        </div>
      );
    }
    return (
      <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-zinc-800 border border-white dark:border-zinc-950 shadow-sm flex items-center justify-center text-gray-500 relative z-10">
        <span className="text-[10px]">+</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950 relative">
      {/* Top Navigation / Action Bar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-zinc-800 bg-white dark:bg-[#111]">
        <div className="flex items-center gap-4 flex-1">
          <h1 className="text-xl font-bold">Projects</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" className="h-9 w-9 border-gray-200 dark:border-zinc-800 text-gray-500">
            <Search className="w-4 h-4" />
          </Button>

          <Button variant="outline" size="sm" className="h-9 border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-gray-300 font-medium px-3 bg-gray-50 dark:bg-zinc-900 shadow-inner">
            <LayoutList className="w-4 h-4 mr-2 text-gray-400" />
            Fields
          </Button>

          <div className="relative">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-9 w-9 border-gray-200 dark:border-zinc-800 text-gray-500"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="w-4 h-4" />
            </Button>
            
            {isFilterOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsFilterOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-xl z-50 py-1 animate-in fade-in">
                  
                  <button className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-200">
                    <div className="flex items-center gap-2"><Circle className="w-4 h-4" /> Status</div>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  
                  <button 
                    onMouseEnter={() => setActiveSubmenu('priority')}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white"
                  >
                    <div className="flex items-center gap-2"><BarChart2 className="w-4 h-4" /> Priority</div>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  
                  <button className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-200">
                    <div className="flex items-center gap-2"><Users className="w-4 h-4" /> Members</div>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  
                  <button className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-200">
                    <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Due Date</div>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  
                  <button className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-200">
                    <div className="flex items-center gap-2"><Flag className="w-4 h-4" /> Teams</div>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  
                  <button className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-200">
                    <div className="flex items-center gap-2"><Tag className="w-4 h-4" /> Labels</div>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  
                  <button className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-200">
                    <div className="flex items-center gap-2"><Settings className="w-4 h-4" /> Reporter</div>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  {/* Cascading Submenu */}
                  {activeSubmenu === 'priority' && (
                    <div 
                      className="absolute right-full top-6 mr-1 w-44 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-xl py-1 animate-in fade-in"
                      onMouseLeave={() => setActiveSubmenu(null)}
                    >
                      <div className="px-3 py-2 text-xs font-semibold text-gray-400">Priority</div>
                      <button className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-600">
                        <div className="w-1 h-1 rounded-full bg-gray-400 ml-1" /> No Priority
                      </button>
                      <button className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-zinc-800 text-red-500 font-medium">
                        <div className="flex items-center gap-2">
                          {renderPriorityIcon('High')} Urgent
                        </div>
                        <Check className="w-4 h-4 text-gray-900 dark:text-white" />
                      </button>
                      <button className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-zinc-800 text-red-500 font-medium">
                        {renderPriorityIcon('High')} High
                      </button>
                      <button className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-zinc-800 text-orange-500 font-medium">
                        {renderPriorityIcon('Medium')} Medium
                      </button>
                      <button className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-400 font-medium">
                        <div className="w-1 h-1 rounded-full bg-gray-400 ml-1" /> Low
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <Button size="sm" className="h-9 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black font-medium px-4 ml-2">
            <Plus className="w-4 h-4 mr-1" /> Add Project
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-6 bg-[#FAFAFA] dark:bg-[#0A0A0A]">
        <div className="border border-gray-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950 overflow-hidden shadow-sm">
          {/* Column Headers */}
          <div className="flex items-center px-4 py-3 bg-gray-50/50 dark:bg-zinc-900/50 border-b border-gray-100 dark:border-zinc-800 text-xs font-semibold text-gray-500">
            <div className="flex-1">Projects</div>
            <div className="w-32">Priority</div>
            <div className="w-32">Lead</div>
            <div className="w-32">Due Date</div>
            <div className="w-12 text-right">Actions</div>
          </div>

          <div className="flex flex-col">
            {mockProjects.map((proj) => (
              <div key={proj.id} className="flex items-center px-4 py-3 bg-white dark:bg-zinc-950 border-b border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-900 group transition-colors">
                <div className="flex-1 font-medium text-sm text-gray-900 dark:text-gray-100">{proj.title}</div>
                
                <div className="w-32 flex items-center">
                  <div className={`text-xs font-semibold flex items-center ${proj.priority === 'High' ? 'text-red-500' : proj.priority === 'Medium' ? 'text-orange-500' : 'text-gray-400'}`}>
                    {renderPriorityIcon(proj.priority)}
                    {proj.priority}
                  </div>
                </div>
                
                <div className="w-32 flex items-center">
                  <div className="flex -space-x-1.5">
                    {renderLead(proj.lead)}
                  </div>
                </div>
                
                <div className="w-32 flex items-center text-sm text-gray-500">
                  {proj.date}
                </div>
                
                <div className="w-12 flex items-center justify-end">
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="px-4 py-3 bg-white dark:bg-zinc-950 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-zinc-900 cursor-pointer transition-colors flex items-center gap-2">
            <Plus className="w-3 h-3" /> Add Projects
          </div>
        </div>
      </div>
    </div>
  );
}
