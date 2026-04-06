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
    /* RESOURCE MODELS */
    "./src/features/resource/model/resource.ts",
    /* RATING MODELS */
    "./src/features/rating/model/rating.ts",
    /* BOOKING MODELS */
    "./src/features/booking/model/booking.ts",
    /* FAVORITES MODELS */
    "./src/features/favorites/model/favorites.ts",
  ],
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});