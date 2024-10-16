export enum CategoryRoom {
  GRAND_LIT_CONFORT,
  DOUBLE_LIT_CONFORT,
  TRIPE_LIT_CONFORT,
  QUADRUPLE_LIT_CONFORT,
  TRIPLE_LIT_STANDARD,
  CHALET_T3,
  CELIBATORIUM,
  VILLA,
  VILLA_VIP,
}

export interface HotelRoom {
  id: string;
  roomNumber: number;
  price: number;
  category: CategoryRoom;
  state: string;
}
