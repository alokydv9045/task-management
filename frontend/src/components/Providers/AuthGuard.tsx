'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const token = useAuthStore((state) => state.token);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !token && pathname !== '/login') {
      router.push('/login');
    }
  }, [isClient, token, pathname, router]);

  if (!isClient) {
    return null; // Or a loading spinner
  }

  // If we don't have a token, don't render children (we are redirecting)
  if (!token && pathname !== '/login') {
    return null;
  }

  return <>{children}</>;
}
