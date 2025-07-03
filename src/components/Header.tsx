'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthStore } from '@/lib/auth';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { LogOut, ChevronDown, Coffee, BarChart3 } from 'lucide-react';
import { AuroraText } from '@/components/magicui/aurora-text';
import type { User as UserType } from '@/types';

interface HeaderProps {
  serverAuth?: {
    isAuthenticated: boolean;
    user: UserType | null;
  };
}

export default function Header({ serverAuth }: HeaderProps) {
  const router = useRouter();
  const { isAuthenticated: clientAuth, user: clientUser, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Use server auth for SSR, then client auth
  const isAuthenticated = serverAuth?.isAuthenticated ?? clientAuth;
  const user = serverAuth?.user ?? clientUser;
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-3 text-xl font-bold text-foreground hover:text-primary transition-all duration-300 group"
          >
            <div className="relative">
              <Coffee className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-chart-4 rounded-full animate-pulse"></div>
            </div>
            <AuroraText
              className="text-xl font-bold"
              colors={["#8B4513", "#D2B48C", "#A0522D", "#F4A460"]}
            >
              CalorieTracker
            </AuroraText>
          </Link>            <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <>
                <nav className="hidden md:flex items-center gap-4">
                  <Link 
                    href="/dashboard" 
                    className="flex items-center gap-2 text-foreground hover:text-primary transition-all duration-300 px-3 py-2 rounded-lg hover:bg-secondary/50"
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span className="font-medium">Dashboard</span>
                  </Link>
                </nav>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 h-10 px-3 rounded-full hover:bg-accent/80 transition-all duration-300">
                      <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                        <AvatarImage src={undefined} alt={user.first_name} />
                        <AvatarFallback className="text-xs font-medium bg-gradient-to-br from-primary/20 to-chart-4/20 text-primary">
                          {user.first_name?.charAt(0)?.toUpperCase()}{user.last_name?.charAt(0)?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium hidden sm:inline-block">
                        {user.first_name}
                      </span>
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 bg-card/90 backdrop-blur-sm border-border/50" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.first_name} {user.last_name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive hover:bg-destructive/10">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => router.push('/login')}
                  className="hover:bg-secondary/80 transition-all duration-300"
                >
                  Login
                </Button>
                <Button 
                  size="sm"
                  onClick={() => router.push('/register')}
                  className="bg-gradient-to-r from-primary to-chart-4 hover:from-primary/90 hover:to-chart-4/90 transition-all duration-300"
                >
                  Sign Up
                </Button>
              </div>
            )}
            
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
} 