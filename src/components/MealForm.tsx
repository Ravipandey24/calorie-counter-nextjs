'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { calorieSchema, type CalorieForm } from '@/lib/validations';
import { caloriesApi } from '@/lib/api';
import type { CalorieResponse, ApiError } from '@/types';
import { Search, Utensils, Hash, RotateCcw, Coffee } from 'lucide-react';

interface MealFormProps {
  onResult?: (result: CalorieResponse | null) => void;
}

export default function MealForm({ onResult }: MealFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CalorieResponse | null>(null);

  const form = useForm<CalorieForm>({
    resolver: zodResolver(calorieSchema),
    defaultValues: {
      dish_name: '',
      servings: 1,
    },
  });
  const onSubmit = async (data: CalorieForm) => {
    setIsLoading(true);
    setResult(null);
    onResult?.(null); // Clear previous results in parent

    try {
      const response = await caloriesApi.getCalories(data);
      setResult(response);
      onResult?.(response); // Pass result to parent
      toast.success(`Nutrition analysis complete for ${data.dish_name}!`);
    } catch (err: any) {
      const apiError = err.response?.data as ApiError;
      toast.error(apiError?.message || 'Failed to get nutrition information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewSearch = () => {
    setResult(null);
    onResult?.(null); // Clear results in parent
    form.reset();
    toast.info('Ready for a new search!');
  };
  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="dish_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Coffee className="h-4 w-4 text-primary" />
                  Dish Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., espresso macchiato, avocado toast, green smoothie"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="servings"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-primary" />
                  Number of Servings
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0.1"
                    max="50"
                    step="0.1"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-200" 
            disabled={isLoading}
          >
            <Search className="h-4 w-4" />
            {isLoading ? 'Analyzing nutrition...' : 'Get Nutrition Info'}
          </Button>
        </form>
      </Form>      {result && (
        <Button
          onClick={handleNewSearch}
          variant="outline"
          className="w-full gap-2 border-primary/20 hover:bg-primary/5"
        >
          <RotateCcw className="h-4 w-4" />
          Search Another Dish
        </Button>
      )}
    </div>
  );
}
