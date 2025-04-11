import Link from "next/link";

export default function Botao({ texto, corB = "#F0862B" , corTexto="#ffff", largura="",altura="", tamanhoFonte=""}) {
    return (
      <Link href="/build">
      <button
        className={`px-4 py-2 rounded text-white font-semibold hover:opacity-90`}
        style={{ backgroundColor: corB, color: corTexto, width: largura, height: altura, fontSize: tamanhoFonte }}
      >
        {texto}
      </button>
      </Link>
    );
  }
  