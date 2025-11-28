import { supabase } from "@/lib/client";

export async function getFavorites(userId: string) {
  return await supabase
    .from("favorite")
    .select("*")
    .eq("user_id", userId);
}

export async function addFavorite(customerId: string, productId: string) {
  return await supabase
    .from("favorite")
    .insert({ customer_id: customerId, product_id: productId })
    .select()
    .single();
}

export async function removeFavorite(userId: string, productId: string) {
  return await supabase
    .from("favorite")
    .delete()
    .eq("user_id", userId)
    .eq("product_id", productId);
}

export async function toggleFavorite(userId: string, productId: string) {
  const { data: auth } = await supabase.auth.getUser();
  console.log("AUTH UID:", auth?.user?.id);
  console.log("USER_ID enviado:", userId);
  const { data: existing, error } = await supabase
    .from("favorite")
    .select("*")
    .eq("user_id", userId)
    .eq("product_id", productId)
    .maybeSingle();

  if (error) console.error("Erro ao verificar favorito:", error);

  if (existing) {
    await removeFavorite(userId, productId);
    return { isFavorite: false };
  }

  await addFavorite(userId, productId);
  return { isFavorite: true };
}
export async function listFavorite(userId: string) {
  const { data, error } = await supabase
    .from("favorite")
    .select("product_id")
    .eq("user_id", userId);

  if (error) {
    console.error("Erro ao listar favoritos:", error);
    return [];
  }

  return data.map((item) => item.product_id);
} 