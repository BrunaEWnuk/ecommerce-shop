import { useState } from "react";
import { Star } from "lucide-react";
import { useAuth } from "@/cases/costumers/contexts/AuthContext";
import { supabase } from "@/lib/client";

type ProductRatingProps = {
  productId: string;
};

export default function ProductRating({ productId }: ProductRatingProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);

  async function submitRating(value: number) {
    if (!user?.id) return;

    setRating(value);

    const { error } = await supabase.from("review").upsert({
      customerId: user.id,
      productId,
      rating: value, // ✔ coluna correta
    });

    if (error) {
      console.error("Erro ao salvar review:", error);
    }
  }

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={22}
          onClick={() => submitRating(n)}
          className={
            n <= rating
              ? "text-yellow-500 fill-yellow-500"
              : "text-gray-400"
          }
        />
      ))}
    </div>
  );
}
