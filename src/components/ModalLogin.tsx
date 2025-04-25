"use client";
import Link from "next/link";
import { useEffect } from "react";
//import PropTypes from "prop-types";



type ModalLoginProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode; // <- aqui está o problema
}
export default function ModalLogin({ isOpen, onClose,children }: ModalLoginProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Fundo escurecido com blur */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Caixa do modal */}
      <div className="relative z-100 bg-white rounded-3xl shadow-xl w-full max-w-md px-10 py-12 space-y-6">
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-gray-400 text-2xl hover:text-gray-700 transition"
        >
          &times;
        </button>

        {/* Conteúdo padrão */}
        {children || (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Bem-vindo de volta!
            </h2>

            <input
              type="email"
              placeholder="Email"
              className="border border-gray-200 rounded-xl p-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            />

            <input
              type="password"
              placeholder="Senha"
              className="border border-gray-200 rounded-xl p-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            />

            <div className="text-center">
              <a href="#" className="text-sm text-orange-500 hover:underline">
                Esqueceu a senha?
              </a>
            </div>

            <div className="w-full flex justify-around items-center gap-4">
              <Link
                href={{ pathname: "/build", query: { redirect: "page" } }}
                className="w-[45%]"
              >
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl text-lg font-semibold transition shadow">
                  Entrar
                </button>
              </Link>
              <Link
                href={{ pathname: "/Create", query: { redirect: "page" } }}
                className="w-[45%]"
              >
                <button className="w-full border border-orange-500 text-orange-500 hover:bg-orange-50 py-3 rounded-xl text-lg font-semibold transition shadow-sm">
                  Criar Conta
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
