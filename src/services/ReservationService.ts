import axios from "axios";
import { Reservation } from "../interfaces/Reservation";

const getAllReservations = async (token: string) => {
  return axios.get<Reservation[]>("localhost:8080/v1/reservations", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const createReservation = async (
  token: string,
  newReservation: Reservation
) => {
  return axios.post("localhost:8080/v1/reservations", newReservation, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const ReservationService = { getAllReservations, createReservation };
