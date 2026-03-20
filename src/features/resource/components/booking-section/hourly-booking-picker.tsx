"use client";
import * as React from "react";
import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
import { Field, FieldGroup, FieldLabel } from "@/shared/components/ui/field";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/shared/components/ui/popover";
import { format, setHours, setMinutes } from "date-fns";
import { ChevronDownIcon, Clock } from "lucide-react";
import { BookingPickerProps } from "../../types/resource";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";
import { useEffect, useState } from "react";

const HOURS = Array.from({ length: 24 }, (_, i) => ({
    label: `${i.toString().padStart(2, "0")}:00`,
    value: `${i.toString().padStart(2, "0")}:00`,
}));

export default function HourlyBookingPicker(
    { date, onSelect, bookedRanges }: BookingPickerProps,
) {
    const [open, setOpen] = useState(false);
    const [startTime, setStartTime] = useState<string>("09:00");
    const [endTime, setEndTime] = useState<string>("10:00");

    const combineDateAndTime = (baseDate: Date, timeString: string) => {
        const [hours, minutes] = timeString.split(":").map(Number);
        let newDate = new Date(baseDate);
        newDate = setHours(newDate, hours);
        newDate = setMinutes(newDate, minutes);
        return newDate;
    };

    useEffect(() => {
        if (date?.from) {
            const newFrom = combineDateAndTime(date.from, startTime);
            const newTo = combineDateAndTime(date.from, endTime);

            if (
                newFrom.getTime() !== date.from.getTime() ||
                newTo.getTime() !== date.to?.getTime()
            ) {
                onSelect({ from: newFrom, to: newTo });
            }
        }
    }, [startTime, endTime, date?.from, onSelect]);

    return (
        <FieldGroup className="w-full flex flex-col gap-4">
            <Field className="w-full">
                <FieldLabel>Select Date</FieldLabel>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-full justify-between font-normal h-12 rounded-xl bg-white"
                        >
                            {date?.from
                                ? format(date.from, "PPP")
                                : "Select date"}
                            <ChevronDownIcon className="opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-auto p-0 z-[100] bg-white shadow-2xl rounded-3xl"
                        align="start"
                    >
                        <Calendar
                            mode="single"
                            selected={date?.from}
                            onSelect={(newDay) => {
                                if (newDay) {
                                    onSelect({ from: newDay, to: newDay });
                                    setOpen(false);
                                }
                            }}
                            disabled={[{ before: new Date() }, ...bookedRanges]}
                        />
                    </PopoverContent>
                </Popover>
            </Field>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                    <FieldLabel>From</FieldLabel>
                    <Select value={startTime} onValueChange={setStartTime}>
                        <SelectTrigger className="rounded-xl h-12 bg-white">
                            <Clock className="mr-2 h-4 w-4 opacity-50" />
                            <SelectValue placeholder="Start" />
                        </SelectTrigger>
                        <SelectContent className="bg-white max-h-[200px]">
                            {HOURS.map((h) => (
                                <SelectItem key={h.value} value={h.value}>
                                    {h.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </Field>

                <Field>
                    <FieldLabel>To</FieldLabel>
                    <Select value={endTime} onValueChange={setEndTime}>
                        <SelectTrigger className="rounded-xl h-12 bg-white">
                            <Clock className="mr-2 h-4 w-4 opacity-50" />
                            <SelectValue placeholder="End" />
                        </SelectTrigger>
                        <SelectContent className="bg-white max-h-[200px]">
                            {HOURS.map((h) => (
                                <SelectItem key={h.value} value={h.value}>
                                    {h.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </Field>
            </div>
        </FieldGroup>
    );
}