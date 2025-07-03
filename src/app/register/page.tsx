import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { getServerAuth } from '@/lib/auth-server';
import RegisterForm from '@/components/RegisterForm';
import { DotPattern } from '@/components/magicui/dot-pattern';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { Coffee, UserPlus, Utensils, Database, Zap } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default async function RegisterPage() {
  // Server-side authentication check
  const auth = await getServerAuth();
  
  if (auth.isAuthenticated) {
    redirect('/dashboard');
  }
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/50">
      {/* <DotPattern
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
        )}
      /> */}
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center relative z-10">
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Branding and Benefits */}
          <div className="space-y-8 lg:order-2">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                <div className="relative">
                  <Coffee className="h-12 w-12 text-primary" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-chart-4 rounded-full animate-pulse"></div>
                </div>
                <span className="text-3xl font-bold text-foreground">CalorieTracker</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Start Your <span className="text-primary">Health Journey</span> Today
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
                Join thousands who trust CalorieTracker for precise nutrition tracking. 
                Your wellness transformation begins with a single step.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-card/60 backdrop-blur-sm rounded-xl p-4 border border-border/50 text-center">
                <Utensils className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-sm font-semibold text-foreground mb-1">Easy Tracking</div>
                <p className="text-xs text-muted-foreground">Simple food logging</p>
              </div>
              <div className="bg-card/60 backdrop-blur-sm rounded-xl p-4 border border-border/50 text-center">
                <Database className="h-6 w-6 text-chart-4 mx-auto mb-2" />
                <div className="text-sm font-semibold text-foreground mb-1">USDA Data</div>
                <p className="text-xs text-muted-foreground">Accurate nutrition</p>
              </div>
              <div className="bg-card/60 backdrop-blur-sm rounded-xl p-4 border border-border/50 text-center">
                <Zap className="h-6 w-6 text-chart-5 mx-auto mb-2" />
                <div className="text-sm font-semibold text-foreground mb-1">Instant Results</div>
                <p className="text-xs text-muted-foreground">Real-time insights</p>
              </div>
            </div>

            {/* Key Stats */}
            <div className="bg-gradient-to-r from-secondary/30 to-accent/30 rounded-2xl p-6 border border-border/50">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Coffee className="h-5 w-5 text-primary" />
                Why Choose CalorieTracker?
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    <NumberTicker value={50000} />+
                  </div>
                  <p className="text-xs text-muted-foreground">Foods in database</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-chart-4">
                    <NumberTicker value={95} />%
                  </div>
                  <p className="text-xs text-muted-foreground">User satisfaction</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                &quot;Like a perfectly brewed cup of coffee, your health deserves precision and care.&quot;
              </p>
            </div>
          </div>

          {/* Right side - Register Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0 lg:order-1">
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-xl">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <UserPlus className="h-8 w-8 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">
                    Create Account
                  </h2>
                </div>
                <p className="text-muted-foreground">
                  Begin your personalized nutrition tracking experience
                </p>
              </div>              <Suspense fallback={
                <div className="flex items-center justify-center p-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              }>
                <RegisterForm />
              </Suspense>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link 
                    href="/login" 
                    className="font-medium text-primary hover:text-primary/90 transition-colors"
                  >
                    Sign in
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