import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { ProductDTO } from "../dtos/product.dto";
import { FormattedNumber, IntlProvider } from "react-intl";
import { Search } from "lucide-react";

import { FavoriteButton } from "@/cases/favorites/components/favorite-button";
import { ReviewButton } from "@/cases/Reviews/Components/review-button";

type ProductCardProps = {
  product: ProductDTO;
};

export function ProductCard({ product }: ProductCardProps) {
  const bucketBaseUrl = import.meta.env.VITE_BUCKET_BASE_URL;

  // ✅ CALCULA A IMAGEM SEM setState / useEffect
  const photo = product?.photos?.[0]?.name;
  const cleanBase = bucketBaseUrl?.replace(/\/$/, "");
  const cleanPath = photo?.replace(/^\//, "");
  const imagePath =
    cleanBase && cleanPath
      ? `${cleanBase}/${cleanPath}`
      : "https://placehold.co/300x300?text=Sem+Imagem";

  function openDetails(e: React.MouseEvent) {
    e.stopPropagation();
    alert("Ir para detalhes do produto");
  }

  return (
    <Card className="relative w-3xs flex justify-center">
      {/* AÇÕES NO TOPO */}
      <div className="absolute top-2 right-2 flex gap-2 z-20">
        {/* ❤️ FAVORITE */}
        <FavoriteButton productId={product.id} />

        {/* ⭐ REVIEW */}
        <ReviewButton productId={product.id} />

        {/* 🔍 DETALHES */}
        <button
          onClick={openDetails}
          className="p-1 rounded-full bg-white shadow hover:bg-gray-100 transition"
        >
          <Search className="w-5 h-5 text-blue-500" />
        </button>
      </div>

      {/* IMAGEM */}
      <CardHeader className="py-0 h-[210px] flex items-center justify-center">
        <img className="cover max-h-full object-contain" src={imagePath} />
      </CardHeader>

      {/* CONTEÚDO */}
      <CardContent>
        <h4 className="text-sm font-semibold mb-4 min-h-10">{product.name}</h4>

        <div className="w-full flex flex-col">
          <p className="text-sm font-light line-through mb-1">
            <IntlProvider locale="pt-BR">
              <FormattedNumber
                value={product.price * 1.15}
                style="currency"
                currency="BRL"
              />
            </IntlProvider>
          </p>

          <p className="text-xs font-light mb-4">
            <IntlProvider locale="pt-BR">
              <FormattedNumber
                value={product.price}
                style="currency"
                currency="BRL"
              />
            </IntlProvider>{" "}
            em 10x de{" "}
            <IntlProvider locale="pt-BR">
              <FormattedNumber
                value={product.price / 10}
                style="currency"
                currency="BRL"
              />
            </IntlProvider>
          </p>

          <div className="flex items-center gap-1">
            <span className="text-xs font-light">ou</span>
            <span className="text-2xl font-semibold">
              <IntlProvider locale="pt-BR">
                <FormattedNumber
                  value={product.price * 0.9}
                  style="currency"
                  currency="BRL"
                />
              </IntlProvider>
            </span>
            <span className="text-xs font-light">no Pix</span>
          </div>

          <p className="text-xs font-light text-green-600 w-full flex justify-center mt-1">
            10% de desconto no Pix
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
