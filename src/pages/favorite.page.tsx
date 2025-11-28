import { ProductCard } from "@/cases/products/components/product-card";
import { useAuth } from "@/cases/costumers/hooks/useAuth";
import { useFavorites } from "@/cases/favorites/hooks/useFavorite";
import { useEffect, useState } from "react";
import { ProductService } from "@/cases/products/services/product.service";
import type { ProductDTO } from "@/cases/products/dtos/product.dto";

export function FavoritesPage() {
  const { user } = useAuth();
  const userId = user?.id;

  const { favorites, loading } = useFavorites(userId);

  const [products, setProducts] = useState<ProductDTO[]>([]);

  useEffect(() => {
    async function load() {
      if (!favorites.length) {
        setProducts([]);
        return;
      }

      const result = await Promise.all(
        favorites.map(async (f) => await ProductService.getById(f.product_id))
      );

      setProducts(result);
    }

    load();
  }, [favorites]);

  if (loading) return <p className="p-4">Carregando favoritos...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Meus Favoritos</h1>

      {products.length === 0 ? (
        <p className="mt-4 text-gray-500">Nenhum produto favorito ainda.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 mt-4">
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
