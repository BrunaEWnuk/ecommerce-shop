/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useContext } from 'react';
import { useAuth } from '../cases/costumers/contexts/AuthContext';
import { supabase } from '../lib/client';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../cases/cart/contexts/cartContext';

export function CheckoutPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { cart, clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  const total = cart.items.reduce((acc, item) => {
    return acc + (Number(item.product.price) * item.quantity);
  }, 0);

  const handleFinalize = async () => {
    if (!user || cart.items.length === 0) return;
    setLoading(true);

    try {
      console.log("Iniciando checkout para usuário:", user.id);

      const { data: order, error: orderError } = await supabase
        .from('Order')
        .insert({
          customerId: user.id, 
          total: total,        
          shipping: 0,         
          status: 'Aguardando faturamento'
        })
        .select()
        .single();

      if (orderError) {
        console.error("Erro ao criar Order:", orderError);
        throw orderError;
      }

      console.log("Pedido criado:", order.id);

      const orderItems = cart.items.map(item => ({
        orderId: order.id,           
        productId: item.product.id, 
        quantity: item.quantity,
        value: Number(item.product.price)
      }));

      const { error: itemsError } = await supabase
        .from('OrderItem') 
        .insert(orderItems);

      if (itemsError) {
        console.error("Erro ao criar Itens:", itemsError);
        throw itemsError;
      }

      clearCart();
      alert('Pedido realizado com sucesso! ID: ' + order.id);
      navigate('/'); 

    } catch (error: any) {
      alert('Erro ao finalizar pedido: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (cart.items.length === 0) {
     return <div className="p-8 text-center">Seu carrinho está vazio. <br/> <button onClick={() => navigate('/')} className='text-blue-500 underline'>Voltar as compras</button></div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8 text-zinc-800">Finalizar Compra</h1>
      
      <div className="bg-white border rounded-lg p-4 mb-6 shadow-sm">
        {cart.items.map(item => (
          <div key={item.product.id} className="flex justify-between border-b last:border-0 py-4">
            <div className="flex flex-col">
                <span className="font-medium">{item.product.name}</span>
                <span className="text-sm text-zinc-500">Qtd: {item.quantity}</span>
            </div>
            <span className="font-semibold text-zinc-700">
                R$ {(Number(item.product.price) * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between items-center bg-zinc-50 p-4 rounded-lg mb-6 border">
        <span className="text-lg">Total a pagar:</span>
        <span className="text-2xl font-bold text-green-700">R$ {total.toFixed(2)}</span>
      </div>

      <button 
        onClick={handleFinalize}
        disabled={loading}
        className="w-full bg-green-600 text-white font-bold px-6 py-4 rounded hover:bg-green-700 disabled:bg-zinc-400 transition duration-200"
      >
        {loading ? 'Processando...' : 'Confirmar Pedido'}
      </button>
    </div>
  );
}