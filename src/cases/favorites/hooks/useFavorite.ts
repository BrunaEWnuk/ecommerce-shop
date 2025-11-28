/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState, useCallback } from "react";
import { getFavorites, toggleFavorite } from "../services/favorite.service";

export function useFavorites(userId?: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadFavorites = useCallback(async () => {
    if (!userId) return;
    setLoading(true);

    const { data } = await getFavorites(userId);
    setFavorites(data || []);

    setLoading(false);
  }, [userId]);

  const handleToggle = useCallback(
    async (productId: string) => {
      if (!userId) return;

      const { isFavorite } = await toggleFavorite(userId, productId);

      setFavorites((prev) =>
        isFavorite
          ? [...prev, { user_id: userId, product_id: productId }]
          : prev.filter((f) => f.product_id !== productId)
      );
    },
    [userId]
  );

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  return {
    favorites,
    loading,
    reload: loadFavorites,
    toggle: handleToggle,
    isFavorite: (productId: string) =>
      favorites.some((f) => f.product_id === productId),
  };
}
export function useFavorite(productId: string) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavoriteStatus = useCallback(async () => {
    setIsFavorite((prev) => !prev);
  }, []);

  useEffect(() => {
    setIsFavorite(false);
  }, [productId]);

  return {
    isFavorite,
    toggleFavorite: toggleFavoriteStatus,
  };
}     
