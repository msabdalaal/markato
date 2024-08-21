import { Link, useNavigate } from "react-router-dom";
// import { styles } from "../../root";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { SalesListContext } from "../providers/SalesListContext";
import { useContext, useEffect, useState } from "react";
import { UserListContext } from "../providers/UserListContext";
import { ProductListContext } from "../providers/ProductListContext";
import { User, Sale } from "../types";
import { AuthContext } from "..//providers/AuthContext";

export default function Receipt() {
  const { pathname } = location;
  const { salesList } = useContext(SalesListContext);
  const { usersList } = useContext(UserListContext);
  const { productsList } = useContext(ProductListContext);
  const { loggedUser } = useContext(AuthContext);
  const receiptID = pathname.split("/")[2];
  const [receipt, setReceipt] = useState<Sale>();
  const [customer, setCustomer] = useState<User>();

  useEffect(() => {
    const receipt = salesList?.find((sale) => sale._id === receiptID);
    setReceipt(receipt);
    const customer = usersList?.find(
      (user) => user._id === receipt?.userID
    );
    setCustomer(customer);

  }, [usersList, receipt, receiptID, salesList]);

  const DisplayRecepit = () => {
    const itemsList = receipt?.items;
    if (receipt) {
      return itemsList?.map((item, index) => {
        const product = productsList?.find((product) => {
          if (item.product._id == product._id) console.log("found")

          return product._id === item.product._id
        })
        return (
          <tr key={item.product._id}>
            <td className={styles.td}>{index + 1}</td>
            <th scope="row" className={styles.tbody_th}>
              {
                productsList?.find((product) => product._id === item.product._id)
                  ?.name
              }
            </th>
            <td className={styles.td}>
              {`${item.product.price?.toLocaleString()} EGP`}
            </td>
            <td className={styles.td}>
              {item.quantity}
            </td>

            <td className={styles.td}>
              {`${item.totalPrice?.toLocaleString()} EGP`}
            </td>
            {/* <td>
              <Link to={`/Receipts/${receipt.saleID}`} className="button">
                View
              </Link>
            </td> */}
          </tr>
        );
      });
    }
  };

  return (
    <div className="flex felx-col items-center justify-center">
      <div className="container flex flex-col items-center">
        <h1 className={styles.h1}>Recipt</h1>
        <div className={styles.container}>
          <div className="w-full mt-10">
            <div className="flex justify-center gap-8">
              <h2 className="font-bold mb-4">
                Customer Name:
                <span className="font-normal ml-3">{`${customer?.name}`}</span>
              </h2>
              <h2 className="font-bold mb-4">
                Phone Number:
                <span className="font-normal ml-3">{`${customer?.phone}`}</span>
              </h2>
              <h2 className="font-bold mb-4">
                Date:
                <span className="font-normal ml-3">{`${receipt?.date
                  ?.toString()
                  .slice(0, 10)}`}</span>
              </h2>
            </div>

            <table className="table-auto w-full">
              <thead className={styles.thead}>
                <tr>
                  <th scope="col" className={styles.th}>
                    Index
                  </th>
                  <th scope="col" className={styles.th}>
                    Product Name
                  </th>
                  <th scope="col" className={styles.th}>
                    Unit Price
                  </th>
                  <th scope="col" className={styles.th}>
                    Quantity
                  </th>

                  <th scope="col" className={styles.th}>
                    Total Price
                  </th>
                  {/* <th scope="col" className={styles.th}>
                Action
              </th> */}
                </tr>
              </thead>
              <tbody>
                <DisplayRecepit />
              </tbody>
            </table>
            <div className="mt-4 ml-2">
              <h2 className="font-bold">
                Subtotal:
                <span className="font-normal ml-3">{`${receipt?.totalAmount.toLocaleString()} EGP`}</span>
              </h2>
              <h2 className="font-bold">
                Total:
                <span className="font-normal ml-3">{`${receipt?.totalAmount.toLocaleString()} EGP`}</span>
              </h2>
            </div>
          </div>
        </div></div></div>
  );
}

const styles = {
  thead:
    "text-xs text-gray-700 uppercase bg-gray-50  ",
  th: "px-6 py-3 min-w-10",
  label: `  mb-2 text-sm font-medium text-gray-900 `,
  input: `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`,
  tr: "bg-white border-b dark:bg-gray-800 dark:border-gray-700",
  tbody_th:
    " px-6 py-4 font-medium text-gray-900 whitespace-nowrap",
  td: "text-center px-6 py-4  ",
  h1: "20 text-3xl font-bold my-10",
  container: "flex justify-center flex-col items-center w-full gap-4",
  button:
    "self-start text-white bg-[#1a1a1a] fixed top-5 z-10 left-5 py-2 px-4 border border-transparent  rounded-md  hover:border-[#646cff]",

};
