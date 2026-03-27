import { useQuery } from "@tanstack/react-query";

async function getBookingsRequests() {
    const res = await fetch("/api/manage-bookings");
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch booking requests");
    }
    return res.json();
}

export default function useManageBookingsQuery() {
    return useQuery({
        queryKey: ["manage-bookings"],
        queryFn: getBookingsRequests,
        retry: false,
    });
}