"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram } from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [open, setOpen] = useState<"terminos" | "privacidad" | null>(null);

  return (
    <>
      <footer className="bg-black text-gray-400 py-12 border-t border-neutral-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Logo */}
            <div className="space-y-4">
              <Image
                src="/Images/Logo.png"
                alt="Logo"
                width={200}
                height={200}
              />
              <p className="text-sm">El mejor sabor de la ciudad desde 2022.</p>
            </div>

            {/* Enlaces */}
            <div>
              <h4 className="text-white font-bold mb-4">Enlaces</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="hover:text-orange-500">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="/menu" className="hover:text-orange-500">
                    Menú
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal (ahora abre modales) */}
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => setOpen("terminos")}
                    className="hover:text-orange-500 hover:cursor-pointer"
                  >
                    Términos y Condiciones
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setOpen("privacidad")}
                    className="hover:text-orange-500 hover:cursor-pointer"
                  >
                    Política de Privacidad
                  </button>
                </li>
              </ul>
            </div>

            {/* Redes */}
            <div>
              <h4 className="text-white font-bold mb-4">Síguenos</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.facebook.com/p/La-Cueva-100093012082340/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-2 hover:text-orange-500"
                  >
                    <FaFacebook size={16} /> Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/lacueva_facatativa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-2 hover:text-orange-500"
                  >
                    <FaInstagram size={16} /> Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-neutral-900 text-center text-xs">
            <p>© {currentYear} La Cueva. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* MODAL */}
      {open && (
        <div
          onClick={() => setOpen(null)}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-neutral-900 text-gray-300 max-w-lg w-full p-6 rounded-2xl shadow-lg max-h-[80vh] overflow-y-auto"
          >
            <button
              onClick={() => setOpen(null)}
              className="text-sm text-gray-400 hover:text-white mb-4"
            >
              Cerrar ✕
            </button>

            {open === "terminos" && (
              <>
                <h2 className="text-white text-xl font-bold mb-4">
                  Términos y Condiciones
                </h2>
                <p className="text-sm leading-relaxed">
                  En La Cueva ofrecemos productos de comida rápida para consumo
                  en el establecimiento o a domicilio. Los precios y la
                  disponibilidad pueden cambiar sin previo aviso. Nos reservamos
                  el derecho de rechazar pedidos en caso de inconsistencias. El
                  uso de este sitio implica la aceptación de estos términos.
                </p>
              </>
            )}

            {open === "privacidad" && (
              <>
                <h2 className="text-white text-xl font-bold mb-4">
                  Política de Privacidad
                </h2>
                <p className="text-sm leading-relaxed">
                  En La Cueva recopilamos datos como nombre, teléfono y correo
                  únicamente para gestionar pedidos y mejorar la experiencia del
                  usuario. No compartimos esta información con terceros, salvo
                  cuando sea necesario para la entrega. Puedes solicitar la
                  eliminación de tus datos en cualquier momento.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
