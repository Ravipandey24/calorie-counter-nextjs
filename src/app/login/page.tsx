import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getServerAuth } from "@/lib/auth-server";
import LoginForm from "@/components/LoginForm";
// import { DotPattern } from "@/components/magicui/dot-pattern";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Coffee, LogIn, Activity, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";
// import { cn } from "@/lib/utils";

interface LoginPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  // Server-side authentication check
  const auth = await getServerAuth();

  if (auth.isAuthenticated) {
    redirect("/dashboard");
  }

  const resolvedSearchParams = await searchParams;
  const callbackUrl =
    typeof resolvedSearchParams.callbackUrl === "string"
      ? resolvedSearchParams.callbackUrl
      : "/dashboard";
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/50">
      {/* <DotPattern
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
        )}
      /> */}
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center relative z-10">
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Branding and Facts */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                <div className="relative">
                  <Coffee className="h-12 w-12 text-primary" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-chart-4 rounded-full animate-pulse"></div>
                </div>
                <span className="text-3xl font-bold text-foreground">
                  CalorieTracker
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Welcome Back to Your{" "}
                <span className="text-primary">Health Journey</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
                Continue tracking your calories with the precision of a master
                barista. Your progress awaits.
              </p>
            </div>

            {/* Quick Facts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-card/60 backdrop-blur-sm rounded-xl p-4 border border-border/50 text-center">
                <Activity className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground mb-1">
                  <NumberTicker value={99} />%
                </div>
                <p className="text-xs text-muted-foreground">Accuracy rate</p>
              </div>
              <div className="bg-card/60 backdrop-blur-sm rounded-xl p-4 border border-border/50 text-center">
                <Clock className="h-6 w-6 text-chart-4 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground mb-1">
                  <NumberTicker value={15} />s
                </div>
                <p className="text-xs text-muted-foreground">Average lookup</p>
              </div>
              <div className="bg-card/60 backdrop-blur-sm rounded-xl p-4 border border-border/50 text-center">
                <TrendingUp className="h-6 w-6 text-chart-5 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground mb-1">
                  <NumberTicker value={10000} />+
                </div>
                <p className="text-xs text-muted-foreground">Happy users</p>
              </div>
            </div>

            {/* Motivational Quote */}
            <div className="bg-gradient-to-r from-secondary/30 to-accent/30 rounded-2xl p-6 border border-border/50">
              <div className="flex items-start gap-3">
                <Coffee className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-foreground font-medium mb-2">
                    &quot;Every calorie tracked is a step towards your goals.&quot;
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Your personalized nutrition data is waiting for you.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-xl">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <LogIn className="h-8 w-8 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">
                    Sign In
                  </h2>
                </div>
                <p className="text-muted-foreground">
                  Access your personalized calorie tracking dashboard
                </p>
              </div>{" "}
              <Suspense
                fallback={
                  <div className="flex items-center justify-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                }
              >
                <LoginForm callbackUrl={callbackUrl} />
              </Suspense>
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="font-medium text-primary hover:text-primary/90 transition-colors"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
