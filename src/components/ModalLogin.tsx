"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type ModalLoginProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ModalLogin({ isOpen, onClose }: ModalLoginProps) {
  const [email, setEmail] = useState("");
  const [senha, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleLogin = async () => {
    setError(""); // Limpar qualquer erro anterior

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao entrar");
        return;
      }

      // Armazenar o token JWT no localStorage
      console.log('Token recebido:', data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("token", data.token);
console.log('Token armazenado no localStorage:', localStorage.getItem("token"));


      // Fechar o modal
      onClose();

      // Redirecionar para o dashboard ou página protegida usando o Next.js router
      router.push("/dashboard"); // Recomenda-se usar o router.push ao invés de window.location.href

    } 
    
    catch {
      setError("Erro de rede ou servidor. Tente novamente.");
      console.error("Erro no login");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed p-10 sm:p-10 inset-0 z-50 flex items-center justify-center">
      {/* Fundo escurecido com blur */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Caixa do modal */}
      <div className="relative z-100 bg-white rounded-3xl shadow-xl w-full max-w-md px-10 py-12 space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-gray-400 text-2xl hover:text-gray-700 transition"
        >
          &times;
        </button>

        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Bem-vindo de volta!
          </h2>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border text-black border-gray-200 rounded-xl p-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setPassword(e.target.value)}
            className="border text-black border-gray-200 rounded-xl p-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          />

          <div className="text-center">
            <a href="#" className="text-sm text-orange-500 hover:underline">
              Esqueceu a senha?
            </a>
          </div>

          <div className="w-full flex justify-around items-center gap-4">
            <button
              className="w-[45%] bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl text-lg font-semibold transition shadow"
              onClick={handleLogin}
            >
              Entrar
            </button>

            <Link href="/Create" className="w-[45%]">
              <button
                className="w-full border border-orange-500 text-orange-500 hover:bg-orange-50 py-3 rounded-xl text-lg font-semibold transition shadow-sm"
                onClick={onClose}
              >
                Criar Conta
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
