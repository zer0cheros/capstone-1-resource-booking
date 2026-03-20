import { Resource } from "@/features/resource/types/resource";
import { ColumnDef } from "@tanstack/react-table";

export type Booking = {
  id: string;
  resourceId: string;
  userId: string;
  startTime: Date;
  endTime: Date;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
};

export type CreateBookingPayload = {
  resourceId: string;
  startTime: string;
  endTime: string;
}

export type DeleteBookingPayload = {
  id: string;
}

export type HeaderSectionProps = {
  bookings: Booking[];
  resources: Resource[];
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}