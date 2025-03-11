import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/firebase';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewProduct } from "../api/firebase";

export default function useProducts() {
    const queryClient = useQueryClient();

    const queryProducts = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
        staleTime : 1000 * 60
      });

    const addProduct = useMutation(
        {mutationFn: ({product, url}) => addNewProduct(product, url),
        onSuccess: () => {
          queryClient.invalidateQueries("products");
        }, 
        onError: (error) => {
          console.error(error);
        }
      });

    return {queryProducts, addProduct};
}