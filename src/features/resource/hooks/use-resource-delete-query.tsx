import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeletePayload, Resource } from "../types/resource";
import toast from "react-hot-toast";

async function handleDeleteResource(payload: DeletePayload) {
    const res = await fetch(`/api/resource/${payload.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to delete resource");
    }
    return res.json();
}

export default function useDeleteResourceMutation() {
    const queryClient = useQueryClient();

    return useMutation<
        Resource,
        Error,
        DeletePayload,
        { toastid: string }
    >({
        mutationFn: handleDeleteResource,
        retry: false,
        onMutate: () => {
            const toastId = toast.loading("Processing your deletion...");
            return { toastid: toastId };
        },
        onSuccess: (_data, _variables, context) => {
            queryClient.invalidateQueries({ queryKey: ["resources"] });
            toast.success("Resource deleted!", {
                id: context.toastid,
                duration: 3000,
            });
        },
        onError: (err, _variables, context) => {
            toast.error(
                (
                    <div>
                        <strong className="font-medium">
                            Deleting resource failed
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
