"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/client";
import Image from "next/image";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Credenciales inválidas. Inténtalo de nuevo.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white p-4">
      {/* Glow decorativo de fondo similar al estilo de la marca */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 bg-orange-500/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md z-10">
        {/* Logo / Branding */}
        <div className="flex flex-col items-center mb-10">
          <div className="text-4xl font-black tracking-tighter flex items-center gap-2 italic uppercase">
            <Image src="/Images/Logo.png" alt="logo" height={300} width={300} />
          </div>
          <p className="text-zinc-500 text-sm mt-3 font-medium">
            Panel de Administración
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-[#161616] p-8 rounded-3xl border border-white/5 shadow-2xl shadow-black"
        >
          <div className="space-y-5">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-zinc-500 mb-2 ml-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                required
                placeholder="admin@lacueva.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 rounded-2xl bg-[#0d0d0d] border border-white/10 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 outline-none transition-all placeholder:text-zinc-700 text-sm"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-zinc-500 mb-2 ml-1">
                Contraseña
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 rounded-2xl bg-[#0d0d0d] border border-white/10 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 outline-none transition-all placeholder:text-zinc-700 text-sm"
              />
            </div>
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={() => router.push("/forgot-password")}
                className="text-[11px] font-semibold text-zinc-500 hover:text-orange-500 transition-colors uppercase tracking-wider"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-medium text-center">
              {error}
            </div>
          )}

          <button
            disabled={loading}
            className="w-full mt-8 bg-orange-500 hover:bg-orange-400 disabled:bg-zinc-800 disabled:text-zinc-500 transition-all duration-300 p-4 rounded-2xl font-bold text-black shadow-lg shadow-orange-500/10 active:scale-[0.98]"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-black"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Verificando...
              </span>
            ) : (
              "Acceder al Panel"
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-zinc-600 text-xs tracking-tight">
          &copy; {new Date().getFullYear()} La Cueva Inc. Acceso restringido.
        </p>
      </div>
    </div>
  );
}
