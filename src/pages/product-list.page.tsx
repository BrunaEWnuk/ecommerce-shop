import { CategoryMenu } from "@/cases/categories/components/category-menu";
import { ProductCard } from "@/cases/products/components/product-card";
import { FavoriteButton } from "@/cases/favorites/components/favorite-button";
import { useProducts } from "@/cases/products/hooks/use-product";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/cases/costumers/hooks/useAuth";
import { useFavorites } from "@/cases/favorites/hooks/useFavorite";

export function ProductListPage() {
  const { user } = useAuth();
  const userId = user?.id;

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const categoryId = searchParams.get("categoryId") ?? undefined;
  const { data: products } = useProducts(categoryId);

  const { isFavorite, toggle } = useFavorites(userId);

  function openDetails(id: string) {
    navigate(`/product/${id}`);
  }

  return (
    <>
      <CategoryMenu />

      <section className="flex flex-col">
        <div className="flex mt-8 gap-8 flex-wrap">
          {products &&
            products.map((product) => (
              <div
                key={product.id}
                className="relative cursor-pointer"
                onClick={() => openDetails(product.id)}
              >
                <div className="absolute top-2 right-2 z-20"
                     onClick={(e) => e.stopPropagation()}>
                  <FavoriteButton
                    productId={product.id}
                    active={isFavorite(product.id)}
                    onToggle={() => toggle(product.id)}
                  />
                </div>

                <ProductCard product={product} />
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
