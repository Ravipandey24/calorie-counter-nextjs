'use client';

import type { CalorieResponse } from '@/types';
import { Utensils, Zap, Target, Info, Coffee, Droplets } from 'lucide-react';

interface ResultCardProps {
  result: CalorieResponse;
}

export default function ResultCard({ result }: ResultCardProps) {
  const macros = result.macronutrients_per_serving;
  
  return (
    <div className="space-y-6">
      {/* Header with dish name and source */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Coffee className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground capitalize">
              {result.dish_name}
            </h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Info className="h-3 w-3" />
              Data from {result.source}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{result.total_calories}</div>
          <div className="text-xs text-muted-foreground">Total Calories</div>
        </div>
      </div>

      {/* Main nutrition grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card/60 backdrop-blur-sm rounded-xl p-4 border border-border/50 text-center">
          <Utensils className="h-5 w-5 text-primary mx-auto mb-2" />
          <div className="text-lg font-bold text-foreground">{result.servings}</div>
          <div className="text-xs text-muted-foreground">Serving{result.servings !== 1 ? 's' : ''}</div>
        </div>
        
        <div className="bg-card/60 backdrop-blur-sm rounded-xl p-4 border border-border/50 text-center">
          <Zap className="h-5 w-5 text-chart-4 mx-auto mb-2" />
          <div className="text-lg font-bold text-foreground">{result.calories_per_serving}</div>
          <div className="text-xs text-muted-foreground">Cal/serving</div>
        </div>
        
        <div className="bg-card/60 backdrop-blur-sm rounded-xl p-4 border border-border/50 text-center">
          <Target className="h-5 w-5 text-chart-5 mx-auto mb-2" />
          <div className="text-lg font-bold text-foreground">{macros?.protein || 0}g</div>
          <div className="text-xs text-muted-foreground">Protein</div>
        </div>
        
        <div className="bg-card/60 backdrop-blur-sm rounded-xl p-4 border border-border/50 text-center">
          <Droplets className="h-5 w-5 text-chart-3 mx-auto mb-2" />
          <div className="text-lg font-bold text-foreground">{macros?.carbohydrates || 0}g</div>
          <div className="text-xs text-muted-foreground">Carbs</div>
        </div>
      </div>

      {/* Macronutrients breakdown */}
      {macros && (
        <div className="bg-gradient-to-r from-secondary/30 to-accent/30 rounded-xl p-4 border border-border/50">
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Coffee className="h-4 w-4 text-primary" />
            Nutritional Breakdown (per serving)
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
            <div className="text-center">
              <div className="font-bold text-foreground">{macros.protein}g</div>
              <div className="text-muted-foreground">Protein</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-foreground">{macros.total_fat}g</div>
              <div className="text-muted-foreground">Fat</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-foreground">{macros.carbohydrates}g</div>
              <div className="text-muted-foreground">Carbs</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-foreground">{macros.fiber}g</div>
              <div className="text-muted-foreground">Fiber</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-foreground">{macros.sugars}g</div>
              <div className="text-muted-foreground">Sugars</div>
            </div>
          </div>
        </div>
      )}

      {/* Ingredient breakdown */}
      {result.ingredient_breakdown && result.ingredient_breakdown.length > 0 && (
        <div className="bg-card/40 backdrop-blur-sm rounded-xl p-4 border border-border/50">
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Info className="h-4 w-4 text-primary" />
            Food Details
          </h4>
          {result.ingredient_breakdown.map((ingredient, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
              <div>
                <div className="font-medium text-foreground capitalize">
                  {ingredient.name.toLowerCase()}
                </div>
                <div className="text-xs text-muted-foreground">
                  {ingredient.brand && `${ingredient.brand} • `}
                  {ingredient.data_type} • Serving: {ingredient.serving_size}
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-foreground">{ingredient.calories_per_100g}</div>
                <div className="text-xs text-muted-foreground">cal/100g</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Disclaimer */}
      <div className="text-center text-xs text-muted-foreground flex items-center justify-center gap-2 pt-2">
        <Info className="h-3 w-3" />
        <p>
          Nutritional values are estimates and may vary based on preparation method and ingredients.
        </p>
      </div>
    </div>
  );
}
