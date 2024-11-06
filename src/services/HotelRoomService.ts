import axios from "axios";
import { HotelRoom } from "../interfaces/HotelRoom";

const getRoomById = async (token: string, roomId: string) => {
  return axios.get<HotelRoom>("/v1/hotel-rooms", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      id: roomId,
    },
  });
};

const getAllRooms = async (token: string) => {
  return axios.get<HotelRoom[]>("localhost:8080/v1/hotel-rooms", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const createRoom = async (token: string, newRoom: HotelRoom) => {
  return axios.post("localhost:8080/v1/hotel-rooms", newRoom, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const HotelRoomService = {
  getRoomById,
  getAllRooms,
  createRoom,
};
