/* eslint-disable react-hooks/set-state-in-effect */
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { ProductDTO } from "../dtos/product.dto";
import { FormattedNumber, IntlProvider } from "react-intl";
import { useEffect, useState } from "react";

type ProductCardProps = {
  product: ProductDTO;
};

export function ProductCard({ product }: ProductCardProps) {
  const bucketBaseUrl = import.meta.env.VITE_BUCKET_BASE_URL;
  const [imagePath, setImagePath] = useState("");

  useEffect(() => {
    const photo = product?.photos?.[0]?.name;
    if (!bucketBaseUrl || !photo) {
      return;
    }

    const cleanBase = bucketBaseUrl.replace(/\/$/, "");
    const cleanPath = photo.replace(/^\//, "");

    const fullURL = `${cleanBase}/${cleanPath}`;
    setImagePath(fullURL);
  }, [product, bucketBaseUrl]);

  //console.log("PHOTO PATH:", product?.photos?.[0]?.name);
  //console.log("FINAL URL:", imagePath);

  return (
    <Card className="w-3xs flex justify-center">
      <CardHeader className="py-0 h-[210px] flex items-center justify-center">
        {imagePath && <img className="cover" src={imagePath} />}
      </CardHeader>
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
              />{" "}
              em 10x de{" "}
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
