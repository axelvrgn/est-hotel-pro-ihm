export interface UserSnapShot {
  name: string;
  firstName: string;
  numberPhone: string;
}

export interface Reservation {
  id: string;
  userSnapShot: UserSnapShot;
  startDate: string;
  endDate: string;
  claim: string;
  numberOfChildren: number;
  numberOfAdults: number;
  pricePaid: number;
  review: number;
}
