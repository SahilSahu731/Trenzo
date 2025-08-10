import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getProductsSuccess, getProductDetailsSuccess, productRequestStart, productRequestFail } from '../store/slices/productSlice';
import { PRODUCT_API_URL } from '../utils/constant';
import { Loader2 } from 'lucide-react';

// Import our new, focused components
import ProductImageGallery from '../components/product/ProductImageGallery';
import ProductInfo from '../components/product/ProductInfo';
import ProductDetailsTabs from '../components/product/ProductDetailsTabs';
import RelatedProducts from '../components/product/RelatedProducts';

const ProductPage = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();

  const { product, products, loading, error } = useSelector((state) => state.products);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchProductData = async () => {
      dispatch(productRequestStart());
      try {
        // Fetch the single product details
        const { data } = await axios.get(`${PRODUCT_API_URL}/${productId}`);
        dispatch(getProductDetailsSuccess(data));

        // Also ensure we have the full product list for 'RelatedProducts'
        if (products.length === 0) {
          const { data: allProductsData } = await axios.get(PRODUCT_API_URL);
          dispatch(getProductsSuccess(allProductsData));
        }
      } catch (err) {
        dispatch(productRequestFail(err.response?.data?.message || 'Failed to fetch product data.'));
      }
    };
    fetchProductData();
  }, [productId, dispatch, products.length]);

  if (loading && !product) {
    return <div className="flex h-screen items-center justify-center"><Loader2 size={48} className="animate-spin text-blue-500" /></div>;
  }
  if (error) {
    return <div className="text-red-500 text-center p-8">{error}</div>;
  }
  if (!product) return null; // Or a 'Product Not Found' component

  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductImageGallery image={product.image} productName={product.name} />
          <ProductInfo product={product} />
        </div>
        
        <ProductDetailsTabs product={product} currentUser={userInfo} />
        <RelatedProducts currentProduct={product} />
      </div>
    </div>
  );
};

export default ProductPage;