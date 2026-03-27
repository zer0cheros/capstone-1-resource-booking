"use client";

import { PackagePlus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import CreateResourceDialog from "@/features/resource/components/create-resource-dialog";
import { Session } from "@/features/auth/types/session";

export default function ListingsHeader({ count, user }: { count: number, user: NonNullable<Session["user"]>; }) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                    My Listings
                </h1>
                <p className="text-slate-500 font-medium">
                    You are currently sharing{" "}
                    <span className="text-gb-blue font-bold">
                        {count} {count > 1 ? "resources" : "resource"}
                    </span>{" "}
                    with the community.
                </p>
            </div>

            <CreateResourceDialog user={user}>
                <Button className="bg-gb-blue hover:bg-gb-blue/90 text-white rounded-2xl h-14 px-8 font-black shadow-lg shadow-gb-blue/20 transition-all hover:scale-105">
                    <PackagePlus className="mr-2 size-5" />
                    Add New Listing
                </Button>
            </CreateResourceDialog>
        </div>
    );
}
