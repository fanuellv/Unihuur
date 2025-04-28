import { FaBookOpen } from "react-icons/fa";
import { FaCalculator } from "react-icons/fa";
import { GoLaw } from "react-icons/go";
import { FaStickyNote } from "react-icons/fa";

export default function Categoria() {
  return (
    <div className="overflow-y-auto">
      <h1 className="text-4xl font-bold">
        Encontre o que precisas por categoria
      </h1>
      <p>
        Filtra os materiais acadêmicos de acordo com a tua necessidade. Desde
        livros e códigos até equipamentos tecnológicos
      </p>

      <div className="flex text-white text-6xl ">
        <div className="w-100 h-55 bg-[#F0862B] m-5 p-8 space-y-10 rounded-2xl">
          <div className="bg-[#C8671A] w-25 h-25 rounded-full flex justify-center items-center">
            <FaBookOpen className="" />
          </div>
          <h2 className="text-3xl font-bold">Livros e apostilas</h2>
        </div>
        <div className="w-100 h-55 bg-[#48A8CE] m-5 p-8 space-y-10 rounded-2xl">
          <div className="bg-[#3B88A6] w-25 h-25 rounded-full flex justify-center items-center">
            <FaCalculator className="text-white text-4xl" />
          </div>

          <h2 className="text-2xl font-bold">Equipamentos Tecnologicos</h2>
        </div>
      </div>
      <div className="flex text-white text-6xl">
        <div className="w-100 h-55 bg-[#61BDC1] m-5 p-8 space-y-10 rounded-2xl">
          <div className="bg-[#4D979A] w-25 h-25 rounded-full flex justify-center items-center">
            <GoLaw />
          </div>
          <h2 className="text-3xl font-bold">Código e Normas</h2>
        </div>
        <div className="w-100 h-55 bg-[#F9D14E] m-5 p-8 space-y-10 rounded-2xl">
          <div className="bg-[#D6B342] w-25 h-25 rounded-full flex justify-center items-center">
            <FaStickyNote />
          </div>

          <h2 className="text-2xl font-bold">Resumo e Fichas</h2>
        </div>
      </div>

      {/*Resultado das categorias */}
      <div className="w-full">teste</div>
    </div>
  );
}
