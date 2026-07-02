"use client";

import { useCart } from "@/components/CartContext";
import { ShoppingBag, Ticket } from "lucide-react";

type AddToCartProps = {
  item: {
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
    type: 'product' | 'ticket';
  };
  disabled?: boolean;
};

export default function AddToCartButton({ item, disabled }: AddToCartProps) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(item)}
      disabled={disabled}
      className="bg-primary text-background font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-md hover:bg-foreground hover:text-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 w-full sm:w-auto"
    >
      {item.type === 'product' ? <ShoppingBag className="w-5 h-5" /> : <Ticket className="w-5 h-5" />}
      Dodaj do koszyka
    </button>
  );
}
