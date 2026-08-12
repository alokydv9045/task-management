'use client';

import React from 'react';
import { useTaskStore, Task } from '@/store/useTaskStore';
import { DndContext, DragEndEvent, closestCorners } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskCard } from './TaskCard';
import { GripVertical, MoreHorizontal, Plus } from 'lucide-react';

const columns = [
  { id: 'TODO', title: 'To Do' },
  { id: 'DOING', title: 'Doing' },
  { id: 'COMPLETED', title: 'Completed' },
  { id: 'ON_HOLD', title: 'On Hold' }
];

function SortableTaskItem({ task }: { task: Task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard task={task} />
    </div>
  );
}

export function BoardView({ tasks }: { tasks: Task[] }) {
  const { reorderTasks } = useTaskStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeTask = tasks.find(t => t.id === activeId);
    if (!activeTask) return;

    const isOverColumn = columns.find(col => col.id === overId);
    const overTask = tasks.find(t => t.id === overId);
    
    let newStatus: Task['status'] | undefined;
    let newColumnTasks: Task[] = [];

    if (isOverColumn) {
      newStatus = overId as Task['status'];
      newColumnTasks = tasks.filter(t => t.status === newStatus && t.id !== activeId);
      newColumnTasks.push(activeTask);
    } else if (overTask) {
      newStatus = overTask.status;
      newColumnTasks = tasks.filter(t => t.status === newStatus);
      
      const oldIndex = newColumnTasks.findIndex(t => t.id === activeId);
      const newIndex = newColumnTasks.findIndex(t => t.id === overId);
      
      if (oldIndex !== -1) {
        newColumnTasks = arrayMove(newColumnTasks, oldIndex, newIndex);
      } else {
        newColumnTasks.splice(newIndex, 0, activeTask);
      }
    }

    if (newStatus && newColumnTasks.length > 0) {
      const updates = newColumnTasks.map((t, index) => ({
        id: t.id,
        status: newStatus as Task['status'],
        order: index
      }));
      reorderTasks(updates);
    }
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="flex gap-6 h-full overflow-x-auto pb-4">
        {columns.map((col) => {
          const colTasks = tasks.filter(t => t.status === col.id);
          
          return (
            <div key={col.id} className="min-w-[300px] w-[300px] bg-gray-50/50 dark:bg-zinc-900/30 rounded-xl p-4 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-gray-400" />
                  <span className="font-semibold text-sm">{col.title}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1 text-gray-400 hover:text-black dark:hover:text-white rounded hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors"><Plus className="w-4 h-4" /></button>
                  <button className="p-1 text-gray-400 hover:text-black dark:hover:text-white rounded hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
                </div>
              </div>

              <SortableContext 
                id={col.id}
                items={colTasks.map(t => t.id)} 
                strategy={verticalListSortingStrategy}
              >
                <div className="flex flex-col gap-3 flex-1 min-h-[150px]">
                  {colTasks.map((task) => (
                    <SortableTaskItem key={task.id} task={task} />
                  ))}
                </div>
              </SortableContext>
            </div>
          );
        })}
      </div>
    </DndContext>
  );
}
