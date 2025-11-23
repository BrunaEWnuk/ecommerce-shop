import { useState } from "react";
import type { ProductDTO } from "../dtos/product.dto";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/cases/cart/hooks/useCart";

type ProductDetailProps = {
  product: ProductDTO;
};

export function ProductDetail({ product }: ProductDetailProps) {
  const bucketBaseUrl = import.meta.env.VITE_BUCKET_BASE_URL;
  const cleanBase = bucketBaseUrl?.replace(/\/$/, "") || "";

  const { addProduct } = useCart();

  const photos = product.photos || [];
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  const mainKey = photos[selectedPhoto]?.name?.replace(/^\//, "") ?? "";
  const mainImage = mainKey
    ? `${cleanBase}/${mainKey}`
    : "https://placehold.co/600x600?text=Sem+Imagem";

  function handleAddProductCart() {
    addProduct(product);
  }

  return (
    <div className="flex flex-col lg:flex-row gap-14 mt-12">
      <div className="flex flex-col items-center">
        <div className="w-[500px] h-[450px] bg-white border rounded-xl shadow flex items-center justify-center overflow-hidden">
          <img
            src={mainImage}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {photos.length > 1 && (
          <div className="flex gap-3 mt-4">
            {photos.map((p, index) => {
              const key = p.name?.replace(/^\//, "") ?? "";
              const url = `${cleanBase}/${key}`;

              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPhoto(index)}
                  className={cn(
                    "w-20 h-20 border rounded-md overflow-hidden flex items-center justify-center transition-all",
                    selectedPhoto === index
                      ? "border-green-600 ring-2 ring-green-600"
                      : "hover:border-green-500"
                  )}
                >
                  <img src={url} className="w-full h-full object-contain" />
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex-1">
        <h1 className="text-4xl font-semibold leading-tight">{product.name}</h1>

        {product.brand?.name && (
          <span className="inline-block bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded mt-2">
            {product.brand.name}
          </span>
        )}
        <p className="mt-4 text-gray-700 leading-relaxed">
          {product.description}
        </p>

        <div className="mt-6">
          <p className="text-gray-500 line-through text-lg">
            R$ {Number(Number(product.price)).toFixed(2)}
          </p>

          <p className="text-sm font-bold text-green-600 bg-green-100 w-fit px-2 rounded mt-1">
            10% OFF no PIX
          </p>

          <p className="text-4xl text-green-600 font-bold mt-3">
            R${" "}
            {(Number(product.price) - Number(product.price) * 0.1).toFixed(2)}{" "}
            <span className="text-lg font-normal">no PIX</span>
          </p>

          <p className="text-gray-600 mt-2 text-base">
            ou R$ {Number(product.price).toFixed(2)} em 10x de R${" "}
            {(Number(product.price) / 10).toFixed(2)} sem juros
          </p>
        </div>
        <Button
          onClick={handleAddProductCart}
          className="mt-8 w-full bg-green-600 hover:bg-green-700 h-14 text-lg flex items-center gap-2">
          <ShoppingCart size={22} />
          Adicionar ao Carrinho
        </Button>
      </div>
    </div>
  );
}
