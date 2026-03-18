"use client";

import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
import { Field, FieldLabel } from "@/shared/components/ui/field";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/shared/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { BookingDatePickerProps } from "../../types/resource";

export default function BookingDatePicker(
    { date, onSelect, bookedRanges }: BookingDatePickerProps,
) {
    return (
        <Field className="w-full">
            <FieldLabel htmlFor="date-picker-range">
                Select dates
            </FieldLabel>
            <Popover>
                <PopoverTrigger asChild className="w-full">
                    <Button
                        variant="outline"
                        id="date-picker-range"
                        className="w-full justify-start px-2.5 font-normal"
                    >
                        <CalendarIcon />
                        {date?.from
                            ? (
                                date.to
                                    ? (
                                        <>
                                            {format(date.from, "LLL dd, y")} -
                                            {" "}
                                            {format(date.to, "LLL dd, y")}
                                        </>
                                    )
                                    : (
                                        format(date.from, "LLL dd, y")
                                    )
                            )
                            : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-auto p-0 z-[100] bg-white shadow-2xl border border-slate-200 rounded-3xl overflow-hidden"
                    align="start"
                >
                    <Calendar
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={onSelect}
                        numberOfMonths={2}
                        disabled={[
                            { before: new Date() },
                            ...bookedRanges,
                        ]}
                    />
                </PopoverContent>
            </Popover>
        </Field>
    );
}
