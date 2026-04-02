import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Resource, UpdatePayload } from "../types/resource";
import toast from "react-hot-toast";

async function handleUpdateResource(payload: FormData) {
    const id = payload.get("id");
    const res = await fetch(`/api/resource/${id}`, {
        method: "PUT",
        body: payload,
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to delete resource");
    }
    return res.json();
}

export default function useUpdateResourceMutation() {
    const queryClient = useQueryClient();

    return useMutation<
        Resource,
        Error,
        FormData,
        { toastid: string }
    >({
        mutationFn: handleUpdateResource,
        retry: false,
        onMutate: () => {
            const toastId = toast.loading("Processing your update...");
            return { toastid: toastId };
        },
        onSuccess: (_data, _variables, context) => {
            queryClient.invalidateQueries({ queryKey: ["resources"] });
            toast.success("Resource updated!", {
                id: context.toastid,
                duration: 3000,
            });
        },
        onError: (err, _variables, context) => {
            toast.error(
                (
                    <div>
                        <strong className="font-medium">
                            Updating resource failed
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
