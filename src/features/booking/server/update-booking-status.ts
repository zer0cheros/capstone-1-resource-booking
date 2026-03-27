import db from "@/db";
import { booking } from "@/features/booking/model/booking";
import { resource } from "@/features/resource/model/resource";
import { eq } from "drizzle-orm";

type BookingStatus = "pending" | "confirmed" | "cancelled";

export async function updateIncomingBookingStatus(params: {
    bookingId: string;
    ownerId: string;
    status: BookingStatus;
}) {
    const { bookingId, ownerId, status } = params;

    const rows = await db
        .select({
            bookingId: booking.id,
            resourceOwnerId: resource.userId,
        })
        .from(booking)
        .innerJoin(resource, eq(booking.resourceId, resource.id))
        .where(eq(booking.id, bookingId));

    if (!rows.length) throw new Error("not-found");
    if (rows[0].resourceOwnerId !== ownerId) throw new Error("forbidden");

    const updated = await db
        .update(booking)
        .set({ status })
        .where(eq(booking.id, bookingId))
        .returning();

    if (!updated.length) throw new Error("not-found");
    return updated[0];
}

