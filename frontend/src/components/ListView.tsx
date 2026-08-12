'use client';

import React from 'react';
import { useTaskStore, Task } from '@/store/useTaskStore';
import { TaskCard } from './TaskCard';
import { ChevronDown } from 'lucide-react';

const groups = [
  { id: 'TODO', title: 'To Do' },
  { id: 'DOING', title: 'Doing' },
  { id: 'COMPLETED', title: 'Completed' },
  { id: 'ON_HOLD', title: 'On Hold' }
];

export function ListView({ 
  tasks,
  visibleFields = { Priority: true, Members: true, 'Due Date': true, Labels: true },
  onAddTask 
}: { 
  tasks: Task[];
  visibleFields?: Record<string, boolean>;
  onAddTask?: () => void 
}) {

  return (
    <div className="flex flex-col gap-8 h-full pb-8">
      {groups.map((group) => {
        const groupTasks = tasks.filter(t => t.status === group.id);
        
        return (
          <div key={group.id} className="flex flex-col">
            {/* Group Header */}
            <div className="flex items-center gap-2 py-2 mb-2 cursor-pointer group">
              <ChevronDown className="w-4 h-4 text-black dark:text-white" />
              <span className="font-semibold text-[15px]">{group.title}</span>
            </div>

            {/* Table Container */}
            <div className="border border-gray-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950 overflow-hidden shadow-sm">
              
              {/* Column Headers */}
              <div className="flex items-center px-4 py-3 bg-gray-50/50 dark:bg-zinc-900/50 border-b border-gray-100 dark:border-zinc-800 text-xs font-semibold text-gray-500">
                <div className="flex-1">Task</div>
                {visibleFields.Priority && <div className="w-32">Priority</div>}
                {visibleFields.Members && <div className="w-32">Members</div>}
                {visibleFields['Due Date'] && <div className="w-32">Due Date</div>}
                <div className="w-12 text-right">Actions</div>
              </div>

              {groupTasks.length > 0 ? (
                <div className="flex flex-col">
                  {groupTasks.map((task) => (
                    <TaskCard key={task.id} task={task} isListView visibleFields={visibleFields} />
                  ))}
                </div>
              ) : (
                <div className="p-8 text-sm text-gray-400 text-center bg-white dark:bg-zinc-950">
                  No tasks in this group
                </div>
              )}
              
              <div 
                className="px-4 py-3 bg-white dark:bg-zinc-950 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-zinc-900 cursor-pointer transition-colors flex items-center gap-2"
                onClick={onAddTask}
              >
                <span>+ Add Task</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
