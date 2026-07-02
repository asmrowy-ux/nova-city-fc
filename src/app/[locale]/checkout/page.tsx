"use client";

import { useCart } from "@/components/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link, useRouter } from "@/i18n/routing";
import { ChevronRight, CheckCircle2, ShieldCheck, ShoppingBag, Loader2 } from "lucide-react";
import { useState } from "react";
import ClientNavbar from "@/components/ClientNavbar"; // Using ClientNavbar to avoid async issues in a purely client page

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network request for payment
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <main className="flex min-h-screen flex-col bg-background text-foreground">
        <ClientNavbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center pt-32">
          <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-8">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
            Dziękujemy za <span className="text-primary">zamówienie!</span>
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto mb-12">
            Twoje zamówienie zostało przyjęte do realizacji. Otrzymasz potwierdzenie na podany adres e-mail.
          </p>
          <Link 
            href="/"
            className="bg-primary text-background font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-md hover:bg-foreground hover:text-background transition-colors"
          >
            Wróć na stronę główną
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="flex min-h-screen flex-col bg-background text-foreground">
        <ClientNavbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center pt-32">
          <ShoppingBag className="w-16 h-16 opacity-20 mb-6" />
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-4">Twój koszyk jest pusty</h1>
          <p className="text-gray-400 mb-8">Dodaj produkty lub bilety, aby kontynuować zakupy.</p>
          <Link 
            href="/shop"
            className="bg-primary text-background font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-md hover:bg-foreground hover:text-background transition-colors"
          >
            Przejdź do sklepu
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <ClientNavbar />
      
      <div className="pt-48 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-gray-500 mb-12">
          <Link href="/shop" className="hover:text-primary transition-colors">Sklep</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-primary">Kasa</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12">
          Finalizacja <span className="text-primary">Zamówienia</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            <div className="bg-secondary/30 rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-black uppercase tracking-widest mb-6">Dane kontaktowe</h2>
              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Imię</label>
                    <input required type="text" className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors" placeholder="Jan" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Nazwisko</label>
                    <input required type="text" className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors" placeholder="Kowalski" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">E-mail</label>
                  <input required type="email" className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors" placeholder="jan@example.com" />
                </div>
                
                <h2 className="text-2xl font-black uppercase tracking-widest mb-6 mt-12">Adres dostawy</h2>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Ulica i numer domu</label>
                  <input required type="text" className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors" placeholder="Kwiatowa 12/4" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Kod pocztowy</label>
                    <input required type="text" className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors" placeholder="00-001" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Miejscowość</label>
                    <input required type="text" className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors" placeholder="Warszawa" />
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-secondary rounded-2xl p-8 border border-border sticky top-32">
              <h2 className="text-xl font-black uppercase tracking-widest mb-6">Twoje zamówienie</h2>
              
              <div className="space-y-4 mb-8">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm border-b border-border/50 pb-4 last:border-0 last:pb-0">
                    <div className="flex flex-col gap-1 pr-4">
                      <span className="font-bold line-clamp-1">{item.name}</span>
                      <span className="text-gray-400 text-xs uppercase tracking-widest">{item.quantity} szt.</span>
                    </div>
                    <span className="font-bold whitespace-nowrap">{(item.price * item.quantity).toFixed(2)} PLN</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-border pt-6 mb-8 space-y-4">
                <div className="flex justify-between text-sm text-gray-400">
                  <span className="uppercase tracking-widest font-bold">Wartość koszyka</span>
                  <span className="font-bold text-foreground">{cartTotal.toFixed(2)} PLN</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span className="uppercase tracking-widest font-bold">Dostawa</span>
                  <span className="font-bold text-foreground text-xs uppercase">Darmowa</span>
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
                  <span className="uppercase tracking-widest font-bold text-lg">Do zapłaty</span>
                  <span className="font-black text-3xl text-primary">{cartTotal.toFixed(2)} PLN</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500 mb-6 justify-center">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span className="uppercase tracking-widest font-bold">Bezpieczna płatność testowa</span>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full bg-primary text-background font-black uppercase tracking-widest py-4 rounded-md hover:bg-foreground hover:text-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Przetwarzanie...
                  </>
                ) : (
                  'Kupuję i płacę'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
