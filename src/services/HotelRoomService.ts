import axios from "axios";
import { CreateHotelRoom, HotelRoom } from "../interfaces/HotelRoom";

const getRoomById = async (token: string, roomId: string) => {
  return axios.get(`http://localhost:8085/ede-api/v1/hotel-rooms/${roomId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getAllRooms = async (token: string) => {
  return axios.get<HotelRoom[]>(
    "http://localhost:8085/ede-api/v1/hotel-rooms",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const createRoom = async (token: string, newRoom: CreateHotelRoom) => {
  return axios.post("http://localhost:8085/ede-api/v1/hotel-rooms", newRoom, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateRoom = async (
  token: string,
  roomId: string,
  updatedRoom: CreateHotelRoom
) => {
  return axios.put(
    `http://localhost:8085/ede-api/v1/hotel-rooms/${roomId}`,
    updatedRoom,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const deleteRoom = async (token: string, roomId: string) => {
  return axios.delete(
    `http://localhost:8085/ede-api/v1/hotel-rooms/${roomId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const HotelRoomService = {
  getRoomById,
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom,
};
