import { jwtVerify, type JWTPayload } from 'jose';
import { cookies, headers } from 'next/headers';
import { env } from '@/env';
import type { User } from '@/types';

const JWT_SECRET = new TextEncoder().encode(env.JWT_SECRET);

export interface AuthPayload extends JWTPayload {
  userId: number;
  email?: string;
  first_name?: string;
  last_name?: string;
}

/**
 * Verify a JWT token on the server side
 */
export async function verifyToken(token: string): Promise<AuthPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as AuthPayload;
  } catch {
    return null;
  }
}

/**
 * Get the authentication token from cookies or headers
 */
export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const headersList = await headers();
  
  // Try to get token from cookies first (preferred for SSR)
  const tokenFromCookie = cookieStore.get('auth-token')?.value;
  if (tokenFromCookie) {
    return tokenFromCookie;
  }
  
  // Fallback to Authorization header
  const authHeader = headersList.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.replace('Bearer ', '');
  }
  
  // Try custom header set by middleware
  const tokenFromHeader = headersList.get('x-auth-token');
  if (tokenFromHeader) {
    return tokenFromHeader;
  }
  
  return null;
}

/**
 * Get the current authenticated user on the server side
 */
export async function getServerAuth(): Promise<{
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  userId?: number;
}> {
  const token = await getAuthToken();
  
  if (!token) {
    return {
      isAuthenticated: false,
      user: null,
      token: null,
    };
  }
  
  const payload = await verifyToken(token);
  
  if (!payload?.userId) {
    return {
      isAuthenticated: false,
      user: null,
      token: null,
    };
  }
  
  // Create user object with data from token (no id field)
  const user: User = {
    first_name: payload.first_name || '',
    last_name: payload.last_name || '',
    email: payload.email || '',
  };
  
  return {
    isAuthenticated: true,
    user,
    token,
    userId: payload.userId, // Available separately if needed
  };
}

/**
 * Check if the current request is authenticated (for middleware)
 */
export async function isAuthenticated(): Promise<boolean> {
  const { isAuthenticated } = await getServerAuth();
  return isAuthenticated;
}

/**
 * Require authentication - throws if not authenticated
 */
export async function requireAuth(): Promise<{
  user: User;
  token: string;
  userId: number;
}> {
  const auth = await getServerAuth();
  
  if (!auth.isAuthenticated || !auth.user || !auth.token || !auth.userId) {
    throw new Error('Authentication required');
  }
  
  return {
    user: auth.user,
    token: auth.token,
    userId: auth.userId,
  };
} 