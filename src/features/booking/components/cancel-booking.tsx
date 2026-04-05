import { DropdownMenuItem } from "@/shared/components/ui/dropdown-menu";
import useDeleteBookingMutation from "../hooks/use-booking-delete-query";
import { Booking } from "../types/booking";

export default function CancelBooking({ booking }: { booking: Booking }) {
    const { mutate } = useDeleteBookingMutation();

    const onDelete = () => {
        mutate({
            id: booking.id,
        });
    }

    return (
        <DropdownMenuItem
            variant="destructive"
            onClick={onDelete}
            className="cursor-pointer w-full flex items-center gap-2"
        >
            
            <span>Cancel booking</span>
        </DropdownMenuItem>
    );
}
