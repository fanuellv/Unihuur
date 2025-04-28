import { FaBookOpen } from "react-icons/fa";
import { FaCalculator } from "react-icons/fa";
import { GoLaw } from "react-icons/go";
import { FaStickyNote } from "react-icons/fa";
import { useState } from "react";
import Image from "next/image";

interface Material {
  id: number;
  titulo: string;
  descricao: string;
  categoria: string;
  precoAluguel: number;
  imagemUrl: string;
}

export default function Categoria() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [materiais, setMateriais] = useState<Material[]>([]);

  const buscarMateriaisPorCategoria = async (categoria: string) => {
    try {
      const response = await fetch(
        `/api/material/list=${encodeURIComponent(categoria)}`
      );
      const data = await response.json();
      setMateriais(data);
      setCategoriaSelecionada(categoria);
    } catch (error) {
      console.error("Erro ao buscar materiais:", error);
    }
  };

  return (
    <div className="overflow-y-auto p-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-black">
        Encontre o que precisas por categoria
      </h1>
      <p className="text-gray-600 mb-8">
        Filtra os materiais acadêmicos de acordo com a tua necessidade. Desde
        livros e códigos até equipamentos tecnológicos
      </p>

      {/* Categorias */}
      <div className="flex flex-wrap gap-4 justify-center">
        <div className="flex-1 min-w-[250px] max-w-[350px] bg-[#F0862B] p-8 space-y-8 rounded-2xl">
          <div
            onClick={() => buscarMateriaisPorCategoria("Livros e Apostilas")}
            className="bg-[#C8671A] w-20 h-20 rounded-full flex justify-center items-center mx-auto"
          >
            <FaBookOpen className="text-white text-4xl" />
          </div>
          <h2 className="text-2xl font-bold text-center text-white">
            Livros e Apostilas
          </h2>
        </div>

        <div
          onClick={() =>
            buscarMateriaisPorCategoria("Equipamentos Tecnológicos")
          }
          className="flex-1 min-w-[250px] max-w-[350px] bg-[#48A8CE] p-8 space-y-8 rounded-2xl"
        >
          <div className="bg-[#3B88A6] w-20 h-20 rounded-full flex justify-center items-center mx-auto">
            <FaCalculator className="text-white text-4xl" />
          </div>
          <h2 className="text-2xl font-bold text-center text-white">
            Equipamentos Tecnológicos
          </h2>
        </div>

        <div className="flex-1 min-w-[250px] max-w-[350px] bg-[#61BDC1] p-8 space-y-8 rounded-2xl">
          <div
            onClick={() => buscarMateriaisPorCategoria("Código e Normas")}
            className="bg-[#4D979A] w-20 h-20 rounded-full flex justify-center items-center mx-auto"
          >
            <GoLaw className="text-white text-4xl" />
          </div>
          <h2 className="text-2xl font-bold text-center text-white">
            Código e Normas
          </h2>
        </div>

        <div className="flex-1 min-w-[250px] max-w-[350px] bg-[#F9D14E] p-8 space-y-8 rounded-2xl">
          <div
            onClick={() => buscarMateriaisPorCategoria("Resumo e Fichas")}
            className="bg-[#D6B342] w-20 h-20 rounded-full flex justify-center items-center mx-auto"
          >
            <FaStickyNote className="text-white text-4xl" />
          </div>
          <h2 className="text-2xl font-bold text-center text-white">
            Resumo e Fichas
          </h2>
        </div>
      </div>

      <div className="w-full mt-10">
        {categoriaSelecionada && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-black">
              Materiais de {categoriaSelecionada}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {materiais.map((material) => (
                <div key={material.id} className="p-4 border rounded-lg shadow">
                  <Image
                    src={material.imagemUrl}
                    alt={material.titulo}
                    width={400}
                    height={160}
                    className="w-full h-40 object-cover mb-2 rounded"
                  />

                  <h3 className="text-xl font-semibold">{material.titulo}</h3>
                  <p className="text-gray-600">{material.descricao}</p>
                  <p className="text-blue-600 font-bold mt-2">
                    {material.precoAluguel} Kz
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
