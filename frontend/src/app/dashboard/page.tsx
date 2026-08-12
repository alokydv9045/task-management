'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, LayoutList, Columns } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BoardView } from "@/components/BoardView";
import { ListView } from "@/components/ListView";
import { useTaskStore } from "@/store/useTaskStore";
import { usePreferencesStore } from "@/store/usePreferencesStore";
import { CreateTaskModal } from "@/components/CreateTaskModal";

export default function DashboardPage() {
  const [view, setView] = useState<'list' | 'board'>('list');
  const [fieldsMenuOpen, setFieldsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { visibleFields, setVisibleFields } = usePreferencesStore();
  
  const { tasks, fetchTasks, loading } = useTaskStore();

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    task.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950 relative">
      <CreateTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* Top Navigation / Action Bar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-zinc-800 bg-white dark:bg-[#111]">
        <div className="flex items-center gap-4 flex-1">
          <h1 className="text-xl font-bold">Tasks</h1>
          <div className="flex items-center gap-2 border border-gray-200 dark:border-zinc-800 rounded-full px-2 py-1 shadow-sm bg-white dark:bg-zinc-900 ml-2">
            <div className="flex -space-x-1.5">
              <div className="w-6 h-6 rounded-full overflow-hidden border-2 border-white dark:border-zinc-900 bg-red-500 z-20">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" alt="Admin" />
              </div>
              <div className="w-6 h-6 rounded-full overflow-hidden border-2 border-white dark:border-zinc-900 bg-orange-500 z-10 flex items-center justify-center text-white text-[10px] font-bold">
                D
              </div>
            </div>
            <span className="text-xs font-semibold px-1">2</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {view === 'list' ? (
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Design Homepage"
                className="h-9 w-64 rounded-md border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900 pl-9 pr-12 text-sm outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <span className="text-[10px] font-medium text-gray-400 bg-white dark:bg-zinc-800 px-1.5 py-0.5 rounded border border-gray-100 dark:border-zinc-700">⌘F</span>
              </div>
            </div>
          ) : (
            <Button variant="outline" size="icon" className="h-9 w-9 border-gray-200 dark:border-zinc-800 text-gray-500">
              <Search className="w-4 h-4" />
            </Button>
          )}

          <div className="relative">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-9 border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-gray-300 font-medium px-3"
              onClick={() => setFieldsMenuOpen(!fieldsMenuOpen)}
            >
              <LayoutList className="w-4 h-4 mr-2 text-gray-400" />
              Fields
            </Button>
            
            {fieldsMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setFieldsMenuOpen(false)} />
                <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-xl z-50 p-2 overflow-hidden animate-in fade-in slide-in-from-top-2">
                  <div className="flex bg-gray-50 dark:bg-zinc-800/50 p-1 rounded-lg mb-2">
                    <button 
                      onClick={() => setView('list')}
                      className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-semibold rounded-md transition-all ${view === 'list' ? 'bg-white dark:bg-zinc-700 shadow-sm text-black dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                    >
                      <LayoutList className="w-3.5 h-3.5" /> List
                    </button>
                    <button 
                      onClick={() => setView('board')}
                      className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-semibold rounded-md transition-all ${view === 'board' ? 'bg-white dark:bg-zinc-700 shadow-sm text-black dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                    >
                      <Columns className="w-3.5 h-3.5" /> Board
                    </button>
                  </div>
                  
                  <div className="flex flex-col">
                    {Object.keys(visibleFields).map(field => (
                      <label key={field} className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-md cursor-pointer transition-colors">
                        <span>{field}</span>
                        <div className={`w-4 h-4 rounded flex items-center justify-center ${visibleFields[field] ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-100 dark:bg-zinc-800'}`}>
                          {visibleFields[field] && <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <Button variant="outline" size="icon" className="h-9 w-9 border-gray-200 dark:border-zinc-800 text-gray-500">
            <SlidersHorizontal className="w-4 h-4" />
          </Button>

          <Button onClick={() => setIsModalOpen(true)} size="sm" className="h-9 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black font-medium px-4 ml-2">
            + Add Task
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-6 bg-[#FAFAFA] dark:bg-[#0A0A0A]">
        {loading ? (
          <div className="flex flex-col h-full items-center justify-center text-gray-500 gap-4">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-800 dark:border-zinc-700 dark:border-t-zinc-300 rounded-full animate-spin"></div>
            Loading tasks...
          </div>
        ) : (
          view === 'list' ? 
            <ListView tasks={filteredTasks} visibleFields={visibleFields} onAddTask={() => setIsModalOpen(true)} /> : 
            <BoardView tasks={filteredTasks} />
        )}
      </div>
    </div>
  );
}
