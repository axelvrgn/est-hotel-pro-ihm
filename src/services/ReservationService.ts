import axios from "axios";
import { CreateReservation, Reservation } from "../interfaces/Reservation";

const getReservationById = async (token: string, reservationId: string) => {
  return axios.get("http://localhost:8085/ede-api/v1/reservations", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      id: reservationId,
    },
  });
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
  newReservation: CreateReservation
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

const updateReservation = async (
  token: string,
  reservationId: string,
  updatedReservation: CreateReservation
) => {
  return axios.put(
    `http://localhost:8085/ede-api/v1/reservations/${reservationId}`,
    updatedReservation,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const deleteReservation = async (token: string, reservationId: string) => {
  return axios.delete(
    `http://localhost:8085/ede-api/v1/reservations/${reservationId}`,
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
  updateReservation,
  deleteReservation,
};
