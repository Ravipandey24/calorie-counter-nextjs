import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import ServerHeader from "@/components/ServerHeader";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { Manrope } from "next/font/google";

export const metadata: Metadata = {
  title: "Calorie Counter",
  description: "Track your daily calorie intake with ease",
};

const manrope = Manrope({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div suppressHydrationWarning className="min-h-screen bg-background flex flex-col">
            <ServerHeader />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
