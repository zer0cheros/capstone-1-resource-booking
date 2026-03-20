import { useQuery } from "@tanstack/react-query";

async function fetchBookings () {
    const res = await fetch("/api/booking");
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch resources");
    }
    return res.json();
}

export default function useBookingQuery(){
    return useQuery({
        queryKey: ["booking"],
        queryFn: fetchBookings,
        retry: false,
    })
}