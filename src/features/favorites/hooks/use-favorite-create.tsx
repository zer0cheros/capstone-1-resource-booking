import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateFavoriteInput } from "../types/favorites";
import { Favorites as FavoritesTypes } from "../types/favorites";
import toast from "react-hot-toast";

async function handleCreateFavorite(
    input: CreateFavoriteInput,
): Promise<FavoritesTypes> {
    const res = await fetch("/api/resource/favorite", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to create favorite");
    }
    return res.json();
}

export default function useCreateFavoriteMutation() {
    const queryClient = useQueryClient();
    return useMutation<
        FavoritesTypes,
        Error,
        CreateFavoriteInput,
        { previousFavorites?: FavoritesTypes[] }
    >({
        mutationFn: async (input) => await handleCreateFavorite(input),
        retry: false,
        onMutate: async (newfavorites) => {
            await queryClient.cancelQueries({ queryKey: ["favorites"] });

            const previousFavorites = queryClient.getQueryData<
                FavoritesTypes[]
            >(["favorites"]);

            queryClient.setQueryData<FavoritesTypes[]>(
                ["favorites"],
                (old = []) => {
                    const exits = old.some((f) =>
                        f.resourceId === newfavorites.resourceId
                    );

                    if (exits) {
                        return old.filter((f) =>
                            f.resourceId !== newfavorites.resourceId
                        );
                    } else {
                        return [
                            ...old,
                            {
                                resourceId: newfavorites.resourceId,
                                id: Math.random(),
                                createdAt: new Date(),
                                userId: "temp",
                            } as FavoritesTypes,
                        ];
                    }
                },
            );

            return { previousFavorites };
        },
        onError: (err, newFavorite, context) => {
            if (context?.previousFavorites) {
                queryClient.setQueryData(
                    ["favorites"],
                    context.previousFavorites,
                );
            }
            toast.error("Couldn't update favorite. Try again.");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["favorites"] });
        },
    });
}
