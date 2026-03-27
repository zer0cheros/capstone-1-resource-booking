"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Booking } from "../types/booking";
import { Resource } from "@/features/resource/types/resource";
import { Badge } from "@/shared/components/ui/badge";
import { format } from "date-fns";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import { calculateBookingTotal } from "@/shared/lib/booking-utils";
import { EllipsisVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Button } from "@/shared/components/ui/button";
import CancelBooking from "./cancel-booking";
import { ArrowUpDown } from "lucide-react";
import ModifyBooking from "./modify-booking";

export const createColumns = (resources: Resource[]): ColumnDef<Booking>[] => [
    {
        accessorKey: "resourceId",
        header: "Resource",
        cell: ({ row }) => {
            const resource = resources.find((r) =>
                r.id === row.getValue("resourceId")
            );
            if (!resource) {
                return <span className="text-slate-400">Currently resource was deleted</span>;
            }

            const imageSrc = resource?.image || "/assets/placeholder.svg";

            return (
                <div className="flex items-center gap-3 justify-center w-full">
                    <div className="relative size-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                        <Image
                            src={imageSrc}
                            alt={resource.name || "Resource"}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="w-32 text-left">
                        <span className="font-bold text-slate-900">
                            {resource?.name || "Unknown Resource"}
                        </span>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "startTime",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <span className="font-bold">
                        Date & Time
                    </span>
                    <ArrowUpDown
                        className={cn(
                            "ml-2 h-4 w-4",
                            column.getIsSorted() ? "text-gb-blue" : "",
                        )}
                    />
                </Button>
            );
        },
        cell: ({ row }) => {
            const start = new Date(row.getValue("startTime"));
            const end = new Date(row.original.endTime);

            // 1. Find the resource to check the priceUnit
            const resource = resources.find((r) =>
                r.id === row.original.resourceId
            );
            const unit = resource?.priceUnit;

            return (
                <div className="flex flex-col items-center gap-0.5">
                    {unit === "hour"
                        ? (
                            // Hourly: Date + specific Time Slot
                            <>
                                <span className="font-bold text-slate-900">
                                    {format(start, "MMM dd, yyyy")}
                                </span>
                                <span className="text-xs font-medium text-slate-400">
                                    {format(start, "HH:mm")} -{" "}
                                    {format(end, "HH:mm")}
                                </span>
                            </>
                        )
                        : (
                            // Days, Weeks, Months: Clear Date Range
                            <div className="flex flex-col items-center">
                                <span className="font-bold text-slate-900">
                                    {format(start, "MMM dd")} -{" "}
                                    {format(end, "MMM dd")}
                                </span>
                                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                                    {format(start, "yyyy")}
                                </span>
                            </div>
                        )}
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            return (
                <Badge
                    className={cn(
                        "rounded-full px-3 py-1 capitalize border-none",
                        status === "confirmed" &&
                            "bg-gb-green/10 text-gb-green",
                        status === "pending" && "bg-yellow-100 text-yellow-700",
                        status === "cancelled" && "bg-red-100 text-red-700",
                    )}
                >
                    {status}
                </Badge>
            );
        },
    },
    {
        accessorFn: (row) => {
            const resource = resources.find((r) => r.id === row.resourceId);
            if (!resource) return 0;

            const result = calculateBookingTotal(
                row.startTime,
                row.endTime,
                resource,
            );

            return result.total;
        },
        id: "total",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <span className="font-bold">
                        Total Price
                    </span>
                    <ArrowUpDown
                        className={cn(
                            "ml-2 h-4 w-4",
                            column.getIsSorted() ? "text-gb-blue" : "",
                        )}
                    />
                </Button>
            );
        },
        cell: ({ row }) => {
            const total = row.getValue("total") as number;

            return (
                <span className="font-black text-slate-900">
                    ${total.toFixed(2)}
                </span>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const booking = row.original;

            const isNotAllowed = new Date(booking.startTime) < new Date();

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                        >
                            <EllipsisVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white" align="end">
                        <DropdownMenuLabel className="px-3 py-2 text-slate-500 uppercase text-[10px] tracking-widset font-bold">
                            Actions
                        </DropdownMenuLabel>
                        {isNotAllowed
                            ? (
                                <DropdownMenuItem disabled>
                                    The booking cannot be modified
                                </DropdownMenuItem>
                            )
                            : <ModifyBooking bookingId={booking.id} />}
                        <DropdownMenuSeparator />
                        {isNotAllowed
                            ? (
                                <DropdownMenuItem disabled>
                                    The booking cannot be cancelled
                                </DropdownMenuItem>
                            )
                            : <CancelBooking booking={booking} />}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
