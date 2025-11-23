import { CartContent } from "@/cases/cart/components/cart-content";
import { CartEmpty } from "@/cases/cart/components/cart-Empty";
import { useCart } from "@/cases/cart/hooks/useCart";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator, BreadcrumbLink, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function CartPage() {
    const { cart } = useCart();
    const navigate = useNavigate();

    function handleCheckout() {
        navigate("/checkout");
    }

    return (
        <div className="p-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Carrinho de Compras</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="py-8">
                {cart.items.length > 0 ? (
                    <div className="flex flex-col gap-6">
                        
                        <CartContent />

                        <Button 
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3"
                            onClick={handleCheckout}
                        >
                            Finalizar Compra
                        </Button>
                    </div>
                ) : (
                    <CartEmpty />
                )}
            </div>
        </div>
    );
}
