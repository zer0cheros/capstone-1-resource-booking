import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/features/auth/server/auth-server";
import SignInScreen from "@/features/auth/screens/sign-in-screen";

export default async function LoginPage() {

  const session = await auth.api.getSession({
    headers: await headers()
  });

  if(session)
    return redirect('/');
  
  return (
    <SignInScreen />
  )
}
