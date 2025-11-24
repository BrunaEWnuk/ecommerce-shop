import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Star } from "lucide-react";
import { supabase } from "@/lib/client";
import { useAuth } from "@/cases/costumers/hooks/useAuth";

type ReviewModalProps = {
  productId: string;
  open: boolean;
  setOpen: (value: boolean) => void;
};

export function ReviewModal({ productId, open, setOpen }: ReviewModalProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  async function saveReview() {
    if (!user) return alert("Você precisa estar logado");

    setLoading(true);

    const { error } = await supabase.from("review").insert({
      product_id: productId,
      user_id: user.id,
      rating,
    });

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Erro ao salvar review.");
      return;
    }

    alert("Avaliação salva com sucesso!");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Avaliar Produto</DialogTitle>
        </DialogHeader>

        <div className="flex justify-center gap-2 my-4">
          {[1, 2, 3, 4, 5].map((n) => (
            <Star
              key={n}
              onClick={() => setRating(n)}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(null)}
              className={`w-10 h-10 cursor-pointer transition 
                ${(hover || rating) >= n ? "text-yellow-500 fill-yellow-500" : "text-gray-400"}
              `}
            />
          ))}
        </div>

        <button
          disabled={loading || rating === 0}
          onClick={saveReview}
          className="w-full bg-green-600 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Salvando..." : "Salvar Avaliação"}
        </button>
      </DialogContent>
    </Dialog>
  );
}
