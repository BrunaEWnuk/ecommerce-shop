import { ProductCard } from "@/cases/products/components/product-card";
import { listFavorites } from "@/cases/favorites/services/favorite.service";
import { useAuth } from "../cases/costumers/hooks/useAuth";
import { useEffect, useState } from "react";
import { ProductService } from "@/cases/products/services/product.service";
import type { ProductDTO } from "@/cases/products/dtos/product.dto";

export function FavoritesPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!user?.id) return;

      const favoriteIds = await listFavorites(user.id); 

      const result: ProductDTO[] = [];
      for (const id of favoriteIds) {
        const p = await ProductService.getById(id);
        result.push(p);
      }

      setProducts(result);
      setLoading(false);
    }

    load();
  }, [user]);

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
