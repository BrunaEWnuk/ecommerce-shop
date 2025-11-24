import { supabase } from "@/lib/client";

export async function FavoriteService(customerId: string, productId: string) {
  const { data: existing } = await supabase
    .from("favorite")
    .select("*")
    .eq("customerid", customerId)
    .eq("productid", productId)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("favorite")
      .delete()
      .eq("id", existing.id);

    return { isFavorite: false };
  }

  await supabase
    .from("favorite")
    .insert({ customerid: customerId, productid: productId });

  return { isFavorite: true };
}

export async function listFavorites(customerId: string) {
  const { data } = await supabase
    .from("favorite")
    .select("productid")
    .eq("customerid", customerId);

  return data?.map(f => f.productid) ?? [];
}
