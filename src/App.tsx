import { Route, Routes } from "react-router-dom"
import { ProductListPage } from "./pages/product-list.page"
import { ProductDetailPage } from "./pages/product-detail.page"

function App() {
  return (
    <div className="bg-zinc-50 min-h-screen">
      <main className="bg-white">
        <div className="container mx-auto flex flex-col p-4 gap-4">
          <Routes>
            <Route path="/" element={<ProductListPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default App