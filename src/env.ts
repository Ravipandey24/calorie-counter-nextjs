import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    JWT_SECRET: z
      .string()
      .min(32)
      .describe("JWT secret key for token verification (min 32 characters)"),
  },
  client: {
    NEXT_PUBLIC_API_BASE_URL: z
      .string()
      .url()
      .describe("Base URL for the backend API"),
  },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  runtimeEnv: {
    JWT_SECRET: process.env.JWT_SECRET,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
}); 