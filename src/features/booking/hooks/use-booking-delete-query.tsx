import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Booking, DeleteBookingPayload } from "../types/booking";
import toast from "react-hot-toast";

async function handleDeleteBooking(payload: DeleteBookingPayload) {
    const res = await fetch("/api/booking", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to delete booking");
    }
    return res.json();
}

export default function useDeleteBookingMutation() {
    const queryClient = useQueryClient();

    return useMutation<
        Booking,
        Error,
        DeleteBookingPayload,
        { toastid: string }
    >({
        mutationFn: handleDeleteBooking,
        retry: false,
        onMutate: () => {
            const toastId = toast.loading("Processing your cancellation...");
            return { toastid: toastId };
        },
        onSuccess: (_data, _variables, context) => {
            queryClient.invalidateQueries({ queryKey: ["booking"] });
            toast.success("Booking cancelled!", {
                id: context.toastid,
                duration: 3000,
            });
        },
        onError: (err, _variables, context) => {
            toast.error(
                (
                    <div>
                        <strong className="font-medium">
                            Cancelling booking failed
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
    });
}
