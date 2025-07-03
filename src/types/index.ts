export interface User {
  first_name: string;
  last_name: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface CalorieRequest {
  dish_name: string;
  servings: number;
}

export interface Macronutrients {
  protein: number;
  total_fat: number;
  carbohydrates: number;
  fiber: number;
  sugars: number;
}

export interface IngredientBreakdown {
  name: string;
  calories_per_100g: number;
  macronutrients_per_100g: Macronutrients;
  serving_size: string;
  data_type: string;
  fdc_id: number;
  brand?: string;
}

export interface MatchedFood {
  name: string;
  fdc_id: number;
  data_type: string;
  published_date: string;
}

export interface CalorieResponse {
  dish_name: string;
  servings: number;
  calories_per_serving: number;
  total_calories: number;
  macronutrients_per_serving?: Macronutrients;
  total_macronutrients?: Macronutrients;
  source: string;
  ingredient_breakdown?: IngredientBreakdown[];
  matched_food?: MatchedFood;
}

export interface ApiError {
  error: string;
  message: string;
  status_code: number;
  details?: Record<string, string[]>;
} 