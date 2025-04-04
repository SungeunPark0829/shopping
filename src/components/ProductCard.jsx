import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function ProductCard({product, product : {id, image, title, price}}) {
    const navigate = useNavigate();
  return (
    <li onClick={() => navigate(`/product/${id}`, {state:{product}})}
    className='rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105'>
      <img className='w-full' src={image} alt={title} />
      <div className='mt-2 px-2 text-lg flex justify-between items-center'>
        <h3 className='truncate'>{title}</h3>
        <p>{`₩${price}`}</p>
      </div>
    </li>
  )
}
