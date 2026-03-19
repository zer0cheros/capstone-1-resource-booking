import { DateRange } from "react-day-picker";

export type Resource = {
    id: string;
    userId: string;
    name: string;
    description: string | null;
    image?: string | null;
    price: number;
    priceUnit: priceUnit;
    category: category;
    createdAt: Date;
    updatedAt: Date;
}

type category = "Apartments & Spaces" | "Vehicles & Transport" | "Tools & Equipment" | "Office & Tech";
type priceUnit = "hour" | "day" | "week" | "month";

export type ResourceDetailsPageprops = {
    params: Promise<{ resourceId: string }>;
}

export type ResourceImageProps = {
    src: string | null | undefined;
    alt: string;
}

export type BookingPickerProps = {
    date: DateRange | undefined;
    onSelect: (date: DateRange | undefined) => void;
    bookedRanges: DateRange[];
}

export type BookingPriceSummaryProps = {
    price: number;
    duration: number;
    priceUnit: priceUnit;
}

export type BookingSubmitButtonProps = {
    onClick: () => void;
    isLoading: boolean;
    disabled: boolean | undefined;
    isRangeInvalid: boolean;
}

export type BookingPickerManagerProps = {
    unit: 'hour' | 'day' | 'week' | 'month';
    date: DateRange | undefined;
    onSelect: (date: DateRange | undefined) => void;
    bookedRanges: DateRange[];
}