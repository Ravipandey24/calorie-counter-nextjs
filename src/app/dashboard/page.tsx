import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getServerAuth } from "@/lib/auth-server";
import DashboardContent from "@/components/DashboardContent";
// import { DotPattern } from "@/components/magicui/dot-pattern";
import { Coffee } from "lucide-react";
// import { cn } from "@/lib/utils";


export default async function DashboardPage() {
  // Server-side authentication check
  const auth = await getServerAuth();

  if (!auth.isAuthenticated) {
    redirect("/login");
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/50">
      {/* <DotPattern
        className={cn(
          "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
        )}  
      /> */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="relative">
                <Coffee className="h-12 w-12 text-primary" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-chart-4 rounded-full animate-pulse"></div>
              </div>
              <h1 className="text-4xl font-bold text-primary/70">
                {auth.user?.first_name}&apos;s Dashboard
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Track your nutrition with the precision of a master barista. Every
              calorie counts toward your wellness journey.
            </p>
          </div>{" "}
          {/* Dashboard Content */}
          <Suspense
            fallback={
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            }
          >
            <DashboardContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
