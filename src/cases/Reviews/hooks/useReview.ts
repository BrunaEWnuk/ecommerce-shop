import { useEffect, useState } from "react";
import { supabase } from "@/lib/client";

export function useReview(productId: string) {
  const [rating, setRating] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("review") 
        .select("rating")
        .eq("product_id", productId)
        .maybeSingle();

      if (!error && data) setRating(data.rating);
      setLoading(false);
    }

    load();
  }, [productId]);

  async function saveRating(value: number) {
    setRating(value);

    const { error } = await supabase.from("review").upsert({
      product_id: productId,
      rating: value,
    });

    if (error) console.error("Erro ao salvar review:", error);
  }

  return { rating, loading, saveRating };
}
