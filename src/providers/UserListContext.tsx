import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../types";
import { url } from "../variables";
import axios from "axios";
import { AuthContext } from "./AuthContext";

interface UserListContextInterface {
  usersList: User[];

  setUsersList: (user: User[]) => void;
  loading: boolean;
  error: string;
}
export const UserListContext = createContext<
  Partial<UserListContextInterface>
>({});

export default function UserListProvider<P extends object>({ children }: PropsWithChildren<P>) {

  const [usersList, setUsersList] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const { auth } = useContext(AuthContext)

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/users`, {
        withCredentials: true,
      });
      setUsersList(response.data.newList);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth) getUsers()
  }, [auth])

  return (
    <UserListContext.Provider
      value={{ usersList, setUsersList, loading, error }}
    >
      {children}
    </UserListContext.Provider>
  );
}
