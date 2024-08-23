import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { Sale } from "../../../types";
import { SalesListContext } from "../../../providers/SalesListContext";
import { UserListContext } from "../../../providers/UserListContext";
import ReceiptItem from "./ReceiptItem";
function SalesManagement() {
  //contexts
  const { salesList } = useContext(SalesListContext);
  const { usersList } = useContext(UserListContext);
  //states
  const [searchQuery, setSearchQuery] = useState<string>("");

  //displaying all the receipts
  const DisplayRecepits = () => {
    let receiptsToDisplay: Sale[] = [];
    if (salesList) {
      searchQuery
        ? (receiptsToDisplay = salesList?.filter((sale) =>
          usersList
            ?.find((customer) => customer._id == sale.userID)
            ?.phone.includes(searchQuery)
        ))
        : (receiptsToDisplay = salesList);
    }

    if (receiptsToDisplay) {
      return receiptsToDisplay
        .sort((a, b) => +new Date(b.date) - +new Date(a.date))
        .map((receipt, index) => {
          const user = usersList?.find(
            (user) => user._id === receipt.userID
          )
          if (user) {
            return (
              <ReceiptItem index={index} receipt={receipt} user={user} key={receipt._id} />
            );
          }
        });
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.h1 + " relative mb-20 top-0"}>Receipts</h1>

        <div className="w-full max-w-md mb-10">
          <div className="relative">
            <input onChange={(e) => {
              setSearchQuery(e.target.value)
            }} value={searchQuery} type="search" placeholder="Search for products..." className="w-full py-3 pl-10 pr-4 text-gray-900 bg-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.296 4.295a1 1 0 01-1.415 1.415l-4.295-4.296zM14 8a6 6 0 11-12 0 6 6 0 0112 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        <div className="max-h-screen overflow-auto">
          <table className="table-auto">
            <thead className={styles.thead}>
              <tr>
                <th scope="col" className={styles.th}>
                  Index
                </th>
                <th scope="col" className={styles.th}>
                  Customer Name
                </th>
                <th scope="col" className={styles.th}>
                  Products Quantity
                </th>
                <th scope="col" className={styles.th}>
                  Total Price
                </th>
                <th scope="col" className={styles.th}>
                  Date
                </th>
                <th scope="col" className={styles.th}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>{DisplayRecepits()}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
const styles = {
  thead:
    "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400",
  th: "px-6 py-3 min-w-10",
  label: `  mb-2 text-sm font-medium text-gray-900 dark:text-white`,
  input: `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`,
  tr: "bg-white border-b dark:bg-gray-800 dark:border-gray-700",
  tbody_th:
    " px-6 py-4 font-medium text-gray-900 whitespace-nowrap",
  h1: "absolute top-16 lg:top-20 text-3xl font-bold",
  container: "flex justify-center flex-col items-center w-full gap-4",
  button:
    "self-start text-white bg-[#1a1a1a] fixed top-5 z-10 left-5 py-2 px-4 border border-transparent  rounded-md  hover:border-[#646cff]",

};
export default SalesManagement;
