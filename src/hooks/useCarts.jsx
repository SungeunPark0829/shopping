import { addOrUpdateCart, getCarts, removeFromCart } from "../api/firebase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../context/AuthContext";

export default function useCarts() {
    const queryClient = useQueryClient();
  const { uid } = useAuthContext();

  const queryCarts = useQuery({
    queryKey: ["carts", uid],
    queryFn: () => getCarts(uid),
  });

  const addOrUpdateToCart = useMutation({
    mutationFn: (product) => addOrUpdateCart(product, uid),
    onSuccess: () => {
      queryClient.invalidateQueries(["carts", uid]);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const removeItem = useMutation({
    mutationFn: (id) => removeFromCart(id, uid),
    onSuccess: () => {
      queryClient.invalidateQueries(["carts", uid]);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { queryCarts,addOrUpdateToCart, removeItem };

}
