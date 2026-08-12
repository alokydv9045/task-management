import React from 'react';
import { Task, useTaskStore } from '@/store/useTaskStore';
import { Calendar, MoreHorizontal, MessageSquare, Paperclip, Trash2, Pencil, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useState } from 'react';
import { EditTaskModal } from './EditTaskModal';
import { DeleteConfirmModal } from './DeleteConfirmModal';

export function TaskCard({ 
  task, 
  isListView = false,
  visibleFields = { Priority: true, Members: true, 'Due Date': true, Labels: true } 
}: { 
  task: Task, 
  isListView?: boolean,
  visibleFields?: Record<string, boolean>
}) {
  const { deleteTask } = useTaskStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const getPriorityInfo = (priority: string) => {
    switch (priority) {
      case 'HIGH': return { color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-500/10', label: 'High' };
      case 'MEDIUM': return { color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-500/10', label: 'Medium' };
      case 'LOW': return { color: 'text-gray-400', bg: 'bg-gray-50 dark:bg-zinc-800', label: 'Low' };
      default: return { color: 'text-gray-400', bg: 'bg-gray-50 dark:bg-zinc-800', label: 'Low' };
    }
  };

  const pInfo = getPriorityInfo(task.priority);

  const renderPriorityIcon = (priority: string) => {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
        <path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 4v16"/>
      </svg>
    );
  };

  const renderModals = () => (
    <>
      <EditTaskModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} task={task} />
      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        onConfirm={handleDelete}
        title={task.title}
      />
    </>
  );

  if (isListView) {
    return (
      <>
        <div className="flex items-center px-4 py-3 bg-white dark:bg-zinc-950 border-b border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-900 group transition-colors">
          <div className="flex-1 font-medium text-sm text-gray-900 dark:text-gray-100">{task.title}</div>
          
          {visibleFields.Priority && (
            <div className="w-32 flex items-center">
              <div className={cn("text-xs font-semibold flex items-center", pInfo.color)}>
                {renderPriorityIcon(task.priority)}
                {pInfo.label}
              </div>
            </div>
          )}
          
          {visibleFields.Members && (
            <div className="w-32 flex items-center">
              <div className="flex -space-x-1.5">
                <div className="w-6 h-6 rounded-full overflow-hidden bg-blue-500 border border-white dark:border-zinc-950 shadow-sm relative z-20">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${task.id}1`} alt="User" />
                </div>
                {/* Optional second member mock */}
                {task.priority === 'LOW' && (
                  <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-zinc-700 border border-white dark:border-zinc-950 shadow-sm flex items-center justify-center text-[9px] font-bold text-gray-600 relative z-10">
                    CN
                  </div>
                )}
                {task.priority === 'MEDIUM' && (
                  <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-zinc-800 border border-white dark:border-zinc-950 shadow-sm flex items-center justify-center text-gray-500 relative z-10">
                    <span className="text-[10px]">+</span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {visibleFields['Due Date'] && (
            <div className="w-32 flex items-center text-sm text-gray-500">
              {task.dueDate ? format(new Date(task.dueDate), 'dd MMM yyyy') : 'No Date'}
            </div>
          )}
          
          <div className="w-12 flex items-center justify-end gap-2 relative">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
            
            {isMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)} />
                <div className="absolute right-0 top-full mt-1 w-32 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg shadow-lg z-50 overflow-hidden flex flex-col">
                  <button 
                    onClick={() => { setIsEditModalOpen(true); setIsMenuOpen(false); }}
                    className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-zinc-800 text-left"
                  >
                    <Pencil className="w-4 h-4" /> Edit
                  </button>
                  <button 
                    onClick={() => { setIsDeleteModalOpen(true); setIsMenuOpen(false); }}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 text-left"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        {renderModals()}
      </>
    );
  }

  return (
    <>
      <div className="bg-white dark:bg-zinc-950 p-4 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm cursor-grab active:cursor-grabbing hover:border-gray-200 dark:hover:border-zinc-700 transition-colors group">
        
        {/* Top Row: Title and Menu */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 pr-2">{task.title}</h3>
          
          <div className="flex items-center gap-2 relative">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors mt-0.5"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
            
            {isMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)} />
                <div className="absolute right-0 top-full mt-1 w-32 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg shadow-lg z-50 overflow-hidden flex flex-col">
                  <button 
                    onClick={() => { setIsEditModalOpen(true); setIsMenuOpen(false); }}
                    className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-zinc-800 text-left"
                  >
                    <Pencil className="w-4 h-4" /> Edit
                  </button>
                  <button 
                    onClick={() => { setIsDeleteModalOpen(true); setIsMenuOpen(false); }}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 text-left"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Middle Row: Avatar + Name and Date Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full overflow-hidden bg-blue-500 border-2 border-white dark:border-zinc-950 shadow-sm">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${task.id}`} alt="User" />
            </div>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Admin</span>
          </div>

          {task.dueDate && (
            <div className="flex items-center gap-1 text-red-500 font-semibold bg-red-50 dark:bg-red-500/10 px-2 py-0.5 rounded text-[11px]">
              <Calendar className="w-3.5 h-3.5" />
              {format(new Date(task.dueDate), 'dd MMM')}
            </div>
          )}
        </div>

        {/* Bottom Row: Tags */}
        {task.labels && visibleFields.Labels && (
          <div className="flex gap-1.5 flex-wrap">
            {task.labels.split(',').map(l => (
              <span key={l} className="text-[11px] font-medium bg-gray-50 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded flex items-center gap-1.5 border border-gray-100 dark:border-zinc-700">
                <Tag className="w-3 h-3" />
                {l.trim()}
              </span>
            ))}
          </div>
        )}

      </div>
      {renderModals()}
    </>
  );
}
