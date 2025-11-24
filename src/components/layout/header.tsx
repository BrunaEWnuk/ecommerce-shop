import { useCart } from "@/cases/cart/hooks/useCart";
import { ShoppingCart, LogOut, User, ListOrdered } from "lucide-react"; 
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { useAuth } from "@/cases/costumers/contexts/AuthContext";

export function Header() {
  const { cart } = useCart();
  const { user, signOut } = useAuth();

  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 gap-4">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <ShoppingCart className="text-green-600" />
          <h1 className="text-lg font-bold">
            <span className="font-light">Mater</span>SHOP
          </h1>
        </Link>

        <div className="flex items-center gap-4">
          
          {user && (
            <Link to="/orderHistory">
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 text-blue-600 border-blue-500 hover:bg-blue-50"
              >
                <ListOrdered size={16} />
                Meus Pedidos
              </Button>
            </Link>
          )}

          {user && <div className="h-6 w-px bg-zinc-200 mx-1" />}

          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-500 hidden md:block">
                Olá, {user.email?.split("@")[0]}
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={signOut}
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <LogOut size={16} className="mr-2" />
                Sair
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="outline" size="sm" className="gap-2">
                <User size={16} />
                Entrar
              </Button>
            </Link>
          )}

          <div className="h-6 w-px bg-zinc-200 mx-1" />

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
