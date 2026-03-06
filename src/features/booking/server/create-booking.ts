import db from "@/db";
import { booking } from "../model/booking";
import { Booking } from "../types/booking";

export async function createBooking(data: Booking) {
    const results = await db.insert(booking).values(data).returning();
    if (!results.length) throw new Error("insert-failed");
    return results[0]
}