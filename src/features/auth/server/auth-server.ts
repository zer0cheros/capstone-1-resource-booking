import db from "@/db";
import { user } from "@/features/auth/models/user";
import { account } from "@/features/auth/models/account";
import { session } from "@/features/auth/models/session";
import { verification } from "@/features/auth/models/verification";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      account,
      session,
      verification
    }
  }),
  user: {
    additionalFields: {
      role: {
        type: "string",
        fieldName: "role",
        input: false,
        defaultValue: "user",
      } 
    }
  },
  emailAndPassword: {
    enabled: false
  },
  emailVerification: {
    sendOnSignUp: false,
    sendOnSignIn: false
  },
  socialProviders: {
    github: { 
      clientId: process.env.GITHUB_CLIENT_ID as string, 
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    }
  }
});
