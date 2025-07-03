# 🥗 Calorie Counter Frontend

A modern Next.js application for tracking calories with server-side authentication, USDA FoodData Central API integration, and advanced UI components.

## ✨ Key Features

- **🔐 SSR Authentication**: JWT verification with route protection and auto-refresh
- **🎨 Modern UI**: Tailwind CSS v4 + shadcn/ui + custom Magic UI components
- **📊 Real-time Tracking**: USDA API integration with macro nutrition breakdown
- **🌙 Dark Mode**: Complete theme support with system detection
- **📱 Responsive**: Mobile-first design with interactive charts
- **⚡ Performance**: Turbopack dev builds, code splitting, and optimizations

## 🚀 Tech Stack

**Core**: Next.js 15 (App Router) • React 19 • TypeScript • pnpm  
**UI**: Tailwind CSS v4 • shadcn/ui • Framer Motion • Lucide React  
**State**: Zustand with persistence • React Hook Form • Zod validation  
**Auth**: JOSE (JWT) • HTTP-only cookies • Next.js middleware  
**Data**: Axios with interceptors • @t3-oss/env-nextjs

## 🚀 Quick Start

```bash
# 1. Setup environment
cp .env.example .env.local
# Edit .env.local with your configuration

# 2. Install and run
pnpm install
pnpm dev
# Open http://localhost:3000
```

### Environment Variables
| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_BASE_URL` | ✅ | Backend API URL (e.g., `http://localhost:3001`) |
| `JWT_SECRET` | ✅ | JWT secret key (min 32 chars, must match backend) |

**Generate JWT secret**: `openssl rand -base64 32`

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout + providers
│   │   ├── page.tsx           # Landing page
│   │   ├── dashboard/         # Protected calorie tracking
│   │   ├── login/             # Authentication pages
│   │   └── register/
│   │
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui base components
│   │   ├── magicui/          # Custom animated components
│   │   ├── DashboardContent.tsx  # Main dashboard logic
│   │   ├── MealForm.tsx      # Calorie input form
│   │   ├── ResultCard.tsx    # Nutrition display
│   │   └── [Auth/Layout components]
│   │
│   ├── lib/                  # Utilities & configuration
│   │   ├── auth.ts          # Zustand auth store
│   │   ├── auth-server.ts   # Server-side auth utils
│   │   ├── api.ts           # Axios HTTP client
│   │   └── validations.ts   # Zod schemas
│   │
│   ├── hooks/               # Custom React hooks
│   ├── types/               # TypeScript definitions
│   ├── env.ts              # Environment validation
│   └── middleware.ts       # Route protection
│
├── public/                 # Static assets
└── [Config files]         # Next.js, Tailwind, TypeScript, etc.
```

## 🏛️ Architecture & Implementation

### 🔄 Authentication Flow
```
User Request → Middleware → JWT Verification → Route Protection
                    ↓
Protected Routes: /dashboard (auth required)
Auth Routes: /login, /register (redirect if authenticated)
```

### 🧠 State Management
- **Auth Store**: Zustand with persistence + HTTP-only cookies
- **Meal State**: Local component state with auto-increment IDs
- **Form State**: React Hook Form + Zod validation
- **Theme State**: next-themes with system detection

### 🎨 Component Architecture
```
Layout: RootLayout → ThemeProvider → ServerHeader → Content → Footer
Dashboard: DashboardContent → MealForm + ResultCard[] + Charts
Auth: LoginForm/RegisterForm → API calls → Auth store updates
UI: shadcn/ui base + Magic UI animations + Custom components
```

## 🔗 API Integration

### Endpoints
```typescript
// Authentication
POST /register { first_name, last_name, email, password }
POST /login { email, password }

// Calorie Tracking
POST /get-calories { dish_name: string, servings: number }
// Returns: { total_calories, macronutrients, usda_matches, confidence_level }

