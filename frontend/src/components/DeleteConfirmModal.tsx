'use client';

import { Button } from "./ui/button";
import { X, AlertTriangle } from "lucide-react";

export function DeleteConfirmModal({ 
  isOpen, 
  onClose,
  onConfirm,
  title
}: { 
  isOpen: boolean; 
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-sm rounded-xl shadow-xl border border-gray-200 dark:border-zinc-800 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-zinc-800">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Delete Task
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Are you sure you want to delete <strong className="text-black dark:text-white">"{title}"</strong>? This action cannot be undone.
          </p>
        </div>

        <div className="p-4 border-t border-gray-100 dark:border-zinc-800 flex justify-end gap-3 bg-gray-50/50 dark:bg-zinc-900/50">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={() => {
              onConfirm();
              onClose();
            }} 
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
