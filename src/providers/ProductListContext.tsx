import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { ProductType } from "../types";
import { url } from "../variables";
import axios from "axios";
import { AuthContext } from "./AuthContext";

interface ProductListContextInterface {
  productsList: ProductType[];

  setProductsList: (product: ProductType[]) => void;
  loading: boolean;
  error: string;
}
export const ProductListContext = createContext<
  Partial<ProductListContextInterface>
>({});

export default function ProductListProvider<P extends object>({ children }: PropsWithChildren<P>) {

  const [productsList, setProductsList] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const { auth } = useContext(AuthContext)

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/products`, {
        withCredentials: true,
      });
      setProductsList(response.data.newList);

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth) getProducts()
  }, [auth])

  return (
    <ProductListContext.Provider
      value={{ productsList, setProductsList, loading, error }}
    >
      {children}
    </ProductListContext.Provider>
  );
}