// Health Check
GET /health
```

### HTTP Client Features
- **Auto-token injection**: Axios interceptors add JWT to requests
- **Error handling**: 401 → auto-logout, 429 → rate limit countdown
- **Retry logic**: Exponential backoff for network errors
- **Toast notifications**: User-friendly error messages

### Security
- **JWT verification**: Server-side with JOSE library
- **HTTP-only cookies**: Secure token storage for SSR
- **CSRF protection**: SameSite=strict cookies
- **Rate limiting**: Backend integration with countdown UI

## 🎨 UI & Design System

### Component Libraries
- **shadcn/ui**: Button, Card, Form, Input, Chart, Avatar, etc.
- **Magic UI**: Aurora Text, Number Ticker, Box Reveal, Dot Pattern
- **Custom**: Dashboard, Meal tracking, Authentication components

### Theme & Styling
- **CSS Framework**: Tailwind CSS v4 with custom design tokens
- **Dark Mode**: System detection + manual toggle with next-themes
- **Typography**: Manrope font with optimized loading
- **Animations**: Framer Motion + CSS transitions

### Charts & Data Visualization
- **Library**: Recharts with custom theming
- **Types**: Bar charts (calorie comparison), Pie charts (daily needs)
- **Features**: Responsive, theme-aware, animated transitions

## 🚀 Development & Production

### Development Setup
```bash
# Environment
cp .env.example .env.local  # Configure API_URL and JWT_SECRET

# Development
pnpm dev          # Turbopack dev server (10x faster)
pnpm lint         # ESLint + TypeScript checks
pnpm type-check   # TypeScript compilation

# Production
pnpm build        # Optimized production build
pnpm start        # Production server
```

### Code Quality
- **TypeScript**: Strict mode with comprehensive type checking
- **ESLint**: Next.js + TypeScript rules with error enforcement
- **Environment**: Type-safe validation with @t3-oss/env-nextjs
- **Forms**: React Hook Form + Zod runtime validation

### Performance Features
- **Turbopack**: Ultra-fast development builds
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js automatic WebP/AVIF conversion
- **Bundle Analysis**: Built-in analyzer for optimization

## �️ Security & Best Practices

### Security Implementation
- **JWT Security**: JOSE library with 32+ character secrets
- **HTTP-only Cookies**: Secure token storage with SameSite=strict
- **Route Protection**: Middleware-based authentication verification
- **CSRF Protection**: SameSite cookies prevent cross-site attacks
- **Environment Validation**: Runtime type checking prevents misconfigurations

### Code Quality Standards
- **TypeScript Strict Mode**: Comprehensive type checking with strict rules
- **ESLint Enforcement**: Next.js + TypeScript rules with error prevention
- **Form Validation**: Runtime Zod schemas with user-friendly error messages
- **Error Boundaries**: Graceful error handling with toast notifications

## 🌐 Browser Support

**Modern Browsers**: Chrome/Edge 88+, Firefox 78+, Safari 14+, Mobile Chrome/Safari  
**Performance Targets**: LCP < 2.5s, FID < 100ms, CLS < 0.1

## 🤝 Contributing

### Development Workflow
```bash
git clone <repository> && cd frontend
pnpm install && cp .env.example .env.local
# Edit .env.local with your API URL and JWT secret
pnpm dev
```

### Code Style Guidelines
- **Components**: Use TypeScript interfaces, handle loading states, include error boundaries
- **Forms**: React Hook Form + Zod validation with proper error handling
- **API Calls**: Use try/catch with toast notifications for user feedback
- **State**: Prefer server state (API) over client state when possible

## 🆘 Troubleshooting

### Common Issues
- **JWT Error**: Generate 32+ character secret with `openssl rand -base64 32`
- **API Connection**: Verify backend running and CORS_ORIGIN configured
- **Styling Issues**: Restart dev server after Tailwind config changes
- **Build Errors**: Check TypeScript errors with `pnpm type-check`

### Debug Commands
```bash
rm -rf .next                    # Clear Next.js cache
rm -rf node_modules pnpm-lock.yaml && pnpm install  # Reset dependencies
pnpm build && npx @next/bundle-analyzer  # Analyze bundle size
```

## � Documentation

- [Next.js 15](https://nextjs.org/docs) - React framework
- [Tailwind CSS v4](https://tailwindcss.com/docs) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com) - Component library
- [Zustand](https://docs.pmnd.rs/zustand) - State management
- [Zod](https://zod.dev) - Schema validation

---

**Built with ❤️ using Next.js 15, TypeScript, and modern web technologies.**
