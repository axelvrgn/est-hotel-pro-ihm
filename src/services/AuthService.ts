import axios from "axios";
import { Login } from "../interfaces/Login";

const login = async (login: Login) => {
  return axios.post("/v1/hotel-rooms", login);
};

export const AuthService = { login };
