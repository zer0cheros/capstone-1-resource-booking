"use client";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/shared/components/ui/tabs";

import { History, Inbox, PackageSearch } from "lucide-react";

import useManageBookingsQuery from "../hooks/use-manage-bookings-query";

import RequestCard from "../components/request-card";
import RevenueSummary from "../components/revenue-summary";

export default function ManageBookingsScreen() {
    const { data: requests, isPending } = useManageBookingsQuery();

    if (isPending) {
        return (
            <div className="flex h-screen w-full items-center justify-center text-slate-400 font-black animate-pulse">
                <div className="flex items-center justify-center text-slate-400 font-bold animate-pulse">
                    Loading requests...
                </div>
            </div>
        );
    }

    const pendingRequests =
        requests?.filter((r: any) => r.status === "pending") || [];

    const historyRequests =
        requests?.filter((r: any) => r.status !== "pending") || [];

    return (
        <div className="flex-1 min-h-screen bg-slate-50/50 py-12 px-6 md:px-10">
            <div className="max-w-7xl mx-auto space-y-10">
                <div className="space-y-2">
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
                        Manage <span className="text-gb-blue">Requests</span>
                    </h1>

                    <p className="text-lg text-slate-500 font-medium">
                        Approve or decline bookings for your resources.
                    </p>
                </div>

                <Tabs defaultValue="pending" className="space-y-8">
                    <TabsList className="bg-white border border-slate-200 p-1.5 rounded-[1rem] md:rounded-[1.5rem] h-14 md:h-16 shadow-sm flex w-full md:w-max md:inline-flex">
                        <TabsTrigger
                            value="pending"
                            className="flex-1 md:flex-none rounded-lg md:rounded-xl px-2 md:px-10 h-full font-black data-[state=active]:bg-gb-blue data-[state=active]:text-white transition-all gap-2 text-sm md:text-base"
                        >
                            <Inbox size={18} />
                            <span className="truncate">
                                Pending ({pendingRequests.length})
                            </span>
                        </TabsTrigger>

                        <TabsTrigger
                            value="history"
                            className="flex-1 md:flex-none rounded-lg md:rounded-xl px-2 md:px-10 h-full font-black data-[state=active]:bg-gb-blue data-[state=active]:text-white transition-all gap-2 text-sm md:text-base"
                        >
                            <History size={18} />
                            <span className="truncate">
                                History ({historyRequests.length})
                            </span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent
                        value="pending"
                        className="space-y-6 outline-none"
                    >
                        {pendingRequests.length > 0
                            ? (
                                pendingRequests.map((req: any) => (
                                    <RequestCard key={req.id} request={req} />
                                ))
                            )
                            : (
                                <div className="py-24 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-200 space-y-4">
                                    <PackageSearch className="size-16 text-slate-200 mx-auto" />

                                    <h3 className="text-2xl font-black text-slate-900">
                                        All caught up!
                                    </h3>

                                    <p className="text-slate-500 font-medium">
                                        You don't have any pending requests.
                                    </p>
                                </div>
                            )}
                    </TabsContent>

                    <TabsContent
                        value="history"
                        className="space-y-6 outline-none"
                    >
                        {historyRequests.length > 0
                            ? (
                                <div>
                                    <RevenueSummary
                                        historyRequests={historyRequests}
                                    />
                                    <div className="space-y-4">
                                        {historyRequests.map((req: any) => (
                                        <RequestCard
                                            key={req.id}
                                            request={req}
                                        />
                                        ))}
                                    </div>
                                </div>
                            )
                            : (
                                <div className="py-24 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-200 space-y-4">
                                    <PackageSearch className="size-16 text-slate-200 mx-auto" />

                                    <h3 className="text-2xl font-black text-slate-900">
                                        All caught up!
                                    </h3>

                                    <p className="text-slate-500 font-medium">
                                        You don't have any booking history yet.
                                    </p>
                                </div>
                            )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
