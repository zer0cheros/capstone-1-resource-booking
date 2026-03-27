import { Resource } from "@/features/resource/types/resource";

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export type IncomingRequest = {
    id: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
    status: BookingStatus;
    user: {
        name: string;
        image?: string | null;
    };
    resource: Pick<Resource, "name" | "image">;
};

export type updateBookingsRequestPayload = {
    id: string;
    status: BookingStatus;
}