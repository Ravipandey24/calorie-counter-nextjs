'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/auth';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const hydrated = useAuthStore((state) => state.hydrated);

  useEffect(() => {
    // Wait for the store to be hydrated
    if (hydrated) {
      setIsHydrated(true);
    }
  }, [hydrated]);

  if (!isHydrated) {
    // Prevent hydration mismatch
    return null;
  }

  return <>{children}</>;
}