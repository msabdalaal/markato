import React, { ReactElement, useContext, useEffect } from 'react'
import { ShoppingCartListContext } from '../providers/ShoppingCartProvider'
import { ProductListContext } from '../providers/ProductListContext'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
function ProductDetails(): ReactElement {
  const { productsList } = useContext(ProductListContext)
  const { addItem } = useContext(ShoppingCartListContext)
  const ProductID = location.pathname.slice(1)
  const product = productsList?.find((product => product._id == ProductID))
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <section className="bg-gray-100">
      <button
        onClick={() => {
          navigate(-1);
        }}
        className={"fixed top-4 left-4 bg-blue-500 text-white p-2 rounded-lg text-2xl shadow-lg"}
        type="button"
      >
        <FontAwesomeIcon icon={faBackward} />
        {""}
      </button>
      <div className="container mx-auto py-10 px-5">
        <h1 className='text-center mb-10 text-4xl font-bold'> Product Detalis</h1>
        <div className="bg-white rounded-lg shadow-lg flex flex-col lg:flex-row">

          <div className="h-96 lg:w-1/2 p-6 flex items-center justify-center">
            <img className="h-full rounded-lg w-full object-contain" loading='lazy' src={product?.imageUrl} alt="Product Image" />
          </div>

          <div className="lg:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{product?.name}</h2>
              <p className="text-gray-700 text-lg mb-4">{product?.description}</p>

              <div className="flex items-center mb-4">
                <span className="text-yellow-500 text-2xl">⭐ {product?.rating}</span>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">${product?.price}</h3>

              <p className="text-gray-700 mb-4">Available stock: <span className="font-semibold">{product?.stock}</span></p>
            </div>

            <div className="flex items-center justify-start mt-6">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg mr-4" onClick={() => {
                if (product) {
                  addItem?.(product);
                }
              }}>
                Add to Cart
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 px-6 rounded-lg">
                Buy Now
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mt-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Product Description</h3>
          <p className="text-gray-700 text-lg">
            {product?.description}          </p>
        </div>
      </div>

    </section>
  )
}

export default ProductDetails
