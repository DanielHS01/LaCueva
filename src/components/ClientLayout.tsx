// components/ClientLayout.tsx
"use client";

import { useState } from "react";
import { CartProvider } from "@/context/CartContext";
import FloatingCartBtn from "@/components/FloatingCartBtn";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppButton from "./WhatsAppButton";
import { Toaster } from "sonner";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      {children}
      <Toaster richColors position="top-right" />
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3 items-end">
        <FloatingCartBtn onClick={() => setIsCartOpen(true)} />
        <WhatsAppButton />
      </div>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </CartProvider>
  );
}
