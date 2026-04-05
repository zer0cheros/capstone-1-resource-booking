import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/features/auth/server/auth-server";
import ProfileScreen from "@/features/profile/screens/profile-screen";

export default async function ProfilePage() {

  const session = await auth.api.getSession({
    headers: await headers()
  });

  if(session?.user){
    return(
        <div>
            <ProfileScreen user={session.user} />
        </div>
    );
  }
  
  return (
    redirect("/login")
  )
}
