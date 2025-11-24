import { useState, useEffect } from "react";
import { SearchBar } from "@/cases/search/components/SearchBar";
import { ProductCard } from "@/cases/products/components/product-card";
import { supabase } from "@/lib/client";
import type { ProductDTO } from "@/cases/products/dtos/product.dto";

export function ProductSearchPage() {
  const [products, setProducts] = useState<ProductDTO[]>([]);

  async function loadProducts(search = "") {
    const { data } = await supabase
      .from("Products")
      .select("*")
      .ilike("name", `%${search}%`);

    setProducts(data ?? []);
  }

  useEffect(() => {
    (async () => {
      await loadProducts();
    })();
  }, []);

  return (
    <div className="p-4 space-y-4">
      <SearchBar onSearch={loadProducts} />

      <div className="grid grid-cols-2 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

export default ProductSearchPage;
