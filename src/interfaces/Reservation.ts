export interface UserSnapshot {
  name: string;
  firstName: string;
  numberPhone: string;
}

export interface CreateReservation {
  roomId: string;
  userSnapshot: UserSnapshot;
  startDate: string;
  endDate: string;
  claim: string;
  numberOfChildren: number;
  numberOfAdults: number;
  pricePaid: number;
  review: number;
}

export interface Reservation {
  id: string;
  userSnapshot: UserSnapshot;
  startDate: string;
  endDate: string;
  claim: string;
  numberOfChildren: number;
  numberOfAdults: number;
  pricePaid: number;
  review: number;
}
