import { useQuery } from "@tanstack/react-query";

async function fetchResources() {
    const res = await fetch("/api/resource");
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch resources");
    }
    const json = await res.json();
    return json.data;
}

export default function useResourcesQuery() {
    return useQuery({
        queryKey: ["resources"],
        queryFn: fetchResources,
        retry: false
    });
}