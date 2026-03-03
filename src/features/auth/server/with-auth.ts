import { headers } from "next/headers";
import { Session } from "../types/session";
import { auth } from "./auth-server";
import { NextResponse } from "next/server";

/**
 * Use to protect API-routes to only be accessible by authorized users.
 * @returns 
 */
export async function withAuth(
  roles: Array<string>,
  handler: (session: Session) => Promise<Response>
): Promise<Response> {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session || !session.user) {
    return NextResponse.json(
      { error: "You are not authorized to perform this action." },
      { status: 401 }
    );
  }

  const hasRole = roles.findIndex(r => r === session.user.role) >= 0;
  if(!hasRole) {
    return NextResponse.json(
      { error: "You are not authorized to perform this action." },
      { status: 401 }
    );
  }

  return handler(session);
}