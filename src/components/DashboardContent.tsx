"use client";

import { useState } from "react";
import MealForm from "@/components/MealForm";
import ResultCard from "@/components/ResultCard";
import { NumberTicker } from "@/components/magicui/number-ticker";
import {
  Coffee,
  BarChart3,
  Utensils,
  Target,
  Activity,
  Clock,
  Database,
  Droplets,
  Trash2,
  Calendar,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { CalorieResponse } from "@/types";

interface MealEntry {
  id: number;
  timestamp: Date;
  data: CalorieResponse;
}

export default function DashboardContent() {
  const [meals, setMeals] = useState<MealEntry[]>([]);
  const [nextMealId, setNextMealId] = useState(1);

  const handleResult = (newResult: CalorieResponse | null) => {
    if (newResult) {
      const newMeal: MealEntry = {
        id: nextMealId,
        timestamp: new Date(),
        data: newResult,
      };
      setMeals((prev) => [newMeal, ...prev]); // Add new meal at the beginning
      setNextMealId((prev) => prev + 1);
    }
  };

  const removeMeal = (mealId: number) => {
    setMeals((prev) => prev.filter((meal) => meal.id !== mealId));
  };

  // Calculate total calories and macros from all meals
  const totalCalories = meals.reduce(
    (sum, meal) => sum + meal.data.total_calories,
    0
  );
  const totalCarbs = meals.reduce(
    (sum, meal) => sum + (meal.data.total_macronutrients?.carbohydrates || 0),
    0
  );
  const totalProtein = meals.reduce(
    (sum, meal) => sum + (meal.data.total_macronutrients?.protein || 0),
    0
  );
  const totalFat = meals.reduce(
    (sum, meal) => sum + (meal.data.total_macronutrients?.total_fat || 0),
    0
  );

  const latestMeal = meals.length > 0 ? meals[0] : null;

  return (
    <>
      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="bg-card/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-border/50 text-center">
          <Target className="h-5 w-5 sm:h-6 sm:w-6 text-primary mx-auto mb-2" />
          <div className="text-lg sm:text-2xl font-bold text-foreground mb-1">
            <NumberTicker value={2000} />
          </div>
          <p className="text-xs text-muted-foreground">Daily Goal (cal)</p>
        </div>
        <div className="bg-card/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-border/50 text-center">
          <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-chart-4 mx-auto mb-2" />
          <div className="text-lg sm:text-2xl font-bold text-foreground mb-1">
            <NumberTicker value={totalCalories} />
          </div>
          <p className="text-xs text-muted-foreground">Consumed (cal)</p>
          <div className="w-full bg-muted/50 rounded-full h-1.5 mt-2">
            <div
              className="bg-chart-4 h-1.5 rounded-full transition-all duration-300"
              style={{
                width: `${Math.min((totalCalories / 2000) * 100, 100)}%`,
              }}
            />
          </div>
        </div>
        <div className="bg-card/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-border/50 text-center">
          <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-chart-5 mx-auto mb-2" />
          <div className="text-lg sm:text-2xl font-bold text-foreground mb-1">
            <NumberTicker value={Math.round(totalCarbs)} />g
          </div>
          <p className="text-xs text-muted-foreground">Carbs</p>
        </div>
        <div className="bg-card/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-border/50 text-center">
          <Database className="h-5 w-5 sm:h-6 sm:w-6 text-chart-3 mx-auto mb-2" />
          <div className="text-lg sm:text-2xl font-bold text-foreground mb-1">
            <NumberTicker value={Math.round(totalProtein)} />g
          </div>
          <p className="text-xs text-muted-foreground">Protein</p>
        </div>
        <div className="bg-card/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-border/50 text-center col-span-2 sm:col-span-1">
          <Droplets className="h-5 w-5 sm:h-6 sm:w-6 text-chart-2 mx-auto mb-2" />
          <div className="text-lg sm:text-2xl font-bold text-foreground mb-1">
            <NumberTicker value={Math.round(totalFat)} />g
          </div>
          <p className="text-xs text-muted-foreground">Fat</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        {/* Meal Form */}
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-border/50 shadow-xl">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Utensils className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                  Add New Meal
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Enter dish details to get nutrition information
                </p>
              </div>
            </div>
            <MealForm onResult={handleResult} />
          </div>

          {/* Coffee Facts Card */}
          <div className="bg-gradient-to-r from-secondary/30 to-accent/30 rounded-2xl p-4 sm:p-6 border border-border/50">
            <div className="flex items-start gap-3">
              <Coffee className="h-6 w-6 sm:h-8 sm:w-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-foreground mb-2">
                  Daily Nutrition Tip
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                  A cup of black coffee contains only{" "}
                  <span className="font-medium text-primary">2 calories</span>{" "}
                  but provides antioxidants and may boost metabolism by up to
                  11%.
                </p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Low calorie
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-chart-4 rounded-full"></div>
                    Antioxidants
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-chart-5 rounded-full"></div>
                    Metabolism boost
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results & Quick Actions */}
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-border/50 shadow-xl">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="p-2 bg-chart-4/10 rounded-lg">
                <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-chart-4" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                  Nutrition Results
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Detailed breakdown will appear here
                </p>
              </div>
            </div>
            {latestMeal ? (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-foreground">
                    Latest Meal (#{latestMeal.id})
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {latestMeal.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <ResultCard result={latestMeal.data} />
              </div>
            ) : (
              <div className="border-2 border-dashed border-muted/50 rounded-lg p-6 sm:p-8 text-center">
                <Coffee className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-sm sm:text-base text-muted-foreground mb-2">
                  Ready to analyze your meal
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground/70">
                  Submit a dish to see detailed nutritional information,
                  calories, and macros
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Meals History */}
      {meals.length > 0 && (
        <div className="mt-6 sm:mt-8">
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-border/50 shadow-xl">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="p-2 bg-chart-5/10 rounded-lg">
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-chart-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                  Meals History ({meals.length} meal
                  {meals.length !== 1 ? "s" : ""})
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  All your tracked meals for today
                </p>
              </div>
            </div>

            {/* Mobile view - Card layout */}
            <div className="block md:hidden">
              <ScrollArea className="h-96 w-full">
                <div className="space-y-3">
                  {meals.map((meal) => (
                    <div
                      key={meal.id}
                      className="bg-card/40 rounded-lg border border-border/30 p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
                            {meal.id}
                          </span>
                          <div>
                            <p className="font-medium text-foreground text-sm">
                              {meal.data.dish_name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {meal.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeMeal(meal.id)}
                          className="inline-flex items-center justify-center w-8 h-8 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                          title="Remove meal"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-xs">
                        <div className="text-center">
                          <span className="text-muted-foreground block">
                            Servings
                          </span>
                          <span className="font-medium">
                            {meal.data.servings}
                          </span>
                        </div>
                        <div className="text-center">
                          <span className="text-muted-foreground block">
                            Calories
                          </span>
                          <span className="font-semibold text-chart-4">
                            {Math.round(meal.data.total_calories)}
                          </span>
                        </div>
                        <div className="text-center">
                          <span className="text-muted-foreground block">
                            Protein
                          </span>
                          <span className="text-chart-3">
                            {meal.data.total_macronutrients
                              ? Math.round(
                                  meal.data.total_macronutrients.protein
                                )
                              : 0}
                            g
                          </span>
                        </div>
                        <div className="text-center">
                          <span className="text-muted-foreground block">
                            Carbs
                          </span>
                          <span className="text-chart-5">
                            {meal.data.total_macronutrients
                              ? Math.round(
                                  meal.data.total_macronutrients.carbohydrates
                                )
                              : 0}
                            g
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Mobile Summary */}
              <div className="mt-4 pt-4 border-t border-border/50">
                <div className="bg-primary/5 rounded-lg border border-primary/20 p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-primary">
                      Total
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {meals.length} meal{meals.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div className="text-center">
                      <span className="text-muted-foreground block">
                        Calories
                      </span>
                      <span className="text-sm font-bold text-chart-4">
                        {Math.round(totalCalories)}
                      </span>
                    </div>
                    <div className="text-center">
                      <span className="text-muted-foreground block">
                        Protein
                      </span>
                      <span className="text-sm font-semibold text-chart-3">
                        {Math.round(totalProtein)}g
                      </span>
                    </div>
                    <div className="text-center">
                      <span className="text-muted-foreground block">Carbs</span>
                      <span className="text-sm font-semibold text-chart-5">
                        {Math.round(totalCarbs)}g
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop view - Table layout */}
            <div className="hidden md:block">
              <ScrollArea className="h-96 w-full">
                <div className="grid gap-4">
                  {/* Header */}
                  <div className="grid grid-cols-8 gap-4 px-4 py-2 bg-muted/30 rounded-lg text-sm font-medium text-muted-foreground">
                    <div className="text-center">#</div>
                    <div className="col-span-2">Dish</div>
                    <div className="text-center">Servings</div>
                    <div className="text-center">Calories</div>
                    <div className="text-center">Protein</div>
                    <div className="text-center">Carbs</div>
                    <div className="text-center">Actions</div>
                  </div>

                  {/* Meal Rows */}
                  {meals.map((meal) => (
                    <div
                      key={meal.id}
                      className="grid grid-cols-8 gap-4 px-4 py-3 bg-card/40 rounded-lg border border-border/30 hover:bg-card/60 transition-colors"
                    >
                      <div className="text-center">
                        <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
                          {meal.id}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <p className="font-medium text-foreground truncate">
                          {meal.data.dish_name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {meal.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <div className="text-center">
                        <span className="font-medium">
                          {meal.data.servings}
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="font-semibold text-chart-4">
                          {Math.round(meal.data.total_calories)}
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="text-chart-3">
                          {meal.data.total_macronutrients
                            ? Math.round(meal.data.total_macronutrients.protein)
                            : 0}
                          g
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="text-chart-5">
                          {meal.data.total_macronutrients
                            ? Math.round(
                                meal.data.total_macronutrients.carbohydrates
                              )
                            : 0}
                          g
                        </span>
                      </div>
                      <div className="text-center">
                        <button
                          onClick={() => removeMeal(meal.id)}
                          className="inline-flex items-center justify-center w-8 h-8 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                          title="Remove meal"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Desktop Summary Row */}
              <div className="mt-4 pt-4 border-t border-border/50">
                <div className="grid grid-cols-8 gap-4 px-4 py-3 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="text-center">
                    <span className="text-sm font-semibold text-primary">
                      Total
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm font-semibold text-foreground">
                      {meals.length} meal{meals.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-sm text-muted-foreground">-</span>
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-bold text-chart-4">
                      {Math.round(totalCalories)}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-semibold text-chart-3">
                      {Math.round(totalProtein)}g
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-semibold text-chart-5">
                      {Math.round(totalCarbs)}g
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-sm text-muted-foreground">-</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
