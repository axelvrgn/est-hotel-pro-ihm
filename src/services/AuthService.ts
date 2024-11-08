import axios from "axios";
import { Login, User } from "../interfaces/Login";

//attention <User> est différent du LoginResponse
const login = async (login: Login) => {
  return axios.post<User>(
    "http://localhost:8085/ede-api/v1/accounts/login",
    login
  );
};

export const AuthService = { login };
