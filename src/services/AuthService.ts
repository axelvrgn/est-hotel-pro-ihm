import axios from "axios";
import { Login, User } from "../interfaces/Login";
import { CreateAccount } from "../interfaces/Account";

//attention <User> est différent du LoginResponse
const login = async (login: Login) => {
  return axios.post("http://localhost:8085/ede-api/v1/accounts/login", login);
};

const createAccount = (token: string, account: CreateAccount) => {
  return axios.post<User>(
    "http://localhost:8085/ede-api/v1/accounts",
    account,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const AuthService = { login, createAccount };
