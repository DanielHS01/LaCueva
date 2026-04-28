"use client";
import { FaWhatsapp } from "react-icons/fa6";

export default function WhatsAppButton() {
  const phoneNumber = "3184238562"; // Reemplaza con el número real (incluye código de país)
  const message = "¡Hola! Me gustaría hacer un pedido en La Cueva 🍔";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="bottom-8 right-8 z-50 flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl transition-transform hover:scale-110 active:scale-95 group"
      aria-label="Contactar por WhatsApp"
    >
      <FaWhatsapp size={32} />

      {/* Tooltip opcional que aparece al pasar el mouse */}
      <span className="absolute right-20 bg-white text-black text-sm font-bold py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
        ¿Necesitas ayuda?
      </span>
    </a>
  );
}
