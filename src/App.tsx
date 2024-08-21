import React, { ReactElement, useContext, useState } from 'react'
import Product from './components/product'
// import { products } from './products'

import { ProductType } from './types'
import { ProductListContext } from './providers/ProductListContext'
import { ring } from "ldrs";
ring.register();
function App(): ReactElement {
  const [searchQuery, setSearchQuery] = useState("")
  const { productsList, loading } = useContext(ProductListContext)
  const [filteredProducts, setFilteredProducts] = useState(productsList)
  const DisplayProduct = () => {
    const listToDisplay = searchQuery ? filteredProducts : productsList;
    if (!listToDisplay?.length) {
      return <p className='text-center'>No products found</p>
    }
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 xl:grid-cols-4 gap-5">
        {listToDisplay.map((product: ProductType) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    )
  }
  const handleSearch = () => {
    const newList = productsList?.filter(product => product.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase().trim()))
    setFilteredProducts(newList)
  }
  return (
    <>
      {loading ? <l-ring size="60" color="#000" /> : <section className="bg-gray-100 flex flex-col items-center justify-center py-20 min-h-screen">

        <h1 className='text-3xl font-bold mb-10'>Products</h1>
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
        <div className="container flex justify-center items-center">
          <DisplayProduct />
        </div>
      </section>}</>
  )
}

export default App
