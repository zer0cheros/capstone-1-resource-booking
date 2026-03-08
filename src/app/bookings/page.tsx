import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/features/auth/server/auth-server";
import ResourceScreen from "@/features/resource/screens/resource-screen";

export default async function BookingsPage() {

  const session = await auth.api.getSession({
    headers: await headers()
  });

  if(session?.user){
    return(
        <div>
            Bookings
        </div>
    );
  }
  
  return (
    redirect("/login")
  )
}
