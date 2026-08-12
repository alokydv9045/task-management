import { create } from 'zustand';
import api from '@/lib/api';
import { useAuthStore } from './useAuthStore';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'TODO' | 'DOING' | 'COMPLETED' | 'ON_HOLD';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  dueDate?: string;
  labels?: string;
  order?: number;
  assignee?: any; // Depending on how members are returned
  subtasks?: Task[];
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  fetchTasks: () => Promise<void>;
  updateTaskStatus: (taskId: string, status: Task['status']) => Promise<void>;
  addTask: (task: Partial<Task>) => Promise<void>;
  editTask: (taskId: string, task: Partial<Task>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  reorderTasks: (reorderedTasks: { id: string; status: Task['status']; order: number }[]) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  loading: false,

  fetchTasks: async () => {
    const token = useAuthStore.getState().token;
    if (!token) return;

    set({ loading: true });
    try {
      const res = await api.get('/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      set({ tasks: res.data, loading: false });
    } catch (error) {
      console.error('Failed to fetch tasks', error);
      set({ loading: false });
    }
  },

  updateTaskStatus: async (taskId, status) => {
    const token = useAuthStore.getState().token;
    if (!token) return;

    // Optimistic update
    const previousTasks = get().tasks;
    set({
      tasks: previousTasks.map(t => t.id === taskId ? { ...t, status } : t)
    });

    try {
      await api.patch(`/tasks/${taskId}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error('Failed to update task status', error);
      // Revert on error
      set({ tasks: previousTasks });
    }
  },

  addTask: async (task) => {
    const token = useAuthStore.getState().token;
    if (!token) return;

    try {
      const res = await api.post('/tasks', task, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set({ tasks: [res.data, ...get().tasks] });
    } catch (error) {
      console.error('Failed to add task', error);
    }
  },

  editTask: async (taskId, taskData) => {
    const token = useAuthStore.getState().token;
    if (!token) return;

    // Optimistic update
    const previousTasks = get().tasks;
    set({
      tasks: previousTasks.map(t => t.id === taskId ? { ...t, ...taskData } : t)
    });

    try {
      await api.patch(`/tasks/${taskId}`, taskData, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error('Failed to edit task', error);
      // Revert on error
      set({ tasks: previousTasks });
    }
  },

  deleteTask: async (taskId) => {
    const token = useAuthStore.getState().token;
    if (!token) return;

    // Optimistic update
    const previousTasks = get().tasks;
    set({
      tasks: previousTasks.filter(t => t.id !== taskId)
    });

    try {
      await api.delete(`/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error('Failed to delete task', error);
      // Revert on error
      set({ tasks: previousTasks });
    }
  },

  reorderTasks: async (reorderedTasks) => {
    const token = useAuthStore.getState().token;
    if (!token) return;

    // Optimistic update
    const previousTasks = get().tasks;
    const taskUpdates = new Map(reorderedTasks.map(t => [t.id, t]));
    
    set({
      tasks: previousTasks.map(t => {
        const update = taskUpdates.get(t.id);
        return update ? { ...t, status: update.status, order: update.order } : t;
      })
    });

    try {
      await api.patch('/tasks/bulk/reorder', reorderedTasks, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error('Failed to reorder tasks', error);
      set({ tasks: previousTasks });
    }
  }
}));
