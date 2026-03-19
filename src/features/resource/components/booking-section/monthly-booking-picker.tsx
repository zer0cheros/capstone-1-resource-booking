import { Field, FieldGroup, FieldLabel } from "@/shared/components/ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";
import { addMonths, format, startOfMonth } from "date-fns";
import { CalendarIcon, Hash } from "lucide-react";
import { useState } from "react";
import { BookingPickerProps } from "../../types/resource";

const START_MONTHS = Array.from({ length: 12 }, (_, i) => {
    const date = startOfMonth(addMonths(new Date(), i));
    return {
        label: format(date, "MMMM yyyy"),
        value: date.toISOString(),
    };
});

export default function MonthlyBookingPicker({
    date,
    onSelect,
    bookedRanges,
}: BookingPickerProps) {
    const [duration, setDuration] = useState<string>("1");

    const isMonthDisabled = (monthIso: string) => {
        const monthDate = new Date(monthIso);
        return bookedRanges.some((range) => {
            return monthDate >= range.from! && monthDate <= range.to!;
        });
    };

    const handleMonthChange = (isoString: string) => {
        const from = new Date(isoString);
        const to = addMonths(from, parseInt(duration));
        onSelect({ from, to });
    };

    const handleDurationChange = (val: string) => {
        setDuration(val);
        if (date?.from) {
            const to = addMonths(date.from, parseInt(val));
            onSelect({ from: date.from, to });
        }
    };

    return (
        <FieldGroup className="w-full flex flex-col gap-4">
            <Field className="w-full">
                <FieldLabel>Starting Month</FieldLabel>
                <Select
                    value={date?.from?.toISOString()}
                    onValueChange={handleMonthChange}
                >
                    <SelectTrigger className="h-12 rounded-xl bg-white">
                        <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                        <SelectValue placeholder="Select start month" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        {START_MONTHS.map((m) => (
                            <SelectItem
                                key={m.value}
                                value={m.value}
                                disabled={isMonthDisabled(m.value)}
                            >
                                {m.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </Field>

            <Field className="w-full">
                <FieldLabel>Duration (Months)</FieldLabel>
                <Select value={duration} onValueChange={handleDurationChange}>
                    <SelectTrigger className="h-12 rounded-xl bg-white">
                        <Hash className="mr-2 h-4 w-4 opacity-50" />
                        <SelectValue placeholder="How many months?" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        {[1, 2, 3, 6, 12].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                                {num} {num === 1 ? "month" : "months"}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </Field>
        </FieldGroup>
    );
}
