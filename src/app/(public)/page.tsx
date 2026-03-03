import { headers } from "next/headers";
import { auth } from "@/features/auth/server/auth-server";
import LogoutButton from "@/features/auth/components/logout-button";

export default async function IndexPage() {
  // This page is server rendererd.

  const session = await auth.api.getSession({
    headers: await headers()
  });


  if(session?.user) {
    return (
      <div>
        Hello {session.user.name}<br />
        <LogoutButton />
      </div>
    )
  }

  return (
    <div>
      Index page
    </div>
  )
}
