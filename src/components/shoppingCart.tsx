import React, { ReactElement, useContext, useState } from 'react'
import { ShoppingCartListContext } from '../providers/ShoppingCartProvider'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faClose, faTrash } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from '../providers/AuthContext';
import { Sale } from '../types';
import { useAddSale } from '../hooks/sales';

function shoppingCart(): ReactElement {
  const { shoppingCartList, emptyCart, totalAmount, removeItem } = useContext(ShoppingCartListContext)
  const [showShoppingCart, setShowShoppingCart] = useState(false)
  const { auth, loggedUser } = useContext(AuthContext);
  const { addEntity: addSale } = useAddSale()
  const DisplayItems = () => {
    return shoppingCartList?.map(product => {
      return <div key={product.product._id} className="flex-1 overflow-y-auto">

        <div className="border-b py-4 flex items-center">
          <img className="w-16 h-16 rounded-lg object-cover" loading='lazy' src={product.product.imageUrl} alt="Product Image" />
          <div className="ml-4 flex-1">
            <h2 className="text-lg font-semibold">
              {product.product.name}
            </h2>
            <p className="text-gray-500">Quantity: {product.quantity}</p>
            <p className="text-gray-900 font-bold">${product.totalPrice}</p>
          </div>
          <button className="text-red-500 hover:text-red-700" onClick={() => {
            if (product) {
              removeItem?.(product)

            }
          }}><FontAwesomeIcon icon={faTrash} />{""}</button>
        </div>

      </div>
    })
  }
  const getDate = () => {
    const objectDate = new Date();
    const day = objectDate.getDate();

    const month = objectDate.getMonth() + 1;

    const year = objectDate.getFullYear();

    return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day
      }`;
  };
  const handleCheckout = () => {
    if (shoppingCartList?.length === 0) {
      alert("Cart is empty")
      return
    } else {
      const checkout: Sale = {
        date: getDate(),
        userID: loggedUser?._id ?? "",
        items: shoppingCartList ?? [],
        totalAmount: totalAmount ?? 0

      }
      addSale(checkout)
      alert("Order Has Been Sent")
      emptyCart?.()
    }

  }
  return (
    <>
      {auth && <button id="cartButton" className="fixed z-10 top-4 right-4 bg-blue-500 hover:bg-blue-400 text-white p-2 rounded-lg text-2xl shadow-lg" onClick={() => setShowShoppingCart(prev => !prev)}>
        <FontAwesomeIcon icon={faCartShopping} />{""}
        {shoppingCartList?.length !== 0 && <p className='absolute -top-2 -right-2  bg-red-400 w-5 h-5 text-sm rounded-full'>{shoppingCartList?.length}</p>
        }      </button >}
      <div id="sidebar" className={`fixed z-20 top-0 right-0 w-80 h-full bg-white shadow-lg transform ${showShoppingCart ? "" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Shopping Cart</h2>
            <button id="closeCart" className="text-gray-500 hover:text-gray-700 text-2xl" onClick={() => setShowShoppingCart(prev => !prev)}><FontAwesomeIcon icon={faClose} />{""}</button>
          </div>
          <div className='overflow-auto'>{DisplayItems()}</div>

          {shoppingCartList?.length ? <div className="border-t pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${totalAmount}</span>
            </div>
            <button className="mt-4 w-full bg-green-500 hover:bg-green-700 text-white py-3 rounded-lg" onClick={() => {
              handleCheckout()
            }}>
              Checkout
            </button>
          </div> :
            <div className="flex justify-center items-center text-gray-500 py-16">
              Your cart is empty. Add some products to proceed.
            </div>}
        </div>
      </div></>
  )
}

export default shoppingCart
