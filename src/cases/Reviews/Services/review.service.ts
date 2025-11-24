import { supabase } from "@/lib/client";

export async function addReview(customerId: string, productId: string, rating: number, comment?: string) {
  return await supabase
    .from("Review")
    .insert({ customerId, productId, rating, comment });
}

export async function getReviews(productId: string) {
  const { data } = await supabase
    .from("review")
    .select("rating, createdAt")
    .eq("productId", productId);

  return data;
}
