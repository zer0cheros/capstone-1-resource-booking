import db from "@/db";
import { booking } from "../model/booking";
import { createId } from "@paralleldrive/cuid2";
import { CreateBookingInput } from "../validation/create-booking-validation";

export async function createBooking(input: CreateBookingInput) {
    const results = await db.insert(booking).values({
        id: createId(),
        userId: input.userId,
        resourceId: input.resourceId,
        startTime: new Date(input.startTime),
        endTime: new Date(input.endTime),
    }).returning();
    if (!results.length) throw new Error("insert-failed");
    return results[0];
}