import axios from "axios";
import { HotelRoom } from "../interfaces/HotelRoom";

const createRoom = async (newRoom: HotelRoom) => {
  return axios.post("/v1/hotel-rooms", newRoom);
};

export const HotelRoomService = { createRoom };
