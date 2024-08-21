import axios from "axios";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { User } from "../types";
import { url } from "../variables";
interface AuthContextContextInterface {
  auth: boolean;
  setAuth: (status: boolean) => void;
  setLoggedUser: (status: User) => void;
  loggedUser: User;
  loading: boolean;
  error: string;
}
export const AuthContext = createContext<Partial<AuthContextContextInterface>>(
  {}
);

export default function AuthProvider<P extends object>({ children }: PropsWithChildren<P>) {

  const [auth, setAuth] = useState<boolean>(false);
  const [loggedUser, setLoggedUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const getLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/login`, {
        withCredentials: true,
      });
      setAuth(response.data.status);

      setLoggedUser(response.data.User);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        setAuth,
        auth,
        loggedUser,
        setLoggedUser,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
