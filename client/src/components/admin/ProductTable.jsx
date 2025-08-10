import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const ProductTable = ({ products }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
            <tr>
              <th scope="col" className="px-4 sm:px-6 py-3">Product Name</th>
              {/* Hidden on small screens, visible from medium screens up */}
              <th scope="col" className="hidden md:table-cell px-6 py-3">Category</th>
              <th scope="col" className="px-4 sm:px-6 py-3">Price</th>
              {/* Hidden on extra-small screens, visible from small screens up */}
              <th scope="col" className="hidden sm:table-cell px-6 py-3">Stock</th>
              {/* Hidden on small screens, visible from medium screens up */}
              <th scope="col" className="hidden md:table-cell px-6 py-3">Status</th>
              <th scope="col" className="px-4 sm:px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600/20">
                
                {/* Product Name (Always Visible) */}
                <th scope="row" className="px-4 sm:px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <img src={product.image.secure_url} alt={product.name} className="w-10 h-10 rounded-md object-cover" />
                    <span className="font-bold">{product.name}</span>
                  </div>
                </th>
                
                {/* Category (Hidden on Mobile) */}
                <td className="hidden md:table-cell px-6 py-4">{product.category}</td>
                
                {/* Price (Always Visible) */}
                <td className="px-4 sm:px-6 py-4">${product.price.toFixed(2)}</td>
                
                {/* Stock (Hidden on XS Mobile) */}
                <td className="hidden sm:table-cell px-6 py-4">{product.countInStock}</td>
                
                {/* Status (Hidden on Mobile) */}
                <td className="hidden md:table-cell px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    product.countInStock > 0 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  }`}>
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
                
                {/* Actions (Always Visible) */}
                <td className="px-4 sm:px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1 sm:gap-2">
                    <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-md">
                      <Edit size={18} />
                    </button>
                    <button className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-md">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;