import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import useCarts from "../hooks/useCarts";

export default function CartStatus() {
  const {
    queryCarts: { data: carts },
  } = useCarts();
  
  return (
    <div className="relative">
      <FaCartShopping className="text-2xl" />
      {carts && (
        <p className="w-5 h-5 text-center bg-red-400 text-white rounded-full absolute -top-2 -right-2">
          {carts.length}
        </p>
      )}
    </div>
  );
}
