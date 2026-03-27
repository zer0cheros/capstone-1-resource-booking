import { auth } from "@/features/auth/server/auth-server";
import { headers } from "next/headers";
import { getIncomingBookings } from "@/features/booking/server/get-booking";
import { updateIncomingBookingStatus } from "../../../features/booking/server/update-booking-status";

export async function GET() {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
        return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const bookings = await getIncomingBookings(session.user.id);

        return Response.json(bookings, { status: 200 });
    } catch (error) {
        console.error("API Error:", error);
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
        return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    let body: unknown;
    try {
        body = await req.json();
    } catch {
        return Response.json({ message: "Invalid JSON body" }, { status: 400 });
    }

    const { id, status } = (body ?? {}) as { id?: unknown; status?: unknown };

    if (typeof id !== "string" || !id) {
        return Response.json({ message: "Missing booking id" }, { status: 400 });
    }

    if (status !== "pending" && status !== "confirmed" && status !== "cancelled") {
        return Response.json({ message: "Invalid booking status" }, { status: 400 });
    }

    try {
        const updated = await updateIncomingBookingStatus({
            bookingId: id,
            ownerId: session.user.id,
            status,
        });

        return Response.json(updated, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === "not-found") {
                return Response.json({ message: "Booking not found" }, { status: 404 });
            }
            if (error.message === "forbidden") {
                return Response.json({ message: "Forbidden" }, { status: 403 });
            }
        }
        console.error("API Error:", error);
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
}