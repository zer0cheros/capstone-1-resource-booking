import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/features/auth/server/auth-server";
import AboutScreen from "@/features/about/screens/about-screen";

export default async function BookingsPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    return <AboutScreen user={session?.user}/>;
}
