import { createContext, ReactNode, useContext, useState } from "react";

import { User } from "../interfaces/Login";

type AuthType = {
  user: User | null;
  addAuth: (user: User) => void;
  removeAuth: () => void;
};

export const AuthContext = createContext<AuthType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const user_from_storage = localStorage.getItem("ehp_user");
    try {
      return user_from_storage ? JSON.parse(user_from_storage) : null;
    } catch (error) {
      console.error("Error while parsing user from local storage", error);
      return null;
    }
  });

  const addAuth = (user: User) => {
    sessionStorage.setItem("ehp_user", JSON.stringify(user));
    setUser(user);
  };

  const removeAuth = () => {
    sessionStorage.removeItem("ehp_user");
    setUser(null);
  };

  const User = {
    user,
    addAuth,
    removeAuth,
  };

  return <AuthContext.Provider value={User}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext) as AuthType;
};
