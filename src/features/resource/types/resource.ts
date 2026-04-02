import { Booking } from "@/features/booking/types/booking";
import { DateRange } from "react-day-picker";
import { CreateResourceInput } from "../validation/create-resource-validator";

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
    mode?: "single" | "range";
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
    handleReset: () => void;
}

export type BookingPickerManagerProps = {
    unit: 'hour' | 'day' | 'week' | 'month';
    date: DateRange | undefined;
    onSelect: (date: DateRange | undefined) => void;
    bookedRanges: DateRange[];
}
export type ResourceBookingCardProps = {
    resource: Resource;
    expanded: boolean;
    initialDate?: DateRange;
    mode?: "create" | "edit";
    bookingId?: string;
}

export type DeletePayload = {
    id: string;
}

export type UpdatePayload = {
    id: string;
    name: string;
    description: string | null;
    image?: string | null;
    price: number;
    priceUnit: priceUnit;
    category: category;
}

export type ResourceFormProps = {
    initialData?: Partial<Omit<CreateResourceInput, "image">> & {
        image?: string | null;
    };
    onSubmit: (values: CreateResourceInput) => Promise<void>;
    isPending: boolean;
    submitLabel: string;
    onCancel: () => void;
}

export type LoadMoreButtonProps = {
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage: () => void;
    totalItems: number;
}