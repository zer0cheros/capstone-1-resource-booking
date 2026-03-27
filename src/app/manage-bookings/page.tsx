import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/features/auth/server/auth-server";
import ManageBookingsScreen from "@/features/manage-bookings/screens/manage-bookings-screen";

export default async function MyListingsPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (session?.user) {
        return (
            <div>
                <ManageBookingsScreen />
            </div>
        );
    }

    return (
        redirect("/login")
    );
}
