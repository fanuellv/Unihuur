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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
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

  const renderMenuItem = (
    label: string,
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>,
    sectionKey: string
  ) => {
    const isActive = activeSection === sectionKey;

    return (
      <div
        onClick={() => setActiveSection(sectionKey)}
        className={`relative hidden sm:flex items-center gap-3 pl-5 pr-3 py-2 rounded-lg cursor-pointer hover:bg-gray-700 ${
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
  const renderMenuItemMobile = (
    label: string,
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>,
    sectionKey: string
  ) => {
    const isActive = activeSection === sectionKey;

    return (
      <div
        onClick={() => setActiveSection(sectionKey)}
        className={`relative flex flex-col sm:hidden items-center sm:items-center gap-1 sm:gap-3 pl-2 sm:pl-5 pr-2 sm:pr-3 py-2 rounded-lg cursor-pointer hover:bg-gray-700 ${
          isActive ? "bg-gray-700" : ""
        }`}
      >
        {isActive && (
          <div className="absolute left-0 sm:left-0 top-0 sm:top-0 h-1 sm:h-full w-full sm:w-2 bg-orange-500 rounded-t sm:rounded-r" />
        )}
        <Icon
          className={`${isActive ? "text-orange-500" : "text-white"} text-xl`}
        />
        <span
          className={`uppercase text-[0.7rem] sm:text-base ${
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
    <div className="w-full flex flex-col sm:flex-row min-h-screen overflow-y-hidden">
      {/* Sidebar para desktop */}
      <div className="hidden sm:block fixed top-0 left-0 w-1/4 h-screen p-4 bg-[#1A243F] shadow-lg z-20">
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

      {/* Conteúdo principal */}
      <div className="flex flex-col w-full sm:ml-[25%] bg-white relative min-h-screen">
        {/* Header */}
        {/* Header para Desktop */}
        <div className="hidden sm:flex w-full items-center justify-end p-4 bg-white z-10 top-0  right-0 shadow-lg fixed">
          {/* Ícone do perfil */}
          <div className="relative">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setShowProfileOptions((prev) => !prev)}
            >
              <MdAccountCircle className="text-orange-500 text-4xl" />
              <FaArrowDown className="text-black" />
            </div>

            {/* Dropdown */}
            {showProfileOptions && (
              <div className="absolute right-[1rem] mt-5 bg-white border shadow-lg rounded-lg py-2 w-40 z-50">
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
                  Terminar Sessão
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Header para Mobile */}
        <div className="flex sm:hidden w-full items-center justify-between p-4 bg-white fixed z-10 top-0 shadow-lg">
          <Image
            src="/img/logoOrange.svg"
            alt="logo"
            width={120}
            height={38}
            priority
          />
          <button onClick={() => setShowProfileOptions((prev) => !prev)}>
            <MdAccountCircle className="text-orange-500 text-3xl" />
          </button>

          {showProfileOptions && (
            <div className="absolute top-16 right-4 bg-white border shadow-lg rounded-lg py-2 w-40 z-50">
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
                Terminar Sessão
              </div>
            </div>
          )}
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto p-4 pt-20 pb-20">
          {activeSection === "explorar" && <Explorar />}
          {activeSection === "categoria" && <Categoria />}
          {activeSection === "adicionar" && <Adicionar />}
          {activeSection === "alugueis" && <Alugueis />}
          {activeSection === "conta" && <Conta />}
        </div>

        {/* Menu Mobile */}
        <div className="flex sm:hidden fixed bottom-0 left-0 w-full h-16 bg-[#1A243F] justify-around items-center z-30">
          {renderMenuItemMobile("Explorar", FaWpexplorer, "explorar")}
          {renderMenuItemMobile("Categoria", TbCategoryFilled, "categoria")}
          {renderMenuItemMobile("Adicionar", FaPlusCircle, "adicionar")}
          {renderMenuItemMobile("Alugueis", HiRectangleStack, "alugueis")}
          {renderMenuItemMobile("Conta", MdAccountBalance, "conta")}
        </div>
      </div>
    </div>
  );
}
