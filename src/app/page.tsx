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
    <div className="font-[family-name:var(--font-geist-sans)]">
      <header className="flex top-0 left-0 w-full h-[100px] items-center bg-white justify-between p-2 pb-10 gap-2 sm:p-12 fixed z-90 shadow">
        <Image
          className="dark:invert"
          src="/img/logoUnihuur.svg"
          alt="logo"
          width={180}
          height={38}
          priority
        />
        <div className="w-[25rem] flex justify-between items-center">
          <a href="#">Quem Somos</a>
          <a href="#">Como usar?</a>
          <Botao texto={"Iniciar sessão"} onClick={() => setShowModal(true)} />
        </div>
      </header>

      <main className="pt-[100px] relative flex flex-col">
        <section
          className="flex justify-center items-center flex-col"
          style={{
            width: "100vw",
            height: "75vh",
            backgroundImage: `linear-gradient(
              rgba(0, 0, 0, 0.2),
              rgba(0, 0, 0, 0.4)
            ),url(${Hero})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <h1 className="text-[2.5rem] font-bold text-white w-[44%] text-center">
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
          className="relative top-0 p-0"
          style={{
            width: "100vw",
            height: "150px",
            backgroundImage: `url(${Hero2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></section>

        <section className="flex flex-row justify-center items-center pt-30 pb-30 gap-10">
          <div className="relative w-[481px] h-[450px]">
            <Image
              src="/img/aluna.svg"
              alt="Divisor visual"
              width={481}
              height={450}
              className="object-cover"
              priority
            />
          </div>
          <div className="w-[450px] h-[200px]">
            <h1 className="text-4xl font-bold">
              Junte-se ao Unihuur! Comece a compartilhar e alugar livros com
              outros estudantes.
            </h1>
          </div>
        </section>

        <footer
          className="w-full h-[487px] bg-cover bg-center bg-no-repeat text-white "
          style={{ backgroundImage: `url(${footer})` }}
        >
          <div className="max-w-screen-xl mx-auto flex flex-row justify-center items-center h-full py-10 px-8">
            <div className="w-[20%] max-w-[200px] flex flex-col items-center">
              <h1 className="font-bold mb-4">Links Úteis</h1>
              <ul className="space-y-2 flex flex-col justify-center items-center">
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

            <div className="w-[55%] text-center px-6 ">
              <h1 className="font-bold text-4xl mb-4">UNIHUUR</h1>
              <p className="mb-6 mx-auto max-w-[80%]">
                O Unihuur é a plataforma inovadora que facilita o acesso a
                materiais acadêmicos através de aluguel e partilha entre
                estudantes universitários.
              </p>
              <Botao
                texto={"Entrar"}
                corB="#ffff"
                corTexto="#F0862B"
                largura="200px"
                tamanhoFonte="1rem"
                onClick={() => setShowModal(true)}
              />
            </div>

            <div className="w-[20%] max-w-[200px] flex flex-col items-center">
              <h1 className="font-bold mb-4">Contacto</h1>
              <ul className="space-y-2 mb-4 flex flex-col justify-center items-center">
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

      <ModalLogin isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
