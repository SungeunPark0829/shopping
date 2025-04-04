import React from 'react'
import ProductCard from './ProductCard';
import useProducts from '../hooks/useProducts';

export default function Products() {
    const {
      queryProducts : {isLoading , error, data : products}
    } = useProducts();
  return (
    <>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        <ul className='grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4 gap-4 p-4'>
        {products && products.map(product => (
           <ProductCard key={product.id} product={product}/>
        ))}
        </ul>
    </>
  );
}
