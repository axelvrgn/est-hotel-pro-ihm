import axios from "axios";
import { Reservation } from "../interfaces/Reservation";

const createReservation = async (newReservation: Reservation) => {
  return axios.post("/v1/reservations", newReservation);
};

export const ReservationService = { createReservation };
