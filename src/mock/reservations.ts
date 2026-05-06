import type { ImageSourcePropType } from "react-native";

export type ReservationStatus = "Confirmed" | "Pending" | "Cancelled";

export type Reservation = {
  status: ReservationStatus;
  image: ImageSourcePropType;
  restaurantName: string;
  bookingId: string;
  guests: number;
  date: string;
  time: string;
  depositPaid: string;
  distance: number;
};
