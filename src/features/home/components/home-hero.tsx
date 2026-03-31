"use client";

import {
    ArrowRight,
    Building2,
    Car,
    Layers,
    Monitor,
    Package,
    Sparkles,
    Wrench,
} from "lucide-react";
import {
    Combobox,
    ComboboxCollection,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxGroup,
    ComboboxInput,
    ComboboxItem,
    ComboboxLabel,
    ComboboxList,
    ComboboxSeparator,
} from "@/shared/components/ui/combobox";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import useResourcesQuery from "@/features/resource/hooks/use-resource-query";
import useResourceFilter from "@/features/resource/hooks/use-resource-filter";

export default function HomeHero({ userName }: { userName: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [search, setSearch] = useState(searchParams.get("query") ?? "");

    const { data: allResources } = useResourcesQuery();

    const { filteredResources } = useResourceFilter(allResources);

    useEffect(() => {
        setSearch(searchParams.get("query") ?? "");
    }, [searchParams]);

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }

        replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 400);

    const resources = [
        {
            value: "Matches",
            items: search.length > 0
                ? filteredResources.map((res) => ({
                    id: res.id,
                    label: res.name,
                    type: "resource",
                }))
                : [],
        },
        {
            value: "Categories",
            items: [
                "Vehicles & Transport",
                "Apartments & Spaces",
                "Tools & Equipment",
                "Office & Tech",
            ].map((cat) => ({
                id: cat,
                label: cat,
                type: "category",
            })),
        },
        {
            value: "All resources",
            items: [{
                id: "view-all",
                label: "View all results",
                type: "action",
            }],
        },
    ];

    const categoryIcons: Record<string, any> = {
        "Vehicles & Transport": Car,
        "Apartments & Spaces": Building2,
        "Tools & Equipment": Wrench,
        "Office & Tech": Monitor,
    };

    const activeGroups = resources.filter((group) => group.items.length > 0);

    return (
        <div className="relative py-20 px-8 rounded-[3rem] bg-slate-900 overflow-hidden shadow-2xl">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gb-blue/20 to-transparent pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 size-96 bg-gb-blue/10 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-2xl space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gb-blue text-xs font-black uppercase tracking-widest">
                    <Sparkles size={14} />
                    Welcome back, {userName.split(" ")[1]}
                </div>

                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9]">
                    Find. Rent. <br />
                    <span className="text-gb-blue text-outline">Simplify.</span>
                </h1>

                <p className="text-slate-400 text-lg font-medium max-w-md">
                    Everything you need, exactly when you need it. Search
                    thousands of local resources.
                </p>

                <div className="relative max-w-xl w-full">
                    <Combobox
                        items={activeGroups}
                        onValueChange={(id) => {
                            const flatItems = resources.flatMap((g) => g.items);
                            const selectedItem = flatItems.find((i) =>
                                i.id === id
                            );

                            if (!selectedItem) return;

                            if (selectedItem.type === "resource") {
                                replace(`/resources/${selectedItem.id}`);
                            } else if (selectedItem.type === "category") {
                                replace(
                                    `/resources?category=${selectedItem.id}`,
                                );
                            } else if (selectedItem.type === "action") {
                                replace(`/resources`);
                            }
                        }}
                    >
                        {/* <div className="flex items-center bg-white p-2 rounded-[2rem] shadow-2xl border border-slate-100 focus-within:ring-4 ring-gb-blue/20 transition-all"> */}
                            <ComboboxInput
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    handleSearch(e.target.value);
                                }}
                                placeholder="Search for resources..."
                                className="h-14 w-full !bg-white border border-slate-100 shadow-2xl rounded-[2rem] px-6 text-lg font-medium transition-all"
                            />
                        {/* </div> */}

                        <ComboboxContent className="absolute top-full left-0 right-0 mt-3 z-50 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
                            <ComboboxEmpty className="p-8 text-center text-slate-400 font-medium">
                                No results found.
                            </ComboboxEmpty>
                            <ComboboxList className="max-h-[400px] overflow-y-auto">
                                {(group, index) => (
                                    <ComboboxGroup
                                        key={group.value}
                                        items={group.items}
                                        className="p-2"
                                    >
                                        <ComboboxLabel className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                            {group.value}
                                        </ComboboxLabel>
                                        <ComboboxCollection>
                                            {(item) => {
                                                const ItemIcon =
                                                    item.type === "resource"
                                                        ? Package
                                                        : categoryIcons[
                                                            item.label
                                                        ] || Layers;

                                                return (
                                                    <ComboboxItem
                                                        key={item.id}
                                                        value={item.id}
                                                        className="flex items-center gap-4 px-2 pb-2 rounded-[1.5rem] cursor-pointer transition-all data-[highlighted]:bg-gb-blue/5 data-[highlighted]:text-gb-blue group"
                                                    >
                                                        <div className="size-10 shrink-0 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-data-[highlighted]:bg-white group-data-[highlighted]:text-gb-blue group-data-[highlighted]:shadow-sm transition-all duration-300">
                                                            <ItemIcon size={18} />
                                                        </div>
                                                        <span className="font-bold text-base tracking-tight flex-1">
                                                            {item.label}
                                                        </span>
                                                        <ArrowRight size={14} className="opacity-0 -translate-x-2 group-data-[highlighted]:opacity-100 group-data-[highlighted]:translate-x-0 transition-all duration-300" />
                                                    </ComboboxItem>
                                                );
                                            }}
                                        </ComboboxCollection>
                                        {index < activeGroups.length - 1 && (
                                            <ComboboxSeparator className="my-2 border-slate-50" />
                                        )}
                                    </ComboboxGroup>
                                )}
                            </ComboboxList>
                        </ComboboxContent>
                    </Combobox>
                </div>
            </div>
        </div>
    );
}
