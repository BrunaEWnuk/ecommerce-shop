import { Heart } from "lucide-react";
import { useFavorite } from "../hooks/useFavorite";

type Props = {
  productId: string;
};

export function FavoriteButton({ productId }: Props) {
  const { isFavorite, toggleFavorite } = useFavorite(productId);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); 
        toggleFavorite();
      }}
      className="p-1 rounded-full"
    >
      <Heart
        size={22}
        className={
          isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"
        }
      />
    </button>
  );
}
