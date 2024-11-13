import axios from "axios";
import { Login, User } from "../interfaces/Login";
import { Account } from "../interfaces/Account";

//attention <User> est différent du LoginResponse
const login = async (login: Login) => {
  return axios.post<User>(
    "http://localhost:8085/ede-api/v1/accounts/login",
    login
  );
};

const createAccount = (account: Account) => {
  return axios.post<User>("http://localhost:8085/ede-api/v1/accounts", account);
};

export const AuthService = { login, createAccount };
