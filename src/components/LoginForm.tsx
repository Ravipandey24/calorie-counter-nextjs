"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { loginSchema } from "@/lib/validations";
import { authApi } from "@/lib/api";
import { useAuthStore } from "@/lib/auth";
import type { LoginData } from "@/types";
import { Mail, Lock, LogIn, Loader2 } from "lucide-react";
import { AxiosError } from "axios";

interface LoginFormProps {
  callbackUrl?: string;
}

export default function LoginForm({
  callbackUrl = "/dashboard",
}: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginData) => {
    setIsLoading(true);

    try {
      const response = await authApi.login(data);

      await setAuth(response.user, response.token);

      toast.success("Login successful!", {
        description: "Welcome back! Redirecting to your dashboard...",
      });

      // Redirect to callback URL or dashboard
      router.push(callbackUrl);
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        toast.error("Login failed", {
          description:
            error.response.data?.message || "Please check your credentials and try again.",
        });
      } else {
        toast.error("Login failed", {
          description: "Please check your credentials and try again.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <Form {...form}>
        <motion.form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="space-y-4"
          variants={itemVariants}
        >
          {/* Hidden username field for password managers */}
          <input
            type="hidden"
            name="username"
            value={form.watch("email")}
            autoComplete="username"
            readOnly
          />
          
          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    Email
                  </FormLabel>
                  <FormControl>
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        autoComplete="email username"
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        {...field}
                      />
                    </motion.div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-primary" />
                    Password
                  </FormLabel>
                  <FormControl>
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        {...field}
                      />
                    </motion.div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button 
                type="submit" 
                className="w-full gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-200" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <LogIn className="h-4 w-4" />
                )}
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </motion.div>
          </motion.div>
        </motion.form>
      </Form>
    </motion.div>
  );
}
