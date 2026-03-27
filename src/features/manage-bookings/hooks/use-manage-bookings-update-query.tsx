import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBookingsRequestPayload } from "../types/manage-bookings";
import { Booking } from "@/features/booking/types/booking";
import toast from "react-hot-toast";

async function updateBookingsRequest (payload: updateBookingsRequestPayload) {
    const res = await fetch("/api/manage-bookings", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to update booking");
    }
    return res.json();
}

export default function useManageBookingsMutation () {
    const queryClient = useQueryClient();

    return useMutation<
        Booking,
        Error,
        updateBookingsRequestPayload,
        { toastid: string }
    >({
        mutationFn: updateBookingsRequest,
        retry: false,
        onMutate: () => {
            const toastId = toast.loading("Processing your update...");
            return { toastid: toastId }; 
        },
        onSuccess: (_data, _variables, context) => {
            queryClient.invalidateQueries({ queryKey: ["manage-bookings"] });
            toast.success("Booking status updated!", {
                id: context.toastid,
                duration: 3000,
            });
        },
        onError: (err, _variables, context) => {
            toast.error(
                (
                    <div>
                        <strong className="font-medium">
                            Update status failed
                        </strong>
                        <p className="text-sm">{err.message}</p>
                    </div>
                ),
                {
                    id: context?.toastid,
                    duration: 4000,
                },
            );
        },
    })
}