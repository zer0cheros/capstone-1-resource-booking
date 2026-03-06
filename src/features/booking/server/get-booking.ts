import db from "@/db";
import { booking } from "../model/booking";
import { eq } from "drizzle-orm";

export async function getBookings(userId: string) {
    const results = await db.select().from(booking).where(eq(booking.userId, userId));
    if (!results.length) throw new Error("insert-failed");
    return results[0]
}





