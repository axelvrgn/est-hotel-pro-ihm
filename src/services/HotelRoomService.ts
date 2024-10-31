import axios from "axios";
import { HotelRoom } from "../interfaces/HotelRoom";

const getRoomById = async (roomId: string) => {
  return axios.get("/v1/hotel-rooms", {
    params: {
      id: roomId,
    },
  });
};

const getAllRooms = async () => {
  return axios.get<HotelRoom[]>("localhost:8080/v1/hotel-rooms");
};

const createRoom = async (newRoom: HotelRoom) => {
  return axios.post("localhost:8080/v1/hotel-rooms", newRoom);
};

export const HotelRoomService = {
  getRoomById,
  getAllRooms,
  createRoom,
};
