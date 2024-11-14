import axios from "axios";
import { HotelRoom } from "../interfaces/HotelRoom";

const getRoomById = async (token: string, roomId: string) => {
  return axios.get("http://localhost:8085/ede-api/v1/hotel-rooms", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      id: roomId,
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

const createRoom = async (token: string, newRoom: HotelRoom) => {
  return axios.post("http://localhost:8085/ede-api/v1/hotel-rooms", newRoom, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteRoom = async (token: string, roomId: string) => {
  return axios.delete("http://localhost:8085/ede-api/v1/hotel-rooms", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      id: roomId,
    },
  });
};

export const HotelRoomService = {
  getRoomById,
  getAllRooms,
  createRoom,
  deleteRoom,
};
