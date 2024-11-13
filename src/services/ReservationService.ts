import axios from "axios";
import { Reservation } from "../interfaces/Reservation";

const getReservationById = async (token: string, reservationId: string) => {
  return axios.get<Reservation>(
    "http://localhost:8085/ede-api/v1/reservations",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        id: reservationId,
      },
    }
  );
};

const getAllReservations = async (token: string) => {
  return axios.get<Reservation[]>(
    "http://localhost:8085/ede-api/v1/reservations",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const createReservation = async (
  token: string,
  newReservation: Reservation
) => {
  return axios.post(
    "http://localhost:8085/ede-api/v1/reservations",
    newReservation,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const ReservationService = {
  getReservationById,
  getAllReservations,
  createReservation,
};
