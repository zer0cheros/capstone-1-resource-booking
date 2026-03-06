import { z } from "zod";

export const createBookingSchema = z.object({
    resourceId: z.string().min(1, "Resource ID is required"),
    userId: z.string().min(1, "User ID is required"),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required")
});

export const updateBookingSchema = z.object({
    id: z.string().min(1, "Booking ID is required"),
    resourceId: z.string().min(1, "Resource ID is required"),
    userId: z.string().min(1, "User ID is required"),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required")
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type UpdateBookingInput = z.infer<typeof updateBookingSchema>;