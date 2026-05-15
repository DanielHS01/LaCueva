"use client";

import Link from "next/link";
import Image from "next/image";
import { UserCog, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/client";

export default function Navbar() {
  const supabase = createClient();
  const router = useRouter();

  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoggedIn(false);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setLoggedIn(true);

      const { data: perfil } = await supabase
        .from("perfiles")
        .select("rol")
        .eq("id", user.id)
        .single();

      setIsAdmin(perfil?.rol === "admin");

      setLoading(false);
    };

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!session?.user) {
        setLoggedIn(false);
        setIsAdmin(false);
        return;
      }

      setLoggedIn(true);

      const { data: perfil } = await supabase
        .from("perfiles")
        .select("rol")
        .eq("id", session.user.id)
        .single();

      setIsAdmin(perfil?.rol === "admin");
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();

    setLoggedIn(false);

    router.push("/login");
    router.refresh();
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-orange-950">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image src="/Images/Logo.png" alt="Logo" width={150} height={150} />
        </Link>

        {/* Navegación */}
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
                href="/seguimiento"
                className="hover:text-orange-400 transition-colors"
              >
                Seguimiento
              </Link>
            </li>

            {!loading && (
              <>
                {loggedIn ? (
                  <>
                    {isAdmin && (
                      <li>
                        <Link
                          href="/admin"
                          className="flex items-center gap-1.5 hover:text-orange-400 transition-colors"
                        >
                          <UserCog size={18} />
                          Dashboard
                        </Link>
                      </li>
                    )}

                    <li>
                      <button
                        onClick={handleLogout}
                        className="
                          flex items-center gap-1.5
                          hover:text-red-400
                          transition-colors
                          cursor-pointer
                        "
                      >
                        <LogOut size={18} />
                        Salir
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link
                      href="/login"
                      className="flex items-center gap-1.5 hover:text-orange-400 transition-colors"
                    >
                      <UserCog size={18} />
                      Login
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
