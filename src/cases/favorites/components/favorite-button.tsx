/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { api } from "@/lib/axios";

type Props = {
  productId: string;
};

export function FavoriteButton({ productId }: Props) {
  const [favorite, setFavorite] = useState(false);

  // pegar ID do cliente
  const customerId = localStorage.getItem("customerId");

  useEffect(() => {
    if (!customerId) return;

    async function load() {
      try {
        const response = await api.get(`/favorites/${customerId}`);
        
        // verifica se o produto está na lista
        const isFav = response.data.some(
          (fav: any) => fav.product.id === productId
        );
        setFavorite(isFav);
      } catch (e) {
        console.error("Erro ao buscar favorito:", e);
      }
    }

    load();
  }, [productId, customerId]);

  async function toggleFavorite() {
    if (!customerId) return;

    try {
      await api.post(`/favorites/${customerId}/${productId}`);
      setFavorite(prev => !prev);
    } catch (e) {
      console.error("Erro ao salvar:", e);
    }
  }

  return (
    <button onClick={toggleFavorite} className="p-1 rounded-full">
      <Heart
        size={22}
        className={favorite ? "text-red-500 fill-red-500" : "text-gray-400"}
      />
    </button>
  );
}
