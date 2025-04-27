"use client";
import Image from "next/image";
import { useState } from "react";
import Botao from "../components/botao";
import ModalLogin from "../components/ModalLogin";

const Hero = "/img/hero.svg";
const Hero2 = "/img/divHero.svg";
const footer = "/img/footer.svg";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="font-[family-name:var(--font-geist-sans)]  bg-white ">
      <header className="flex w-full h-[100px] items-center bg-white justify-around p-2 gap-2 fixed z-90 shadow">
        <Image
          src="/img/logoUnihuur.svg"
          alt="logo"
          width={180}
          height={38}
          priority
        />
        <div className="w-[25rem] flex justify-around items-center">
          <a href="#" className="hidden md:block">
            Quem Somos
          </a>
          <a href="#" className="hidden md:block">
            Como usar?
          </a>
          <Botao texto={"Iniciar sessão"} onClick={() => setShowModal(true)} />
        </div>
      </header>

      <main className="pt-[100px] relative flex flex-col">
        <section
          className="w-screen h-[60vh] sm:h-[75vh] flex justify-center items-center flex-col bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0.4)
    ), url(${Hero})`,
          }}
        >
          <h1 className="text-[1.8rem] sm:text-[3rem] font-bold text-white w-[50%]  sm:w-[44%] text-center mb-2">
            Plataforma de Aluguel e Partilha de Materiais Acadêmicos
          </h1>

          <Botao
            texto={"Junte-se a Comunidade"}
            corB="#ffff"
            corTexto="#F0862B"
            largura="300px"
            tamanhoFonte="1.2rem"
            onClick={() => setShowModal(true)}
          />
        </section>

        <section
          className=" hidden sm:block relative top-0 p-0 w-screen h-50 sm:h-[10rem] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${Hero2})`,
          }}
        ></section>

        <section className="flex flex-col sm:flex-row items-center justify-center pt-16 pb-16 gap-10">
          <div className="relative w-[90%] sm:w-1/2 flex justify-center">
            <Image
              src="/img/aluna.svg"
              alt="Divisor visual"
              width={481}
              height={450}
              className="object-cover"
              priority
            />
          </div>

          <div className="w-[60%]  text-center sm:w-1/2 flex items-center justify-center sm:text-left">
            <h1 className="text-xl text-black font-bold sm:text-4xl">
              Junte-se ao Unihuur! Comece a compartilhar e alugar livros com
              outros estudantes.
            </h1>
          </div>
        </section>

        <footer
          className="w-full sm:h-100 bg-cover bg-center bg-no-repeat text-white"
          style={{ backgroundImage: `url(${footer})` }}
        >
          <div className="w-full flex flex-col sm:flex-row justify-center items-center h-full py-10 px-8 gap-4">
            <div className="w-full sm:w-[20%] max-w-[200px] flex flex-col items-center text-center">
              <h1 className="font-bold mb-4">Links Úteis</h1>
              <ul className="space-y-2">
                <li>
                  <a href="#">Sobre nós</a>
                </li>
                <li>
                  <a href="#">Como Funciona</a>
                </li>
                <li>
                  <a href="#">Planos e preços</a>
                </li>
              </ul>
            </div>

            <div className="w-full sm:w-[55%] flex flex-col items-center text-center px-6">
              <h1 className="font-bold text-4xl mb-4">UNIHUUR</h1>
              <p className="mb-6 mx-auto max-w-[50%]">
                O Unihuur é a plataforma inovadora que facilita o acesso a
                materiais acadêmicos através de aluguel e partilha entre
                estudantes universitários.
              </p>
              <Botao
                texto={"Entrar"}
                corB="#ffffff"
                corTexto="#F0862B"
                largura="200px"
                tamanhoFonte="1rem"
                onClick={() => setShowModal(true)}
              />
            </div>

            <div className="w-full sm:w-[20%] max-w-[200px] flex flex-col items-center text-center">
              <h1 className="font-bold mb-4">Contacto</h1>
              <ul className="space-y-2 mb-4">
                <li>
                  <a href="#">email: unihuur@gmail.com</a>
                </li>
                <li>
                  <a href="#">Localização: Luanda</a>
                </li>
              </ul>
              <Image
                src="/img/socialmedia.svg"
                alt="redes sociais"
                width={100}
                height={100}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </footer>
      </main>

      <ModalLogin isOpen={showModal} onClose={() => setShowModal(false)}>
        {/* Qualquer conteúdo que você queira passar como children */}
      </ModalLogin>
    </div>
  );
}
