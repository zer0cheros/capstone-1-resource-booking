import { BookingPickerManagerProps } from "../../types/resource";
import BookingDatePicker from "./booking-date-picker";
import HourlyBookingPicker from "./hourly-booking-picker";
import MonthlyBookingPicker from "./monthly-booking-picker";

export default function BookingPickerManager (props: BookingPickerManagerProps) {
    switch(props.unit){
        case "hour":
            return <HourlyBookingPicker date={props.date} onSelect={props.onSelect} bookedRanges={props.bookedRanges}/>
        case "month":
            return <MonthlyBookingPicker date={props.date} onSelect={props.onSelect} bookedRanges={props.bookedRanges}/>
        case "day":
        case "week":
        default:
            return <BookingDatePicker date={props.date} onSelect={props.onSelect} bookedRanges={props.bookedRanges}/>
    }
}