'use client';

import Link from "next/link";
import { ArrowLeft, Search, User, Sun, Palette, Pencil } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] overflow-hidden">
      
      {/* Sidebar for Settings */}
      <div className="w-64 border-r border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#111] h-full flex flex-col p-4">
        <Link href="/dashboard" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-6 hover:text-black transition-colors px-2">
          <ArrowLeft className="w-4 h-4" />
          Back to app
        </Link>
        
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="w-full h-9 rounded-md border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 pl-9 pr-3 text-sm outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        <nav className="flex flex-col gap-1">
          <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg bg-gray-100 dark:bg-zinc-800 text-black dark:text-white transition-colors">
            <User className="w-4 h-4" />
            Profile
          </button>
          <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors">
            <Sun className="w-4 h-4" />
            Theme
          </button>
          <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors">
            <div className="w-4 h-4 rounded-sm bg-black dark:bg-white" />
            Color
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100">Profile</h1>

          <div className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm mb-12">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-zinc-800">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Profile picture</span>
              <div className="w-10 h-10 rounded-full bg-blue-500 overflow-hidden border border-gray-200 dark:border-zinc-700">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Dexter" alt="Profile" />
              </div>
            </div>

            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-zinc-800 group">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Email</span>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">dexter@gmail.com</span>
                <Pencil className="w-4 h-4 text-gray-400 group-hover:text-gray-600 cursor-pointer" />
              </div>
            </div>

            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-zinc-800">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100 w-1/3">Full name</span>
              <input 
                type="text" 
                defaultValue="Dexter"
                className="flex-1 bg-gray-50 dark:bg-zinc-900 border border-transparent focus:border-gray-200 dark:focus:border-zinc-700 outline-none rounded-md px-3 py-2 text-sm font-medium"
              />
            </div>

            <div className="flex items-start justify-between px-6 py-5 border-b border-gray-100 dark:border-zinc-800">
              <div className="w-1/3">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Title</div>
                <div className="text-xs text-gray-500 mt-1">Your job title or role</div>
              </div>
              <input 
                type="text" 
                defaultValue="Designer"
                className="flex-1 bg-gray-50 dark:bg-zinc-900 border border-transparent focus:border-gray-200 dark:focus:border-zinc-700 outline-none rounded-md px-3 py-2 text-sm font-medium"
              />
            </div>

            <div className="flex items-start justify-between px-6 py-5">
              <div className="w-1/3">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Username</div>
                <div className="text-xs text-gray-500 mt-1">One word, like a nickname or first name</div>
              </div>
              <input 
                type="text" 
                defaultValue="Dexuser"
                className="flex-1 bg-gray-50 dark:bg-zinc-900 border border-transparent focus:border-gray-200 dark:focus:border-zinc-700 outline-none rounded-md px-3 py-2 text-sm font-medium"
              />
            </div>
          </div>

          <h3 className="text-base font-semibold mb-4 text-gray-900 dark:text-gray-100">Workspace access</h3>
          <div className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm flex items-center justify-between px-6 py-5">
            <span className="text-sm text-gray-500">Remove yourself from the workspace</span>
            <button className="bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-red-500 text-sm font-semibold px-4 py-2 rounded-md transition-colors">
              Leave Workspace
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
