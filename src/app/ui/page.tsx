"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaWpexplorer, FaPlusCircle, FaArrowDown } from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";
import { HiRectangleStack } from "react-icons/hi2";
import { MdAccountBalance, MdAccountCircle } from "react-icons/md";

import Explorar from "../../components/Explorar";
import Categoria from "../../components/Categoria";
import Adicionar from "../../components/Adicionar";
import Alugueis from "../../components/Alugueis";
import Conta from "../../components/Conta";

export default function Dashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Alterado para null inicialmente
  const [activeSection, setActiveSection] = useState("explorar");
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  // Verifica o token após o componente ser montado
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true); // Autenticado
    } else {
      setIsAuthenticated(false); // Não autenticado
    }
  }, []);

  // Redireciona apenas quando soubermos que o usuário não está autenticado
  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  // Se ainda estiver verificando a autenticação, renderiza nada ou um loader
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Você pode adicionar um spinner ou algo do tipo
  }

  const renderMenuItem = (label, Icon, sectionKey) => {
    const isActive = activeSection === sectionKey;

    return (
      <div
        onClick={() => setActiveSection(sectionKey)}
        className={`relative flex items-center gap-3 pl-5 pr-3 py-2 rounded-lg cursor-pointer hover:bg-gray-700 ${
          isActive ? "bg-gray-700" : ""
        }`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-full w-2 bg-orange-500 rounded-r" />
        )}
        <Icon className={`${isActive ? "text-orange-500" : "text-white"}`} />
        <span
          className={`uppercase ${
            isActive ? "text-orange-500 font-medium" : "text-white"
          }`}
        >
          {label}
        </span>
      </div>
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false); // Atualiza o estado de autenticação
    router.push("/"); // Redireciona
  };

  return (
    <div className="w-full flex justify-center items-center h-screen overflow-hidden">
      <div className="w-full flex space-x-4">
        <div className="w-1/4 h-screen p-4 bg-[#1A243F] shadow-lg">
          <Image
            className="pb-10"
            src="/img/logoOrange.svg"
            alt="logo"
            width={180}
            height={38}
            priority
          />

          <div className="space-y-2 text-white">
            {renderMenuItem("Explorar", FaWpexplorer, "explorar")}
            {renderMenuItem("Categoria", TbCategoryFilled, "categoria")}
            {renderMenuItem("Adicionar Material", FaPlusCircle, "adicionar")}
            {renderMenuItem("Meus Alugueis", HiRectangleStack, "alugueis")}
            {renderMenuItem("Conta Unihuur", MdAccountBalance, "conta")}
          </div>
        </div>

        <div className="w-full h-screen p-4 bg-white overflow-y-auto relative">
          {/* PERFIL */}
          <div className="w-full flex items-center gap-2 justify-end mb-2 relative">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setShowProfileOptions((prev) => !prev)}
            >
              <MdAccountCircle className="text-orange-500 text-4xl" />
              <FaArrowDown className="text-black" />
            </div>

            {showProfileOptions && (
              <div className="absolute top-12 right-0 bg-white border shadow-lg rounded-lg py-2 w-40 z-50">
                <div
                  onClick={() => alert("Editar perfil")}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Editar Perfil
                </div>
                <div
                  onClick={handleLogout}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </div>
              </div>
            )}
          </div>

          <hr className="mb-4" />

          <div className="mt-2 w-full">
            {activeSection === "explorar" && <Explorar />}
            {activeSection === "categoria" && <Categoria />}
            {activeSection === "adicionar" && <Adicionar />}
            {activeSection === "alugueis" && <Alugueis />}
            {activeSection === "conta" && <Conta />}
          </div>
        </div>
      </div>
    </div>
  );
}
