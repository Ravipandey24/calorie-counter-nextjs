import Link from "next/link";
import { Button } from "@/components/ui/button";
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
    { food: "Coffee", calories: 2 },
    { food: "Frappuccino", calories: 470 },
    { food: "Avocado", calories: 234 },
    { food: "Banana", calories: 105 },
  ];

  const dailyCalorieNeedsData = [
    { age: "20-30", sedentary: 1800, active: 2400, veryActive: 2800 },
    { age: "30-40", sedentary: 1750, active: 2300, veryActive: 2700 },
    { age: "40-50", sedentary: 1700, active: 2200, veryActive: 2600 },
    { age: "50-60", sedentary: 1650, active: 2100, veryActive: 2500 },
    { age: "60+", sedentary: 1600, active: 2000, veryActive: 2400 },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/50">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(1200px_circle_at_center,white,transparent)]",
        )}
      />
      <div className="container mx-auto px-4 py-16 relative">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <Coffee className="h-16 w-16 text-primary" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-chart-4 rounded-full animate-pulse"></div>
            </div>
            <AuroraText
              className="text-6xl font-bold"
              colors={["#8B4513", "#D2B48C", "#A0522D", "#F4A460"]}
            >
              CalorieTracker
            </AuroraText>
          </div>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Fuel your fitness journey with precision. Track calories like a
            barista crafts the perfect brew - with care, accuracy, and the power
            of USDA FoodData Central.
          </p>

          {/* Coffee-themed Calorie Facts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-card/60 backdrop-blur-sm rounded-xl p-6 border border-border/50">
              <Coffee className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">
                <NumberTicker value={2} />
              </div>
              <p className="text-sm text-muted-foreground">
                Calories in a cup of black coffee
              </p>
            </div>
            <div className="bg-card/60 backdrop-blur-sm rounded-xl p-6 border border-border/50">
              <Activity className="h-8 w-8 text-chart-4 mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">
                <NumberTicker value={2000} />
              </div>
              <p className="text-sm text-muted-foreground">
                Average daily calorie needs
              </p>
            </div>
            <div className="bg-card/60 backdrop-blur-sm rounded-xl p-6 border border-border/50">
              <Clock className="h-8 w-8 text-chart-5 mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">
                <NumberTicker value={30} />s
              </div>
              <p className="text-sm text-muted-foreground">To log your meal</p>
            </div>
          </div>

          {/* Interactive Charts Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-6xl mx-auto">
            <Card className="bg-card/60 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center gap-2">
                  <Coffee className="h-5 w-5" />
                  Food Calorie Comparison
                </CardTitle>
                <CardDescription>
                  Compare calories in popular foods and beverages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CalorieComparisonChart
                  data={calorieComparisonData}
                  config={{
                    calories: { label: "Calories" },
                  }}
                />
              </CardContent>
            </Card>

            <Card className="bg-card/60 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-xl text-chart-4 flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Daily Calorie Needs by Age & Activity
                </CardTitle>
                <CardDescription>
                  Recommended daily calorie intake based on lifestyle
                </CardDescription>
              </CardHeader>
              <CardContent>
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
          <div className="bg-gradient-to-r from-secondary/30 to-accent/30 rounded-2xl p-8 mb-12 max-w-4xl mx-auto">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center justify-center gap-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                Chart Insights
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2 justify-center">
                    <Coffee className="h-4 w-4 text-primary" />
                    Food Calorie Comparison
                  </h4>
                  <p>
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
                  <p>
                    Your calorie needs decrease with age and vary significantly
                    based on activity level. Very active individuals may need
                    800+ more calories than sedentary ones!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/register">
              <InteractiveHoverButton>
                Start Brewing Your Health
              </InteractiveHoverButton>
            </Link>
            {/* <Button asChild variant="outline" size="lg" className="border-border hover:bg-accent">
              <Link href="/login">Sign In</Link>
            </Button> */}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Card className="text-center group hover:shadow-xl transition-all duration-300 bg-card/60 backdrop-blur-sm border-border/50">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/20 to-chart-4/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Utensils className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl text-primary">
                Effortless Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                Like ordering your favorite coffee, simply enter any dish name
                and serving size. Our smart system handles the complexity while
                you focus on your health goals.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-xl transition-all duration-300 bg-card/60 backdrop-blur-sm border-border/50">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-chart-4/20 to-destructive/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Database className="h-8 w-8 text-chart-4" />
              </div>
              <CardTitle className="text-xl text-chart-4">
                Premium Data Quality
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                Sourced from USDA FoodData Central - the gold standard in
                nutrition data. Every calorie count is as precise as a perfectly
                measured espresso shot.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-xl transition-all duration-300 bg-card/60 backdrop-blur-sm border-border/50">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-chart-5/20 to-primary/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-8 w-8 text-chart-5" />
              </div>
              <CardTitle className="text-xl text-chart-5">
                Lightning Fast Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                Advanced AI algorithms deliver instant, accurate matches faster
                than your morning coffee brew. Get precise nutrition facts in
                seconds, not minutes.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Additional Coffee Facts Section */}
        <div className="bg-gradient-to-r from-secondary/50 to-accent/50 rounded-3xl p-12 mb-20 border border-border/50">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
              <Zap className="h-8 w-8 text-primary" />
              Nutrition Facts That Will Surprise You
              <TrendingUp className="h-8 w-8 text-chart-4" />
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Eye-opening calorie insights to transform your relationship with
              food
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center bg-card/40 rounded-xl p-6 border border-border/30">
              <Coffee className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-4xl font-bold text-primary mb-2">
                <NumberTicker value={500} />
              </div>
              <p className="text-sm text-muted-foreground">
                Calories in a large Frappuccino - equivalent to a full meal!
              </p>
            </div>
            <div className="text-center bg-card/40 rounded-xl p-6 border border-border/30">
              <Activity className="h-8 w-8 text-chart-4 mx-auto mb-3" />
              <div className="text-4xl font-bold text-chart-4 mb-2">
                <NumberTicker value={100} />
              </div>
              <p className="text-sm text-muted-foreground">
                Calories burned during a brisk 10-minute walk
              </p>
            </div>
            <div className="text-center bg-card/40 rounded-xl p-6 border border-border/30">
              <TrendingUp className="h-8 w-8 text-chart-5 mx-auto mb-3" />
              <div className="text-4xl font-bold text-chart-5 mb-2">
                <NumberTicker value={3500} />
              </div>
              <p className="text-sm text-muted-foreground">
                Calorie deficit needed to lose one pound of fat
              </p>
            </div>
            <div className="text-center bg-card/40 rounded-xl p-6 border border-border/30">
              <CheckCircle className="h-8 w-8 text-destructive mx-auto mb-3" />
              <div className="text-4xl font-bold text-destructive mb-2">
                <NumberTicker value={20} />%
              </div>
              <p className="text-sm text-muted-foreground">
                Average daily calories from drinks alone - often overlooked!
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <TrendingUp className="h-10 w-10 text-primary" />
            <h2 className="text-4xl font-bold text-foreground">
              Ready to <span className="text-primary">Brew</span> Success?
            </h2>
          </div>
          <p className="text-xl text-muted-foreground mb-10 flex items-center justify-center gap-3 max-w-3xl mx-auto">
            <Users className="h-6 w-6 text-primary" />
            Join over{" "}
            <NumberTicker value={10000} className="font-bold text-primary" />+
            health enthusiasts who trust our precision nutrition tracking
          </p>
          <Link href="/register">
            <InteractiveHoverButton className="px-8 py-4 text-lg">
              Start Your Journey Today
            </InteractiveHoverButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
