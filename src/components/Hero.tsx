import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
      {/* Imagen de Fondo con Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Images/hero.jpg" // Cambia esto por tu imagen real
          alt="Alitas artesanales de La Cueva"
          className="w-full h-full object-cover"
          width={50}
          height={50}
        />
        {/* Overlay oscuro para legibilidad (gradiente para imitar la imagen) */}
        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/90 to-black/95 z-10" />
      </div>

      {/* Contenido Centrado */}
      <div className="container mx-auto px-6 z-20 text-center max-w-4xl">
        {/* Logotipo Central */}
        <div className="flex flex-col items-center gap-3">
          <Image
            src="/Images/Logo.png" // Cambia esto por tu logo real
            alt="Logo de La Cueva"
            width={500}
            height={400}
          />
        </div>

        {/* Eslogan y Descripción */}
        <p className="text-2xl md:text-3xl text-orange-400 font-medium mb-6">
          Food and Drinks
        </p>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-12 max-w-2xl mx-auto">
          En La Cueva encuentras mucho más que alitas. Disfruta nuestras alitas,
          llenas de sabor y textura perfecta, junto a una variedad de comida
          rápida hecha para antojarte en cada bocado.
        </p>

        {/* Botones de Acción */}
        <div className="flex items-center justify-center gap-6">
          <Link
            href="/menu"
            className="flex items-center gap-2 px-10 py-4 bg-orange-600 text-white font-bold rounded-full text-lg hover:bg-orange-500 transition-all hover:scale-105 group"
          >
            Ordenar Ahora
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
