'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, Database, ChevronDown, ChevronsUpDown, LogOut, Sun, Moon, Settings, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/useAuthStore';
import { useThemeStore } from '@/store/useThemeStore';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const { colorMode, setColorMode } = useThemeStore();
  const { setTheme } = useTheme();
  const router = useRouter();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<'theme' | 'color' | null>(null);
  
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
        setActiveSubmenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { name: 'Tasks', href: '/dashboard', icon: LayoutGrid },
    { name: 'Projects', href: '/dashboard/projects', icon: Database },
  ];

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const colorModes = [
    { id: 'amber', name: 'Amber', color: 'bg-amber-500' },
    { id: 'blue', name: 'Blue', color: 'bg-blue-500' },
    { id: 'pink', name: 'Pink', color: 'bg-pink-500' },
    { id: 'rose', name: 'Rose', color: 'bg-rose-500' },
    { id: 'emerald', name: 'Emerald', color: 'bg-emerald-500' },
    { id: 'black', name: 'Black', color: 'bg-zinc-900 dark:bg-white' },
  ] as const;

  return (
    <div className="w-64 border-r border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#111] h-full flex flex-col p-4 relative">
      {/* User Profile Trigger */}
      <div className="relative" ref={menuRef}>
        <button 
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="w-full flex items-center justify-between px-2 py-2 mb-6 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800/50 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full overflow-hidden bg-blue-500 border border-black/10 dark:border-white/10">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id || 'Dexter'}`} alt="User" />
            </div>
            <span className="font-semibold text-sm">
              {user?.isGuest ? 'Guest User' : 'Dexter'}
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>

        {/* Profile Popover Menu */}
        {isProfileOpen && (
          <div className="absolute top-full left-0 mt-1 w-60 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-xl z-50 overflow-visible py-2 animate-in fade-in slide-in-from-top-2">
            
            {/* Large Profile Info */}
            <div className="flex flex-col items-center justify-center p-4 pb-2">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-blue-500 border border-black/10 dark:border-white/10 mb-2 shadow-sm">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id || 'Dexter'}`} alt="User" />
              </div>
              <span className="font-medium text-sm">Dexter</span>
              <span className="text-xs text-gray-500">Dexter@gmail.com</span>
            </div>

            <div className="h-px bg-gray-100 dark:bg-zinc-800 my-2" />

            {/* Menu Items */}
            <div className="relative">
              <button 
                onMouseEnter={() => setActiveSubmenu('theme')}
                className="w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-gray-500" />
                  <span>Change Theme</span>
                </div>
                <ChevronDown className="w-3 h-3 -rotate-90 text-gray-500" />
              </button>

              <button 
                onMouseEnter={() => setActiveSubmenu('color')}
                className="w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-gray-500" />
                  <span>Color Mode</span>
                </div>
                <ChevronDown className="w-3 h-3 -rotate-90 text-gray-500" />
              </button>

              <button 
                onMouseEnter={() => setActiveSubmenu(null)}
                onClick={() => router.push('/settings')}
                className="w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-gray-500" />
                  <span>Settings</span>
                </div>
              </button>
              
              <div className="h-px bg-gray-100 dark:bg-zinc-800 my-2" />
              
              <button 
                onClick={handleLogout}
                onMouseEnter={() => setActiveSubmenu(null)}
                className="w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-red-500"
              >
                <div className="flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </div>
              </button>

              {/* Submenus */}
              {activeSubmenu === 'theme' && (
                <div 
                  className="absolute left-full top-0 ml-1 w-40 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg shadow-xl py-1 animate-in fade-in"
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  <button onClick={() => setTheme('light')} className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-800">
                    <Sun className="w-4 h-4 text-gray-500" /> Light
                  </button>
                  <button onClick={() => setTheme('dark')} className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-800">
                    <Moon className="w-4 h-4 text-gray-500" /> Dark
                  </button>
                </div>
              )}

              {activeSubmenu === 'color' && (
                <div 
                  className="absolute left-full top-8 ml-1 w-40 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg shadow-xl py-1 animate-in fade-in"
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  {colorModes.map(mode => (
                    <button 
                      key={mode.id}
                      onClick={() => setColorMode(mode.id)} 
                      className="w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-800"
                    >
                      <div className="flex items-center gap-2">
                        <div className={cn("w-3.5 h-3.5 rounded-sm shadow-sm", mode.color)} />
                        {mode.name}
                      </div>
                      {colorMode === mode.id && <span className="text-xs">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Workspace Menu */}
      <div className="mb-2 px-2 flex items-center justify-between text-xs font-semibold text-gray-400">
        <span>Workspace</span>
        <ChevronDown className="w-3.5 h-3.5" />
      </div>

      <nav className="flex flex-col gap-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                isActive 
                  ? "bg-gray-100/80 dark:bg-zinc-800/80 text-black dark:text-white" 
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-900 hover:text-black dark:hover:text-white"
              )}
            >
              <Icon className="w-4 h-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
