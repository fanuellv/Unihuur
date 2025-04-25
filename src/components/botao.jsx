export default function Botao({ texto, onClick, corB = "#F0862B", corTexto = "#fff", largura = "", altura = "", tamanhoFonte = "" }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded text-white font-semibold hover:opacity-90"
      style={{ backgroundColor: corB, color: corTexto, width: largura, height: altura, fontSize: tamanhoFonte }}
    >
      {texto}
    </button>
  );
}
