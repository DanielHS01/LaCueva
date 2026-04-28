"use client"; // Necesario para el estado del carrito
import Link from "next/link";
import { UserCog } from "lucide-react"; // Luego lo conectaremos al store real
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-orange-950">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo (Izquierda) */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image src="/Images/Logo.png" alt="Logo" width={150} height={150} />
        </Link>

        {/* Navegación y Carrito (Derecha) */}
        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-6 text-gray-300">
            <li>
              <Link
                href="/"
                className="hover:text-orange-400 transition-colors"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/menu"
                className="hover:text-orange-400 transition-colors"
              >
                Menú
              </Link>
            </li>
            <li>
              <Link
                href="/admin"
                className="flex items-center gap-1.5 hover:text-orange-400 transition-colors"
              >
                <UserCog size={18} />
                Admin
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
