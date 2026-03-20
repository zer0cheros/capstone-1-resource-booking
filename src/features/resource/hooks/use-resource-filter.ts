import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { Resource } from "../types/resource";

export default function useResourceFilter (resources: Resource[] | undefined) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentCategory = searchParams.get("category");
    const currentSort = searchParams.get("sort");
    const currentQuery = searchParams.get("query")?.toLocaleLowerCase() || "";

    const setFilter = useCallback((name: string, value: string | null) => {
        const params = new URLSearchParams(searchParams.toString());

        if(value){
            params.set(name, value)
        } else {
            params.delete(name);
        }

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, [pathname, router, searchParams]);

    const clearFilters = () => {
        router.push(pathname, { scroll: false });
    }

    const filteredResources = useMemo(() => {
        if(!resources) return [];

        let result = resources.filter((res) => {
            const matchesSearch =
                res.name.toLocaleLowerCase().includes(currentQuery) ||
                res.description?.toLocaleLowerCase().includes(currentQuery);

            const matchesCategory = currentCategory
                ? res.category === currentCategory
                : true;

            return matchesSearch && matchesCategory;
        });

        result.sort((a, b) => {
            switch (currentSort){
                case "price_asc":
                    return a.price - b.price;
                case "price_desc":
                    return b.price - a.price;
                case "name_asc":
                    return a.name.localeCompare(b.name);
                case "date_desc":
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                default:
                    return 0;
            }
        });

        return result;
    }, [resources, currentCategory, currentSort, currentQuery]);

    return {
        setFilter,
        clearFilters,
        currentCategory,
        currentSort,
        filteredResources
    }
}