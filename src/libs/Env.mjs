/* eslint-disable import/prefer-default-export */
// @ts-ignore
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

// Don't add NODE_ENV into T3 Env, it changes the tree-shaking behavior
// Docs: https://github.com/t3-oss/t3-env
export const Env = createEnv({
  server: {
    NEXTAUTH_SECRET: z.string().min(1),
    NEXTAUTH_URL: z.string().min(1),
  },

  client: {
    NEXT_PUBLIC_BACKEND_API_URL: z.string().min(1),
  },
  runtimeEnv: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_BACKEND_API_URL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  },
});
