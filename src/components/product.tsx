import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { ProductType } from '../types'
interface props {
  product: ProductType
}
function App({ product }: props): ReactElement {
  return <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
    <div className='p-5'>
      <img className="w-full h-48 object-contain" loading='lazy' src={product.imageUrl} alt="Product Image" />

    </div>
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{product.name}</div>
      <p className="text-gray-700 h-20 text-base">
        {product.description}
      </p>
    </div>
    <div className="px-6 pt-4 pb-2 flex justify-between items-center">
      <span className="text-gray-900 font-bold text-xl">${product.price}</span>
      <Link to={`/${product._id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        View Details
      </Link>
    </div>
    <div className="grid grid-cols-3 px-6 py-4">
      <span className=" bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 overflow-clip whitespace-nowrap text-ellipsis">{product.category}</span>
      <span className=" bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">{product.stock ? "In Stock" : "Out of stock"}</span>
      <span className=" bg-yellow-700 rounded-full px-3 py-1 text-sm font-semibold text-white">⭐ {product.rating}</span>
    </div>
  </div>
}


export default App
