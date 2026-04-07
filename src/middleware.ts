import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {

	return NextResponse.next();
}
export const config = {
  matcher: ["/"],
};
