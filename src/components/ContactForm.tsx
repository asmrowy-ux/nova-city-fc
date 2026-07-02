"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    
    // Simulate network request
    setTimeout(() => {
      setStatus("success");
      (e.target as HTMLFormElement).reset();
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    }, 1000);
  };

  return (
    <div className="bg-secondary/20 p-8 rounded-2xl border border-border mt-12">
      <h3 className="text-2xl font-black uppercase tracking-tight mb-6">Wyślij wiadomość</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-gray-500">Imię i nazwisko</label>
            <input 
              type="text" 
              id="name"
              required
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
              placeholder="Jan Kowalski"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-gray-500">Adres Email</label>
            <input 
              type="email" 
              id="email"
              required
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
              placeholder="jan@example.com"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-gray-500">Temat</label>
          <input 
            type="text" 
            id="subject"
            required
            className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
            placeholder="W jakiej sprawie piszesz?"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-gray-500">Wiadomość</label>
          <textarea 
            id="message"
            required
            rows={5}
            className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
            placeholder="Twoja wiadomość..."
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={status === "submitting" || status === "success"}
          className={`w-full flex items-center justify-center gap-2 py-4 rounded-lg font-bold uppercase tracking-widest text-sm transition-all ${
            status === "success" 
              ? "bg-green-500 text-white" 
              : "bg-primary text-background hover:bg-foreground hover:text-background"
          }`}
        >
          {status === "submitting" ? (
            <span className="animate-pulse">Wysyłanie...</span>
          ) : status === "success" ? (
            "Wiadomość Wysłana!"
          ) : (
            <>
              Wyślij <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
