import { Route, Routes } from "react-router-dom";
import { ProductListPage } from "./pages/product-list.page";
import { ProductDetailPage } from "./pages/product-detail.page";
import { Header } from "./components/layout/header";
import { CartPage } from "./pages/cart.page";
import { AuthProvider } from "./cases/costumers/contexts/AuthContext";
import { ProtectedRoute } from "./cases/costumers/components/ProtectedRoute";
import { LoginPage } from "./pages/login.page";      
import { SignUpPage } from "./pages/SignUp.page";    
import { CheckoutPage } from "./pages/CheckoutPage";

function App() {
    return (
        <AuthProvider>
            <div className="bg-zinc-50 min-h-screen">
                <Header />
                <main className="bg-white">
                    <div className="container mx-auto flex flex-col p-4 gap-4">
                        <Routes>
                            <Route path="/" element={<ProductListPage />} />
                            <Route path="/product/:id" element={<ProductDetailPage />} />
                            <Route path="/cart" element={<CartPage />} />
                            
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/signup" element={<SignUpPage />} />

                            <Route element={<ProtectedRoute />}>
                                <Route path="/checkout" element={<CheckoutPage />} />
                            </Route>
                        </Routes>
                    </div>
                </main>
            </div>
        </AuthProvider>
    );
}

export default App;