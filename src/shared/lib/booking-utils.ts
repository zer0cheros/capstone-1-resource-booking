import { differenceInDays, differenceInHours, differenceInMonths } from "date-fns";
import { Resource } from "@/features/resource/types/resource";

export function calculateBookingTotal(startTime: Date, endTime: Date, resource: Resource) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    let duration = 0;

    if (resource.priceUnit === "hour") {
        duration = differenceInHours(end, start);
    } else if (resource.priceUnit === "month") {
        duration = differenceInMonths(end, start);
    } else {
        duration = differenceInDays(end, start) + 1;
        if (resource.priceUnit === "week") duration = duration / 7;
    }

    const subtotal = duration * resource.price;
    const total = subtotal * 1.05;
    return total;
}