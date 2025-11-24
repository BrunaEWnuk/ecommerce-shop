import { useState } from "react";
import { Star } from "lucide-react";
import { useAuth } from "@/cases/costumers/contexts/AuthContext";
import { supabase } from "@/lib/client";

type ReviewButtonProps = {
  productId?: string;
};

export function ReviewButton({ productId }: ReviewButtonProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);

  if (!productId) return null;

  async function submitRating(value: number) {
    if (!user?.id) return;

    setRating(value);

    await supabase
      .from("review")
      .upsert({
        customerId: user.id,
        productId,
        score: value,
      });
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
