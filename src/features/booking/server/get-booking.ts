import db from "@/db";
import { booking } from "../model/booking";
import { resource } from "@/features/resource/model/resource";
import { user } from "@/features/auth/models/user";
import { eq, desc } from "drizzle-orm";

// 1. Existing function (Keep this)
export async function getBookings(userId: string) {
    return await db.select().from(booking).where(eq(booking.userId, userId));
}

// 2. NEW function for the "Manage Requests" page
export async function getIncomingBookings(ownerId: string) {
    const results = await db
        .select({
            id: booking.id,
            status: booking.status,
            startTime: booking.startTime,
            endTime: booking.endTime,
            createdAt: booking.createdAt,
            resourceName: resource.name,
            resourceImage: resource.image,
            price: resource.price,
            priceUnit: resource.priceUnit,
            renterName: user.name,
            renterImage: user.image,
        })
        .from(booking)
        .innerJoin(resource, eq(booking.resourceId, resource.id))
        .innerJoin(user, eq(booking.userId, user.id))
        .where(eq(resource.userId, ownerId))
        .orderBy(desc(booking.createdAt));

    return results;
}