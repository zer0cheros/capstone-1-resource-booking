import { getBookings } from "@/features/booking/server/get-booking";
import { createBooking } from "@/features/booking/server/create-booking";
import { updateBooking } from "@/features/booking/server/update-booking";
import { auth } from "@/features/auth/server/auth-server";
import { headers } from "next/headers";
import { deleteBooking } from "@/features/booking/server/delete-booking";
import { createBookingSchema } from "@/features/booking/validation/create-booking-validation";

export async function GET() {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return new Response("Unauthorized", { status: 401 });
    const bookings = await getBookings(session.user.id);
    return new Response(JSON.stringify(bookings), { status: 200 });
}

export async function POST(req: Request) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return new Response("Unauthorized", { status: 401 });

    const body = await req.json();
    const parsed = createBookingSchema.parse({
        ...body,
        userId: session.user.id,
    });

    const booking = await createBooking(parsed);
    return new Response(JSON.stringify(booking), { status: 200 });
}

export async function PUT(req: Request) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return new Response("Unauthorized", { status: 401 });
    const body = await req.json();
    const booking = await updateBooking(body.id, body);
    return new Response(JSON.stringify(booking), { status: 200 });
}

export async function DELETE(req: Request) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return new Response("Unauthorized", { status: 401 });
    const body = await req.json();
    const booking = await deleteBooking(body.id, body);
    return new Response(JSON.stringify(booking), { status: 200 });
}