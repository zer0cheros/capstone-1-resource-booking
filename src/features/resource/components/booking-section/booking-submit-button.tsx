"use client";
import { Button } from "@/shared/components/ui/button";
import { BookingSubmitButtonProps } from "../../types/resource";
import { cn } from "@/shared/lib/utils";

export default function BookingSubmitButton({
    onClick,
    isLoading,
    disabled,
    isRangeInvalid,
}: BookingSubmitButtonProps) {
    return (
        <div className="w-full space-y-2">
            <Button
                onClick={onClick}
                disabled={disabled || isLoading}
                className={cn(
                    "w-full h-14 text-lg font-bold rounded-2xl transition-all duration-300",
                    isRangeInvalid
                        ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                        : "bg-[#1980D5] hover:bg-[#1980D5]/90 text-white shadow-lg active:scale-95",
                )}
            >
                {isLoading
                    ? (
                        <span className="flex items-center gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            Confirming...
                        </span>
                    )
                    : isRangeInvalid
                    ? (
                        "Dates Unavailable"
                    )
                    : (
                        "Book Now"
                    )}
            </Button>

            {!disabled && !isRangeInvalid && (
                <p className="text-center text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                    Secure payment via OrderEase
                </p>
            )}
        </div>
    );
}
