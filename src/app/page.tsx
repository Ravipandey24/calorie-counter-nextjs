import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Coffee,
  Database,
  Zap,
  TrendingUp,
  Users,
  CheckCircle,
  Activity,
  Utensils,
  Clock,
} from "lucide-react";
import { AuroraText } from "@/components/magicui/aurora-text";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { CalorieComparisonChart } from "@/components/CalorieComparisonChart";
import { DailyCalorieNeedsChart } from "@/components/DailyCalorieNeedsChart";
import { cn } from "@/lib/utils";

export default function HomePage() {
  // Chart data for calorie comparisons
  const calorieComparisonData = [
    { food: "Coffee", calories: 2, quantity: 240 }, // 1 cup (8 fl oz)
    { food: "Frappuccino", calories: 470, quantity: 473 }, // 1 grande (16 fl oz)
    { food: "Avocado", calories: 234, quantity: 150 }, // 1 medium avocado
    { food: "Banana", calories: 105, quantity: 118 }, // 1 medium banana
  ];

  const dailyCalorieNeedsData = [
    { age: "20-30", sedentary: 1800, active: 2400, veryActive: 2800 },
    { age: "30-40", sedentary: 1750, active: 2300, veryActive: 2700 },
    { age: "40-50", sedentary: 1700, active: 2200, veryActive: 2600 },
    { age: "50-60", sedentary: 1650, active: 2100, veryActive: 2500 },
    { age: "60+", sedentary: 1600, active: 2000, veryActive: 2400 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/50">
      {/* <DotPattern
        className={cn(
          "[mask-image:radial-gradient(1200px_circle_at_center,white,transparent)]",
        )}
      /> */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3 mb-4 sm:mb-6">
            <div className="relative flex-shrink-0">
              <Coffee className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 text-primary" />
              <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-chart-4 rounded-full animate-pulse"></div>
            </div>
            <AuroraText
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center"
              colors={["#8B4513", "#D2B48C", "#A0522D", "#F4A460"]}
            >
              CalorieTracker
            </AuroraText>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 sm:mb-10 lg:mb-12 max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed">
            Fuel your fitness journey with precision. Track calories like a
            barista crafts the perfect brew - with care, accuracy, and the power
            of USDA FoodData Central.
          </p>

          {/* Coffee-themed Calorie Facts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 lg:mb-12 max-w-xs sm:max-w-2xl lg:max-w-4xl mx-auto">
            <div className="bg-card/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-border/50">
              <Coffee className="h-6 w-6 sm:h-8 sm:w-8 text-primary mx-auto mb-2 sm:mb-3" />
              <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">
                <NumberTicker value={2} />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Calories in a cup of black coffee
              </p>
            </div>
            <div className="bg-card/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-border/50">
              <Activity className="h-6 w-6 sm:h-8 sm:w-8 text-chart-4 mx-auto mb-2 sm:mb-3" />
              <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">
                <NumberTicker value={2000} />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Average daily calorie needs
              </p>
            </div>
            <div className="bg-card/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-border/50 sm:col-span-2 lg:col-span-1">
              <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-chart-5 mx-auto mb-2 sm:mb-3" />
              <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">
                <NumberTicker value={30} />s
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                To log your meal
              </p>
            </div>
          </div>

          {/* Interactive Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10 lg:mb-12 max-w-7xl mx-auto">
            <Card className="bg-card/60 backdrop-blur-sm border-border/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg sm:text-xl text-primary flex items-center gap-2">
                  <Coffee className="h-4 w-4 sm:h-5 sm:w-5" />
                  Food Calorie Comparison
                </CardTitle>
                <CardDescription className="text-sm">
                  Compare calories in popular foods and beverages
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <CalorieComparisonChart
                  data={calorieComparisonData}
                  config={{
                    calories: { label: "Calories" },
                    quantity: { label: "Quantity (g)" },
                  }}
                />
              </CardContent>
            </Card>

            <Card className="bg-card/60 backdrop-blur-sm border-border/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg sm:text-xl text-chart-4 flex items-center gap-2">
                  <Activity className="h-4 w-4 sm:h-5 sm:w-5" />
                  Daily Calorie Needs by Age & Activity
                </CardTitle>
                <CardDescription className="text-sm">
                  Recommended daily calorie intake based on lifestyle
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <DailyCalorieNeedsChart
                  data={dailyCalorieNeedsData}
                  config={{
                    sedentary: { label: "Sedentary" },
                    active: { label: "Active" },
                    veryActive: { label: "Very Active" },
                  }}
                />
              </CardContent>
            </Card>
          </div>

          {/* Chart Insights */}
          <div className="bg-gradient-to-r from-secondary/30 to-accent/30 rounded-2xl p-6 sm:p-8 mb-8 sm:mb-10 lg:mb-12 max-w-xs sm:max-w-2xl lg:max-w-4xl mx-auto">
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6 sm:mb-8 flex items-center justify-center gap-2">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                Chart Insights
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2 justify-center">
                    <Coffee className="h-4 w-4 text-primary" />
                    Food Calorie Comparison
                  </h4>
                  <p className="text-xs sm:text-sm">
                    Notice how a single Frappuccino contains more calories than
                    most people realize! Meanwhile, black coffee remains
                    virtually calorie-free, making it a perfect choice for
                    weight management.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2 justify-center">
                    <Activity className="h-4 w-4 text-chart-4" />
                    Daily Calorie Needs
                  </h4>
                  <p className="text-xs sm:text-sm">
                    Your calorie needs decrease with age and vary significantly
                    based on activity level. Very active individuals may need
                    800+ more calories than sedentary ones!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 sm:gap-4 justify-center flex-wrap">
            <Link href="/register">
              <InteractiveHoverButton className="text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
                Start Brewing Your Health
              </InteractiveHoverButton>
            </Link>
            {/* <Button asChild variant="outline" size="lg" className="border-border hover:bg-accent">
              <Link href="/login">Sign In</Link>
            </Button> */}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 lg:mb-20">
          <Card className="text-center group hover:shadow-xl transition-all duration-300 bg-card/60 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-4">
              <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary/20 to-chart-4/20 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                <Utensils className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-primary" />
              </div>
              <CardTitle className="text-lg sm:text-xl text-primary">
                Effortless Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm sm:text-base leading-relaxed">
                Like ordering your favorite coffee, simply enter any dish name
                and serving size. Our smart system handles the complexity while
                you focus on your health goals.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-xl transition-all duration-300 bg-card/60 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-4">
              <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-chart-4/20 to-destructive/20 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                <Database className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-chart-4" />
              </div>
              <CardTitle className="text-lg sm:text-xl text-chart-4">
                Premium Data Quality
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm sm:text-base leading-relaxed">
                Sourced from USDA FoodData Central - the gold standard in
                nutrition data. Every calorie count is as precise as a perfectly
                measured espresso shot.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-xl transition-all duration-300 bg-card/60 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-4">
              <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-chart-5/20 to-primary/20 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-chart-5" />
              </div>
              <CardTitle className="text-lg sm:text-xl text-chart-5">
                Lightning Fast Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm sm:text-base leading-relaxed">
                Advanced AI algorithms deliver instant, accurate matches faster
                than your morning coffee brew. Get precise nutrition facts in
                seconds, not minutes.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Additional Coffee Facts Section */}
        <div className="bg-gradient-to-r from-secondary/50 to-accent/50 rounded-3xl p-6 sm:p-8 lg:p-12 mb-12 sm:mb-16 lg:mb-20 border border-border/50">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
              <Zap className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-primary" />
              <span className="text-center">
                Nutrition Facts That Will Surprise You
              </span>
              <TrendingUp className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-chart-4" />
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xs sm:max-w-xl lg:max-w-2xl mx-auto">
              Eye-opening calorie insights to transform your relationship with
              food
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center bg-card/40 rounded-xl p-4 sm:p-6 border border-border/30">
              <Coffee className="h-6 w-6 sm:h-8 sm:w-8 text-primary mx-auto mb-2 sm:mb-3" />
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-1 sm:mb-2">
                <NumberTicker value={500} />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Calories in a large Frappuccino - equivalent to a full meal!
              </p>
            </div>
            <div className="text-center bg-card/40 rounded-xl p-4 sm:p-6 border border-border/30">
              <Activity className="h-6 w-6 sm:h-8 sm:w-8 text-chart-4 mx-auto mb-2 sm:mb-3" />
              <div className="text-3xl sm:text-4xl font-bold text-chart-4 mb-1 sm:mb-2">
                <NumberTicker value={100} />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Calories burned during a brisk 10-minute walk
              </p>
            </div>
            <div className="text-center bg-card/40 rounded-xl p-4 sm:p-6 border border-border/30">
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-chart-5 mx-auto mb-2 sm:mb-3" />
              <div className="text-3xl sm:text-4xl font-bold text-chart-5 mb-1 sm:mb-2">
                <NumberTicker value={3500} />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Calorie deficit needed to lose one pound of fat
              </p>
            </div>
            <div className="text-center bg-card/40 rounded-xl p-4 sm:p-6 border border-border/30 sm:col-span-2 xl:col-span-1">
              <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-destructive mx-auto mb-2 sm:mb-3" />
              <div className="text-3xl sm:text-4xl font-bold text-destructive mb-1 sm:mb-2">
                <NumberTicker value={20} />%
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Average daily calories from drinks alone - often overlooked!
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <TrendingUp className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 text-primary" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground text-center">
              Ready to <span className="text-primary">Brew</span> Success?
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
            {/* <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0" /> */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto text-center">
              Join over{" "}
              <NumberTicker value={10000} className="font-bold text-primary" />+
              health enthusiasts who trust our precision nutrition tracking
            </p>
          </div>
          <Link href="/register">
            <InteractiveHoverButton className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg">
              Start Your Journey Today
            </InteractiveHoverButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
