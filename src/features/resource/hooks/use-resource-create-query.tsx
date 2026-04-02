import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Resource } from "../types/resource";

async function handleCreateResource(formData: FormData) {
    const res = await fetch("/api/resource", {
        method: "POST",
        body: formData,
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to create resource");
    }
    return res.json();
}

export default function useCreateResourceMutation() {
    const queryClient = useQueryClient();
    return useMutation<
        Resource,
        Error,
        FormData,
        { toastId: string }
    >({
        mutationFn: async (formData) => await handleCreateResource(formData),
        retry: false,
        onMutate: () => {
            const toastId = toast.loading("Creating resource...");
            return { toastId };
        },
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ["resources"] });
            toast.success("Resource created", {
                id: context.toastId,
                duration: 2000,
            });
        },
        onError: (err, _, context) => {
            toast.error(
                (
                    <div>
                        <strong className="font-medium">
                            Företagsskapandet misslyckades
                        </strong>
                        <p>{err.message}</p>
                    </div>
                ),
                {
                    id: context?.toastId,
                    duration: 3000,
                },
            );
        },
    });
}
