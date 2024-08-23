import React, { useContext, useState } from 'react'
import { ProductListContext } from '../../../providers/ProductListContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ProductType } from '../../../types';
import { useAddProduct, useDeleteProduct, useUpdateProduct } from '../../../hooks/products';
import { imageURLAlert, imageURLRegex, priceAlert, priceRegex, smallNumberAlert, smallNumberRegex, smallStringAlert, smallStringRegex } from '../../../Regex';

const styles = {
  thead:
    "text-xs text-gray-700 uppercase bg-gray-50  ",
  th: "px-6 py-3",
  tr: "bg-white border-b ",
  tbody_th:
    " px-6 py-4 font-medium text-gray-900 whitespace-nowrap ",
  td: "text-center px-6 py-4",
  input: `bg-gray-50 border border-gray-300 text-black placeholder:text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  `,
  label: `block mb-2 text-sm font-medium text-gray-900`,
};

export default function ProductManegment() {
  //Contexts
  const { productsList } = useContext(ProductListContext)
  const { addEntity: addProduct } = useAddProduct()
  const { updateEntity: updateProduct } = useUpdateProduct()
  const { deleteEntity: deleteProduct } = useDeleteProduct()
  //States
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProducts, setFilteredProducts] = useState(productsList)
  const [updating, setUpdating] = useState(false);
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [productQuantityInStock, setProductQuantityInStock] =
    useState<string>("");
  const [productCategory, setProductCategory] = useState<string>("Electronics");
  const [productDesctiption, setProductDesctiption] = useState<string>("");
  const [productImageURL, setProductImageURL] = useState<string>("");
  const [updatingID, setUpdatingID] = useState<string>("");

  //handlig Searching for products
  const handleSearch = () => {
    const newList = productsList?.filter(product => product.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase().trim()))
    setFilteredProducts(newList)
  }
  //Form clearing 
  const clearForm = () => {
    setProductName("");
    setProductPrice("");
    setProductQuantityInStock("");
    setProductCategory("");
    setProductDesctiption("");
    setProductImageURL("");
  };
  //validating the form
  const validteForm = () => {
    if (!productName.match(smallStringRegex)) {
      smallStringAlert("Product Name");
      return false;
    } else if (!productPrice.match(priceRegex)) {
      priceAlert();
      return false;
    } else if (!productQuantityInStock.match(smallNumberRegex)) {
      smallNumberAlert("Product Stock");
      return false;
    } else if (productCategory == "N/A") {
      alert("please select a category");
      return false;
    } else if (!productImageURL.match(imageURLRegex)) {
      imageURLAlert();
      return false;
    } else return true;
  };

  //Adding new product
  const AddNewProduct = () => {
    if (!validteForm()) return;
    const product: ProductType = {
      name: productName,
      category: productCategory,
      description: productDesctiption,
      price: +productPrice,
      imageUrl: productImageURL,
      stock: +productQuantityInStock
    };
    if (productsList) {
      if (confirm("Are you sure you want to add this product?")) {
        addProduct(product);
      }
    }
    clearForm();
  };
  //Handlig the update, moving all the products details to the iputs
  const handleUpdate = (id: string) => {
    setUpdating?.(true);
    const product = productsList?.find((product) => product._id === id);
    setProductName?.(product?.name || "");
    setProductPrice?.(product?.price.toString() || "0");
    setProductQuantityInStock?.(product?.stock.toString() || "");
    setProductDesctiption?.(product?.description || "");
    setProductImageURL?.(product?.imageUrl || "");
    setUpdatingID(id);
  };

  //the process of updating itself
  const updateItem = () => {
    if (productsList) {
      if (!validteForm()) return;
      const newProduct: ProductType = {
        _id: updatingID,
        name: productName ?? "",
        category: productCategory ?? "",
        price: +productPrice,
        stock: +productQuantityInStock,
        imageUrl: productImageURL,
        description: productDesctiption ?? "",
      };
      if (confirm("Are you sure you want to Update this product?")) {
        updateProduct(updatingID ?? "", newProduct);
        alert("Product updated successfully")
        clearForm()
        setUpdating(false)
      }
    }
  }
  //deleting a product
  const deleteItem = (id: string) => {
    if (productsList) {
      if (confirm("Are you sure you want to delete this product?")) {
        deleteProduct(id);
      }
    }
  };
  //diplaying the products to the table
  function DisplayList(productsList: ProductType[]) {
    const HTML: JSX.Element[] = [];
    productsList?.forEach((product, index) => {
      HTML.push(
        <tr className={styles.tr} key={product._id}>
          <td className={styles.td}>{index + 1}</td>
          <th scope="row" className={styles.tbody_th}>
            {product.name}
          </th>
          <td className={styles.td}>{product.price}</td>
          <td className={styles.td}>{product.stock}</td>
          <td className={styles.td}>
            <img src={product.imageUrl} width={"40px"} height={"40px"} alt="" />
          </td>
          <td>

            <div className="flex gap-2 justify-center p-2">
              <button
                className="button"
                onClick={() => handleUpdate(product._id ?? "")}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
                update
              </button>
              <button
                className="button dark:bg-red-700"
                onClick={() => deleteItem(product._id ?? "")}
              >
                <FontAwesomeIcon icon={faTrashCan} />
                Delete
              </button>
            </div>

          </td>
        </tr>
      );
    });
    return HTML;
  }

  return (
    <div className='flex items-center justify-center'>
      <div className='container flex flex-col justify-center items-center'>
        <h1 className='font-bold text-3xl my-10'>product Management</h1>

        {/* Form for adding and updating */}
        <div className="container grid grid-cols-2 w-full gap-3">
          <div>
            <label htmlFor="ProductName" className={styles.label}>
              Product Name
            </label>
            <input
              type="text"
              id="ProductName"
              className={styles.input}
              value={productName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setProductName(event.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="ProductPrice" className={styles.label}>
              Product Price
            </label>
            <input
              type="number"
              id="ProductPrice"
              className={styles.input}
              value={productPrice.toString()}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setProductPrice(event.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="ProductCategory" className={styles.label}>
              Product Category
            </label>
            <select
              id="ProductCategoryID"
              title="ProductCategoryID"
              className={styles.input}
              value={productCategory}
              onChange={(event) => {
                setProductCategory(event.target.value);
              }}
            >
              <option value="Electronics">Electronics</option>
            </select>
          </div>

          <div>
            <label htmlFor="ProductDesctiption" className={styles.label}>
              Product Desctiption
            </label>
            <input
              type="text"
              id="ProductDesctiption"
              className={styles.input}
              value={productDesctiption}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setProductDesctiption(event.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="ProductQuantityInStock" className={styles.label}>
              Product Quantity In Stock
            </label>
            <input
              type="number"
              id="ProductQuantityInStock"
              className={styles.input}
              value={productQuantityInStock.toString()}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setProductQuantityInStock(event.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="ProductImageURL" className={styles.label}>
              Product Image URL
            </label>
            <input
              type="text"
              id="ProductImageURL"
              className={styles.input}
              value={productImageURL}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setProductImageURL(event.target.value)
              }
            />
          </div>
          {!updating && (
            <div
              className="last:col-span-full last:flex last:justify-center"
              id="addButton"
            >
              <button className="button w-full my-5 mb-10" onClick={AddNewProduct}>
                <FontAwesomeIcon icon={faPlus} />
                Add Products
              </button>
            </div>
          )}
          {updating && <div className="w-full col-span-full my-5" id="updateButton">
            <button
              className="button w-full"
              onClick={() =>
                updateItem()
              }
            >
              <FontAwesomeIcon icon={faPenToSquare} />
              Update Product
            </button>
          </div>}
          {/* Form for adding and updating */}
        </div>

        {/* Search Input */}

        <div className="w-full max-w-md mb-10">
          <div className="relative">
            <input onChange={(e) => {
              setSearchQuery(e.target.value)
              handleSearch()
            }} value={searchQuery} type="search" placeholder="Search for products..." className="w-full py-3 pl-10 pr-4 text-gray-900 bg-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.296 4.295a1 1 0 01-1.415 1.415l-4.295-4.296zM14 8a6 6 0 11-12 0 6 6 0 0112 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* product List Table */}

        <div className="max-h-screen overflow-auto">
          <table className="table-auto ">
            <thead className={styles.thead}>
              <tr>
                <th scope="col" className={styles.th}>
                  Index
                </th>
                <th scope="col" className={styles.th}>
                  Product name
                </th>
                <th scope="col" className={styles.th}>
                  Price
                </th>

                <th scope="col" className={styles.th}>
                  Quantity in Stock
                </th>

                <th scope="col" className={styles.th}>
                  Image
                </th>

                <th scope="col" className={styles.th}>
                  Action
                </th>

              </tr>
            </thead>
            <tbody className="w-full">
              {searchQuery
                ? DisplayList(filteredProducts ?? [])
                : DisplayList(productsList ?? [])}
            </tbody>
          </table>
        </div>

      </div>
    </div>

  )
}
