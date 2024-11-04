import axios from "axios";
import { Login, User } from "../interfaces/Login";

//attention <User> est différent du LoginResponse
const login = async (login: Login) => {
  return axios.post<User>("/v1/hotel-rooms", login);
};

export const AuthService = { login };
