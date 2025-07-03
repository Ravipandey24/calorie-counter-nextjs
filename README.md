# Calorie Counter Frontend

A modern Next.js frontend application for tracking calorie information with server-side authentication and SSR support.

## Features

- **Server-Side Authentication**: Full SSR support with JWT verification
- **Route Protection**: Middleware-based authentication with automatic redirects
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **State Management**: Zustand with persistence and SSR compatibility
- **Type Safety**: Full TypeScript support with runtime environment validation
- **Dark Mode**: Complete theme support with system detection
- **Responsive Design**: Mobile-first approach with modern UX patterns

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand with persistence
- **Validation**: Zod with react-hook-form
- **Authentication**: JWT with server-side verification
- **HTTP Client**: Axios with interceptors
- **Package Manager**: pnpm

## Quick Start

### 1. Environment Setup

Copy the example environment file and configure it:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Backend API URL (required)
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001

# JWT Secret Key - MUST match your backend (required)
JWT_SECRET=your-super-secure-jwt-secret-key-minimum-32-characters-long
```

**⚠️ Important Notes:**
- The `JWT_SECRET` must be **at least 32 characters long**
- The `JWT_SECRET` must **exactly match** the one used by your backend
- Never commit `.env.local` to version control
- Generate a secure JWT secret with: `openssl rand -base64 32`

### 2. Installation & Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open http://localhost:3000
```

## Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | ✅ Yes | Backend API base URL | `http://localhost:3001` |
| `JWT_SECRET` | ✅ Yes | JWT secret key (min 32 chars) | Generated with `openssl rand -base64 32` |
| `SKIP_ENV_VALIDATION` | ❌ No | Skip env validation during build | `true` |

### Environment Validation

This project uses [@t3-oss/env-nextjs](https://env.t3.gg/) for type-safe environment validation:

- **Build-time validation**: Invalid configuration prevents deployment
- **Runtime type safety**: Full TypeScript support for environment variables
- **Auto-completion**: IntelliSense for all environment variables

## Authentication System

### Server-Side Authentication
- JWT tokens are verified on the server using middleware
- Protected routes automatically redirect to login
- Auth state is available in server components
- Full SSR support with hydration safety

### Route Protection
The middleware automatically handles:
- Redirecting unauthenticated users from protected routes
- Redirecting authenticated users away from auth pages
- Setting auth headers for server components
- Callback URL support for post-login redirection

### Protected Routes
- `/dashboard` - Requires authentication
- `/login` - Redirects to dashboard if authenticated
- `/register` - Redirects to dashboard if authenticated

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── dashboard/         # Protected dashboard page
│   ├── login/            # Login page with SSR auth check
│   ├── register/         # Registration page with SSR auth check
│   └── layout.tsx        # Root layout with providers
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   ├── AuthProvider.tsx # Zustand hydration provider
│   ├── Header.tsx       # Navigation with auth state
│   ├── ServerHeader.tsx # SSR wrapper for Header
│   └── ...              # Feature components
├── lib/                 # Utility libraries
│   ├── auth.ts         # Client-side auth store
│   ├── auth-server.ts  # Server-side auth utilities
│   ├── api.ts          # HTTP client configuration
│   └── validations.ts  # Zod schemas
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── env.ts              # Environment validation
└── middleware.ts       # Next.js middleware for route protection
```

## API Integration

### Authentication Endpoints
- `POST /register` - User registration
- `POST /login` - User authentication

### Application Endpoints  
- `POST /get-calories` - Get calorie information for dishes

### Error Handling
- Automatic token refresh on 401 responses
- Consistent error messaging with toast notifications
- Network error handling with user feedback

## Development Features

### Type Safety
- Complete TypeScript coverage
- Runtime environment validation with @t3-oss/env-nextjs
- Zod schemas for all API requests/responses

### State Management
- Zustand store with persistence
- SSR-compatible hydration
- Automatic cookie management for server-side access

### Styling
- shadcn/ui design system
- Consistent color variables
- Dark/light mode support
- Responsive design patterns

## Building for Production

1. Build the application:
   ```bash
   pnpm build
   ```

2. Start the production server:
   ```bash
   pnpm start
   ```

## Security Features

- Server-side JWT verification
- HTTP-only cookie support
- CSRF protection via SameSite cookies
- Secure cookie flags in production
- Environment variable validation
- Route-level authentication middleware

## Browser Support

- Chrome/Edge 88+
- Firefox 78+
- Safari 14+
- Modern mobile browsers

## Contributing

1. Follow the existing code style and patterns
2. Add TypeScript types for all new features
3. Include proper error handling and loading states
4. Test authentication flows thoroughly
5. Update documentation for new features
