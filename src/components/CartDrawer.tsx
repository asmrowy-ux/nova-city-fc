"use client";

import { useCart } from "@/components/CartContext";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
        onClick={() => setIsCartOpen(false)}
      />
      
      <div className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-secondary border-l border-border z-[101] flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-black uppercase tracking-widest">Twój Koszyk</h2>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-background rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 text-gray-500">
              <ShoppingBag className="w-16 h-16 opacity-20" />
              <p className="font-bold uppercase tracking-widest text-sm">Twój koszyk jest pusty</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-primary hover:underline text-sm font-bold"
              >
                Wróć do sklepu
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-background p-4 rounded-xl border border-border">
                <div className="w-20 h-20 bg-secondary rounded-lg overflow-hidden flex items-center justify-center shrink-0">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <ShoppingBag className="w-8 h-8 opacity-20" />
                  )}
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between gap-2">
                    <h3 className="font-bold text-sm uppercase leading-tight line-clamp-2">{item.name}</h3>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-500 hover:text-red-500 transition-colors shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3 bg-secondary rounded-md p-1 border border-border">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center hover:bg-background rounded text-foreground transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center hover:bg-background rounded text-foreground transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    
                    <span className="font-black text-primary">
                      {(item.price * item.quantity).toFixed(2)} PLN
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 bg-background border-t border-border">
            <div className="flex items-center justify-between mb-6">
              <span className="font-bold uppercase tracking-widest text-sm text-gray-400">Suma częściowa</span>
              <span className="text-2xl font-black">{cartTotal.toFixed(2)} PLN</span>
            </div>
            
            <Link 
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="w-full block text-center bg-primary text-background font-black uppercase tracking-widest py-4 rounded-md hover:bg-foreground hover:text-background transition-colors"
            >
              Przejdź do kasy
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
