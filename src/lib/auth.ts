import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  hydrated: boolean;
  setHydrated: () => void;
}

// Custom storage that also sets HTTP-only cookies
const createAuthStorage = (): StateStorage => ({
  getItem: (name: string): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(name);
  },
  setItem: (name: string, value: string): void => {
    if (typeof window === 'undefined') return;
    
    try {
      const data = JSON.parse(value);
      const token = data?.state?.token;
      
      // Set HTTP-only cookie for server-side access
      if (token) {
        document.cookie = `auth-token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; samesite=strict; secure=${window.location.protocol === 'https:'}`;
      }
      
      localStorage.setItem(name, value);
    } catch {
      localStorage.setItem(name, value);
    }
  },
  removeItem: (name: string): void => {
    if (typeof window === 'undefined') return;
    
    // Remove HTTP-only cookie
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; samesite=strict';
    
    localStorage.removeItem(name);
  },
});

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      hydrated: false,
      setAuth: (user, token) => {
        set({ user, token, isAuthenticated: true });
        
        // Set HTTP-only cookie for server-side access
        if (typeof window !== 'undefined') {
          document.cookie = `auth-token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; samesite=strict; secure=${window.location.protocol === 'https:'}`;
        }
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        
        // Remove HTTP-only cookie
        if (typeof window !== 'undefined') {
          document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; samesite=strict';
        }
      },
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => createAuthStorage()),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);
