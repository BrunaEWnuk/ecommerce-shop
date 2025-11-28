import { ProductDetail } from "@/cases/products/components/product-detail";
import { useProduct } from "@/cases/products/hooks/use-product";
import { FavoriteButton } from "@/cases/favorites/components/favorite-button";
import { useFavorite } from "@/cases/favorites/hooks/useFavorite";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { useParams, useNavigate } from "react-router-dom";

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: product, isLoading } = useProduct(id!);
    const { isFavorite, toggleFavorite } = useFavorite(id!);

  if (isLoading) {
    return (
      <div className="p-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Carregando...</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="py-8">Carregando...</div>
        
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-4">
        <p>Produto não encontrado.</p>
        <button
          className="text-blue-600 underline mt-4"
          onClick={() => navigate(-1)}
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink href={`/?categoryId=${product.category.id}`}>
              {product.category.name}
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="py-8">
        <div className="absolute top-4 right-4 z-20">
          <FavoriteButton
            productId={id!}
            active={isFavorite}
            onToggle={toggleFavorite}
          />
        </div>
        <ProductDetail product={product} />
      </div>
    </div>
  );
}

