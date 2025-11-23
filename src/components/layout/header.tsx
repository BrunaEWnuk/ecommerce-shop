import { useCart } from "@/cases/cart/hooks/useCart";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

export function Header() {
  const { cart } = useCart();

  return (
    <header className="w-full border-b bg-white">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 gap-4">
        <div className="flex items-center gap-2">
          <ShoppingCart className="text-green-600" />
          <h1 className="text-lg font-bold">
            <span className="font-light">Mater</span>SHOP
          </h1>
        </div>
        <div className="flex items-center gap-1">
          <Link to="/cart" className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-green-700 relative"
            >
              <ShoppingCart />
            </Button>
            {cart.items.length > 0 && (
              <Badge
                className={cn(
                  "absolute -top-1 -right-1 h-5 w-5 rounded-full px-1 font-mono tabular-nums bg-green-600 text-white flex items-center justify-center"
                )}
              >
                {cart.items.length}
              </Badge>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
