// Sample nutrition data for testing the enhanced dashboard
export const sampleNutritionData = {
  "dish_name": "pasta",
  "servings": 1,
  "calories_per_serving": 210,
  "total_calories": 210,
  "macronutrients_per_serving": {
    "protein": 7,
    "total_fat": 1,
    "carbohydrates": 44,
    "fiber": 2,
    "sugars": 2
  },
  "total_macronutrients": {
    "protein": 7,
    "total_fat": 1,
    "carbohydrates": 44,
    "fiber": 2,
    "sugars": 2
  },
  "source": "USDA FoodData Central",
  "ingredient_breakdown": [
    {
      "name": "PASTA",
      "calories_per_100g": 375,
      "macronutrients_per_100g": {
        "protein": 12.5,
        "total_fat": 1.8,
        "carbohydrates": 78.6,
        "fiber": 3.6,
        "sugars": 3.6
      },
      "serving_size": "56g",
      "data_type": "Branded",
      "fdc_id": 465736,
      "brand": "Harris-Teeter Inc."
    }
  ],
  "matched_food": {
    "name": "PASTA",
    "fdc_id": 465736,
    "data_type": "Branded",
    "published_date": "2019-04-01"
  }
};
