import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Booking, CreateBookingPayload } from "../types/booking";
import toast from "react-hot-toast";

async function handleCreateBooking(payload: CreateBookingPayload) {
    const res = await fetch("/api/booking", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to create resource");
    }
    return res.json();
}

export default function useCreateBookingMutation() {
    const queryClient = useQueryClient();

    return useMutation<
        Booking,
        Error,
        CreateBookingPayload,
        { toastid: string }
    >({
        mutationFn: handleCreateBooking,
        retry: false,
        onMutate: () => {
            const toastId = toast.loading("Processing your booking...");
            return { toastid: toastId };
        },
        onSuccess: (_data, _variables, context) => {
            queryClient.invalidateQueries({ queryKey: ["booking"] });
            toast.success("Booking confirmed!", {
                id: context.toastid,
                duration: 3000,
            });
        },
        onError: (err, _variables, context) => {
            toast.error(
                (
                    <div>
                        <strong className="font-medium">Booking failed</strong>
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
