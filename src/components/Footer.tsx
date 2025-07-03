import Link from 'next/link';
import { Coffee, BarChart3, LogIn, UserPlus, HelpCircle, Shield, FileText, Mail, Database, TrendingUp, Github } from 'lucide-react';
import { AuroraText } from '@/components/magicui/aurora-text';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-secondary/30 to-accent/30 border-t border-border/50 mt-auto backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <Coffee className="h-8 w-8 text-primary" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-chart-4 rounded-full animate-pulse"></div>
              </div>
              <AuroraText
                className="text-2xl font-bold"
                colors={["#8B4513", "#D2B48C", "#A0522D", "#F4A460"]}
              >
                CalorieTracker
              </AuroraText>
            </div>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed mb-6">
              Fuel your fitness journey with precision. Track calories like a
              barista crafts the perfect brew - with care, accuracy, and the power
              of USDA FoodData Central.
            </p>
            <div className="flex items-center gap-2 bg-card/40 rounded-lg p-3 border border-border/30">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                Trusted by <span className="font-bold text-primary">10,000+</span> health enthusiasts
              </span>
            </div>
          </div>          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-6 flex items-center gap-2">
              <Coffee className="h-4 w-4 text-primary" />
              Navigation
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 flex items-center gap-2 group">
                  <Coffee className="h-3 w-3 group-hover:scale-110 transition-transform duration-300" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 flex items-center gap-2 group">
                  <BarChart3 className="h-3 w-3 group-hover:scale-110 transition-transform duration-300" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 flex items-center gap-2 group">
                  <LogIn className="h-3 w-3 group-hover:scale-110 transition-transform duration-300" />
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 flex items-center gap-2 group">
                  <UserPlus className="h-3 w-3 group-hover:scale-110 transition-transform duration-300" />
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-6 flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-chart-4" />
              Support
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-chart-4 transition-all duration-300 flex items-center gap-2 group">
                  <HelpCircle className="h-3 w-3 group-hover:scale-110 transition-transform duration-300" />
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-chart-4 transition-all duration-300 flex items-center gap-2 group">
                  <Shield className="h-3 w-3 group-hover:scale-110 transition-transform duration-300" />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-chart-4 transition-all duration-300 flex items-center gap-2 group">
                  <FileText className="h-3 w-3 group-hover:scale-110 transition-transform duration-300" />
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-chart-4 transition-all duration-300 flex items-center gap-2 group">
                  <Mail className="h-3 w-3 group-hover:scale-110 transition-transform duration-300" />
                  Contact Us
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/Ravipandey24/calorie-counter-nextjs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 flex items-center gap-2 group"
                >
                  <Github className="h-3 w-3 group-hover:scale-110 transition-transform duration-300" />
                  View on GitHub
                </a>
              </li>
            </ul>
          </div>        </div>

        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Coffee className="h-4 w-4 text-primary" />
            © 2025 CalorieTracker. All rights reserved.
          </p>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0 bg-card/40 rounded-lg px-4 py-2 border border-border/30">
            <Database className="h-4 w-4 text-chart-4" />
            <span className="text-sm text-muted-foreground">Powered by</span>
            <span className="text-sm font-semibold text-chart-4">USDA FoodData Central</span>
          </div>
        </div>
      </div>
    </footer>
  );
} 