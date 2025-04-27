"use client";
import { useState } from "react";
import Image from "next/image";

export default function Explorar() {
  // Estado para armazenar o valor da pesquisa
  const [searchQuery, setSearchQuery] = useState("");

  // Função para lidar com a mudança no campo de pesquisa
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Função que pode ser chamada ao submeter a pesquisa
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Pesquisar:", searchQuery); // Aqui você pode adicionar a lógica de pesquisa
  };

  return (
    <div className="relative top-10 space-y-2 m-5">
      <h1 className="text-2xl sm:text-5xl font-bold text-black">Bem-vindo de Volta!</h1>
      <p className="mt-5 text-black">Encontre, alugue e compartilhe materiais acadêmicos!</p>

      {/* Barra de Pesquisa */}
      <div className="w-full px-4 mt-10 overflow-hidden">
        <form
          onSubmit={handleSearchSubmit} // Aqui, o tipo correto é React.FormEvent<HTMLFormElement>
          className="flex w-full h-20 sm:h-40 items-top gap-2 border border-gray-300 rounded-lg p-2"
        >
          {/* Campo de entrada com ícone */}
          <div className="flex  sm:h-35 items-top w-full border-1 border-amber-600 rounded-lg p-5">
            {/* Ícone de pesquisa */}
            <svg
              className="w-5 h-5 text-gray-500 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

            {/* Campo de entrada */}
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange} // Tipo de evento: React.ChangeEvent<HTMLInputElement>
              placeholder="Buscar..."
              className="flex-1 bg-transparent py-2 outline-none align-text-top placeholder:align-top"
            />
          </div>

          {/* Botão de pesquisa */}
          <button
            type="submit"
            className="bg-orange-500 h-10 text-white py-2 px-4 rounded-lg"
          >
            Buscar
          </button>
        </form>
      </div>
      <div className=" sm:flex sm:w-full items-center justify-center gap-5 mt-10">
        <Image
          src="/img/aluna.svg"
          alt="redes sociais"
          width={250}
          height={250}
          className="object-contain w-40 sm:w-50"
          priority
        />
        <Image
          src="/img/vantagens.svg"
          alt="redes sociais"
          width={400}
          height={400}
          className="object-contain w-50 relative left-35 sm:w-50"
          priority
        />
      </div>
    </div>
  );
}
