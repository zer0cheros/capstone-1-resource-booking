import db from "@/db";
import { booking } from "../model/booking";
import { eq } from "drizzle-orm";
import { Booking } from "../types/booking";

export async function deleteBooking(id: string) {
    const results = await db.delete(booking).where(eq(booking.id, id)).returning();
    if (!results.length) throw new Error("insert-failed");
    return results[0]
}