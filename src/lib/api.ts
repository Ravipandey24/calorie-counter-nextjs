import axios from 'axios';
import { toast } from 'sonner';
import { env } from '@/env';
import type { RegisterData, LoginData, CalorieRequest, AuthResponse, CalorieResponse, ApiError } from '@/types';

const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      try {
        const { state } = JSON.parse(authStorage);
        if (state?.token) {
          config.headers.Authorization = `Bearer ${state.token}`;
        }
      } catch (error) {
        console.error('Error parsing auth storage:', error);
        // Silently handle auth storage parsing errors to avoid console debugger issues
        localStorage.removeItem('auth-storage');
      }
    }
  }
  return config;
});

// Handle API errors consistently
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Prevent debugger from getting stuck by handling errors gracefully
    try {
      if (error.response?.status === 401) {
        // Clear auth on 401 and show toast
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth-storage');
          toast.error('Your session has expired. Please sign in again.');
          window.location.href = '/login';
        }
      } else if (error.response?.status === 429) {
        // Handle rate limiting with countdown timer
        const retryAfter = error.response?.data?.retryAfter || 60; // Default to 60 seconds if not provided
        showRateLimitToast(retryAfter);
      } else if (error.response?.status >= 500) {
        // Handle server errors
        toast.error('Server error occurred. Please try again later.');
      } else if (error.code === 'NETWORK_ERROR' || !error.response) {
        // Handle network errors
        toast.error('Network error. Please check your connection.');
      }
    } catch (handlingError) {
      console.error('Error handling API error:', handlingError);
      // Silently handle any errors in error handling to prevent debugger issues
    }
    
    return Promise.reject(error);
  }
);

// Track rate limit state to avoid multiple concurrent countdowns
let rateLimitState: {
  isActive: boolean;
  intervalId?: NodeJS.Timeout;
} = { isActive: false };

// Function to show rate limit toast with countdown
const showRateLimitToast = (retryAfterSeconds: number) => {
  // If there's already an active rate limit toast, don't create a new one
  if (rateLimitState.isActive) {
    return;
  }

  let timeRemaining = retryAfterSeconds;
  rateLimitState.isActive = true;
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return minutes > 0 
      ? `${minutes}m ${remainingSeconds}s`
      : `${remainingSeconds}s`;
  };

  // Create a single toast with a unique ID for the countdown element
  const countdownId = `rate-limit-countdown-${Date.now()}`;
  const toastId = toast.error(
    `Too many requests. Please try again in ${formatTime(timeRemaining)}`,
    {
      duration: Infinity,
      position: 'top-right',
      id: countdownId,
    }
  );

  // Update countdown every second by finding and updating the toast element
  rateLimitState.intervalId = setInterval(() => {
    timeRemaining--;
    
    if (timeRemaining <= 0) {
      // Clear interval and dismiss toast
      if (rateLimitState.intervalId) {
        clearInterval(rateLimitState.intervalId);
      }
      toast.dismiss(toastId);
      
      // Reset state
      rateLimitState = { isActive: false };
      
      // Show success message
      toast.success('You can now make requests again!', {
        position: 'top-right',
        duration: 3000,
      });
    } else {
      // Safely try to update the existing toast content via DOM
      try {
        const toastElements = document.querySelectorAll('[data-sonner-toast]');
        toastElements.forEach((element) => {
          const toastContent = element.querySelector('[data-description], [data-title]');
          if (toastContent && toastContent.textContent?.includes('Too many requests')) {
            toastContent.textContent = `Too many requests. Please try again in ${formatTime(timeRemaining)}`;
          }
        });
      } catch (domError) {
        console.error('Error updating rate limit toast:', domError);
        // Silently handle DOM manipulation errors to prevent debugger issues
      }
    }
  }, 1000);
};

export const authApi = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    try {
      const response = await api.post('/auth/register', data);
      return response.data;
    } catch (error) {
      // Re-throw with proper error handling to prevent debugger issues
      throw error;
    }
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    try {
      const response = await api.post('/auth/login', data);
      return response.data;
    } catch (error) {
      // Re-throw with proper error handling to prevent debugger issues
      throw error;
    }
  },
};

export const caloriesApi = {
  getCalories: async (data: CalorieRequest): Promise<CalorieResponse> => {
    try {
      const response = await api.post('/get-calories', data);
      return response.data;
    } catch (error) {
      // Re-throw with proper error handling to prevent debugger issues
      throw error;
    }
  },
};

export { api };
export type { ApiError };
