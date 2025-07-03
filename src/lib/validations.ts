import { z } from 'zod';

export const registerSchema = z.object({
  first_name: z.string().min(2, 'First name must be at least 2 characters'),
  last_name: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const calorieSchema = z.object({
  dish_name: z.string().min(1, 'Dish name is required'),
  servings: z.number().min(0.1, 'Servings must be greater than 0').max(50, 'Servings cannot exceed 50'),
});

export type RegisterForm = z.infer<typeof registerSchema>;
export type LoginForm = z.infer<typeof loginSchema>;
export type CalorieForm = z.infer<typeof calorieSchema>; 