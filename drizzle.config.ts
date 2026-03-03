import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './src/db/migrations',
  schema: [

    /* AUTH MODELS */
    "./src/features/auth/models/user.ts",
    "./src/features/auth/models/account.ts",
    "./src/features/auth/models/session.ts",
    "./src/features/auth/models/verification.ts",
    
  ],
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});