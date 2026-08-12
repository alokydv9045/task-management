'use client';

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useTaskStore } from "@/store/useTaskStore";
import { X } from "lucide-react";

export function CreateTaskModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { addTask } = useTaskStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'TODO',
    priority: 'MEDIUM',
    dueDate: '',
    labels: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setLoading(true);
    await addTask({
      title: formData.title,
      description: formData.description,
      status: formData.status as any,
      priority: formData.priority as any,
      dueDate: formData.dueDate || undefined,
      labels: formData.labels || undefined,
    });
    setLoading(false);
    onClose();
    // Reset form
    setFormData({
      title: '',
      description: '',
      status: 'TODO',
      priority: 'MEDIUM',
      dueDate: '',
      labels: '',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-xl shadow-xl border border-gray-200 dark:border-zinc-800 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-zinc-800">
          <h2 className="text-lg font-semibold">Create New Task</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4 overflow-y-auto max-h-[70vh]">
          <div className="space-y-1">
            <label className="text-sm font-medium">Title <span className="text-red-500">*</span></label>
            <Input 
              value={formData.title} 
              onChange={e => setFormData({ ...formData, title: e.target.value })} 
              placeholder="e.g. Design Homepage" 
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Description</label>
            <textarea 
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[80px]"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="Add some details..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Status</label>
              <select 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="TODO">To Do</option>
                <option value="DOING">Doing</option>
                <option value="COMPLETED">Completed</option>
                <option value="ON_HOLD">On Hold</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Priority</label>
              <select 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={formData.priority}
                onChange={e => setFormData({ ...formData, priority: e.target.value })}
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Due Date</label>
              <Input 
                type="date"
                value={formData.dueDate}
                onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Labels</label>
              <Input 
                placeholder="e.g. Design, UI"
                value={formData.labels}
                onChange={e => setFormData({ ...formData, labels: e.target.value })}
              />
            </div>
          </div>
        </form>

        <div className="p-4 border-t border-gray-100 dark:border-zinc-800 flex justify-end gap-3 bg-gray-50/50 dark:bg-zinc-900/50">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading || !formData.title.trim()}>
            {loading ? 'Creating...' : 'Create Task'}
          </Button>
        </div>
      </div>
    </div>
  );
}
