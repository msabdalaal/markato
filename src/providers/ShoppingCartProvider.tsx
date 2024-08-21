import {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { ProductType, ShoppingCartProduct } from "../types";
interface ShoppingCartListContextInterface {
  shoppingCartList: ShoppingCartProduct[];
  emptyCart: () => void;
  totalAmount: number;
  addItem: (addedProduct: ProductType) => void
  removeItem: (removedProduct: ShoppingCartProduct) => void
}
export const ShoppingCartListContext = createContext<
  Partial<ShoppingCartListContextInterface>
>({});

export default function ShoppingCartListProvider<P extends object>({ children }: PropsWithChildren<P>) {
  const [shoppingCartList, setShoppingCartList] = useState<ShoppingCartProduct[]>([]);
  const [totalAmount, setTotalAmout] = useState<number>(0);

  const addItem = (addedProduct: ProductType) => {
    if (shoppingCartList.find(product => product.product._id == addedProduct._id)) {
      const NewList = [...shoppingCartList];
      const productIndex = NewList.findIndex(product => product.product._id == addedProduct._id);
      if (productIndex !== -1) {
        NewList[productIndex].quantity++;
        NewList[productIndex].totalPrice = +(NewList[productIndex].product.price * NewList[productIndex].quantity).toFixed(2);
        setShoppingCartList(NewList)
      }
    } else {
      const newProduct: ShoppingCartProduct = {
        product: addedProduct,
        quantity: 1,
        totalPrice: addedProduct.price * 1,
      };
      const NewList = [...shoppingCartList, newProduct];
      setShoppingCartList(NewList);
    }
  };

  const removeItem = (removedProduct: ShoppingCartProduct) => {
    const NewList = [...shoppingCartList.filter(product => product.product._id !== removedProduct.product._id)]
    setShoppingCartList(NewList)
  }
  const updateTotalAmount = () => {
    let TotalAmount = 0
    shoppingCartList.forEach(product => {
      TotalAmount += product.totalPrice
    })
    setTotalAmout(TotalAmount)
  }

  const emptyCart = () => {
    setShoppingCartList([])
    setTotalAmout(0)
  }

  useEffect(() => {
    updateTotalAmount()
  }, [shoppingCartList])
  return (
    <ShoppingCartListContext.Provider
      value={{ shoppingCartList, addItem, emptyCart, removeItem, totalAmount }}

    >
      {children}
    </ShoppingCartListContext.Provider>
  );
}
