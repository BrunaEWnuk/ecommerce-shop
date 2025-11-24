/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/client";

export function useFavorite(productId?: string) {
  const [userId, setUserId] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  async function loadUser() {
    const { data } = await supabase.auth.getUser();
    setUserId(data.user?.id ?? null);
  }

  const loadFavorite = useCallback(async () => {
    if (!userId || !productId) return;

    const { data } = await supabase
      .from("favorite")
      .select("*")
      .eq("customerid", userId)
      .eq("productid", productId)
      .maybeSingle();

    setIsFavorite(!!data);
  }, [userId, productId]);

  async function toggleFavorite() {
    if (!userId || !productId) return;

    if (isFavorite) {
      await supabase
        .from("favorite")
        .delete()
        .eq("customerid", userId)
        .eq("productid", productId);

      setIsFavorite(false);
    } else {
      const { error } = await supabase.from("favorite").insert({
        customerid: userId,
        productid: productId,
        createdat: new Date().toISOString(),
      });

      if (!error) {
        setIsFavorite(true);
      }
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    loadFavorite();
  }, [loadFavorite]);

  return { isFavorite, toggleFavorite };
}
