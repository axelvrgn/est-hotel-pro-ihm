import axios from "axios";
import { Reservation } from "../interfaces/Reservation";

const getAllReservations = async () => {
  return axios.get<Reservation[]>("/v1/reservations");
};

const createReservation = async (newReservation: Reservation) => {
  return axios.post("/v1/reservations", newReservation);
};

export const ReservationService = { getAllReservations, createReservation };
