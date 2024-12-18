import axios from "axios";
import { Login, User } from "../interfaces/Login";
import { AccountResponse, CreateAccount } from "../interfaces/Account";
import { API_BASE_URL } from "../data/constants";

const getAllAccounts = async (token: string) => {
  return axios.get<AccountResponse[]>(`${API_BASE_URL}/ede-api/v1/accounts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//attention <User> est différent du LoginResponse
const login = async (login: Login) => {
  return axios.post(`${API_BASE_URL}/ede-api/v1/accounts/login`, login);
};

const createAccount = (token: string, account: CreateAccount) => {
  return axios.post<User>(`${API_BASE_URL}/ede-api/v1/accounts`, account, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const AuthService = { getAllAccounts, login, createAccount };
