import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { auth } from "../server/auth-server";

export const { signIn, signUp, signOut, useSession, getSession } = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
});