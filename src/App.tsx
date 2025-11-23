import { Route, Routes } from "react-router-dom"
import { ProductListPage } from "./pages/product-list.page"
import { ProductDetailPage } from "./pages/product-detail.page"
import { Header } from "./components/layout/header"
import { CartPage } from "./pages/cart.page"

function App() {
    return (
        <div className="bg-zinc-50 min-h-screen">
            <Header />
            <main className="bg-white">
                <div className="container mx-auto flex flex-col p-4 gap-4">
                    <Routes>
                        <Route path="/" element={<ProductListPage />} />
                        <Route path="/product/:id" element={<ProductDetailPage />} />
                        <Route path="/cart" element={<CartPage />} />
                    </Routes>
                </div>
            </main>
        </div>
    )
}

export default App