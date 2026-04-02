import { useInfiniteQuery } from "@tanstack/react-query";

async function fetchResourceInfinite({ pageParam, limit = 10 }: {
    pageParam?: string | null,
    limit?: number,
}) {
    const params = new URLSearchParams({
        limit: limit.toString(),
    });

    if(pageParam) params.append("cursor", pageParam);

    const res = await fetch(`/api/resource?${params.toString()}`);
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch resources");
    }
    return res.json();
}

export default function useInfiniteResourcesQuery(limit = 10) {
    return useInfiniteQuery({
        queryKey: ["resources", "infinite", { limit }],
        queryFn: ({ pageParam }) => fetchResourceInfinite({ pageParam, limit }),
        initialPageParam: null,
        getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
        placeholderData: (previousData) => previousData,
    });
};