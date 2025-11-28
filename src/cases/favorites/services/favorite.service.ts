import { supabase } from "@/lib/client";

export async function getFavorites(customerId: string) {
  return await supabase
    .from("favorite")
    .select("*")
    .eq("customerId", customerId);
}

export async function addFavorite(customerId: string, productId: string) {
  return await supabase
    .from("favorite")
    .insert({
      customerId: customerId,
      productId: productId
    })
    .select()
    .single();
}

export async function removeFavorite(customerId: string, productId: string) {
  return await supabase
    .from("favorite")
    .delete()
    .eq("customerId", customerId)
    .eq("productId", productId);
}

export async function toggleFavorite(customerId: string, productId: string) {
  const { data: existing } = await supabase
    .from("favorite")
    .select("*")
    .eq("customerId", customerId)
    .eq("productId", productId)
    .maybeSingle();

  if (existing) {
    await removeFavorite(customerId, productId);
    return { isFavorite: false };
  }

  await addFavorite(customerId, productId);
  return { isFavorite: true };
}

export async function listFavorite(customerId: string) {
  const { data } = await supabase
    .from("favorite")
    .select("productId")
    .eq("customerId", customerId);

  return data?.map((item) => item.productId) ?? [];
}
